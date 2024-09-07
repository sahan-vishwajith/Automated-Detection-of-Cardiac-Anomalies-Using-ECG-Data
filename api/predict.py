import matplotlib
matplotlib.use('Agg')  # Use the Agg backend for non-interactive plotting

from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
import wfdb
import numpy as np
import tempfile
import logging
import os
from tensorflow.keras.models import load_model
from flask_cors import CORS
from scipy.ndimage import median_filter
from scipy.signal import savgol_filter
import pywt
from collections import Counter
from tqdm import tqdm
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load your trained model
model = load_model('my_model.h5')

# Define labels
invalid_beat = [
    "[", "!", "]", "x", "(", ")", "p", "t", 
    "u", "`", "'", "^", "|", "~", "+", "s", 
    "T", "*", "D", "=",'"', "@", "B", "a", "J", "S",
    "r", "F", "e", "j", "n", "f", "Q", "?"
]
label_beats = ["A", "L", "/", "V", "R", "E", "N"]

# Initialize the label encoder
label_encoder = LabelEncoder()
label_encoder.fit(['0', '1', '2', '3', '4', '5', '6'])

def load_and_preprocess_input(file_paths):
    def classify(symbol):
        if symbol in label_beats:
            return 1
        else:
            return 0

    def segment(signal, beat_loc):
        window = 180
        x = beat_loc - window
        y = beat_loc + window
        samp = signal[x:y]
        return samp

    def perform_swt(signal, wavelet='db1', level=3):
        coeffs = pywt.swt(signal, wavelet=wavelet, level=level)
        return coeffs

    def two_stage_median_filter(signal, size=3):
        first_stage = median_filter(signal, size=size)
        second_stage = median_filter(first_stage, size=size)
        return second_stage

    def apply_savitzky_golay(signal, window_length=5, polyorder=2):
        return savgol_filter(signal, window_length=window_length, polyorder=polyorder)

    def perform_iswt(coeffs, wavelet='db1'):
        reconstructed_signal = pywt.iswt(coeffs, wavelet)
        return reconstructed_signal

    try:
        base_name = os.path.splitext(file_paths['dat'])[0]
        record = wfdb.rdrecord(base_name)

        # Handle cases with a single channel
        if record.p_signal.shape[1] == 1:
            signal_MLII = record.p_signal[:, 0]
            signal_V1 = np.zeros_like(signal_MLII)  # Create a dummy signal for V1
        else:
            signal_MLII = record.p_signal[:, 0]
            signal_V1 = record.p_signal[:, 1]

        annot_temp = wfdb.rdann(base_name, 'atr')
        ann_sample = annot_temp.sample
        ann_symbol = annot_temp.symbol

        all_signals = []
        all_labels = []

        for i, i_sample in enumerate(ann_sample):
            label_dec = classify(ann_symbol[i])
            segmentation_MLII = segment(signal_MLII, i_sample)
            segmentation_V1 = segment(signal_V1, i_sample)
            combined_segmentation = np.stack((segmentation_MLII, segmentation_V1), axis=-1)

            if label_dec == 1 and combined_segmentation.shape == (360, 2):
                all_signals.append(combined_segmentation)
                all_labels.append(ann_symbol[i])

        all_swt_coeffs1 = []
        all_reconstructed_signals1 = []
        all_swt_coeffs2 = []
        all_reconstructed_signals2 = []

        for signal in tqdm(all_signals, desc="Processing Signals"):
            swt_coeffs = perform_swt(signal[:, 0], wavelet='db1')
            all_swt_coeffs1.append(swt_coeffs)
            filtered_coeffs = []
            for coeff in swt_coeffs:
                filtered_detail = two_stage_median_filter(coeff[1])
                smoothed_detail = apply_savitzky_golay(filtered_detail)
                filtered_coeffs.append((coeff[0], smoothed_detail))
            reconstructed_signal = perform_iswt(filtered_coeffs, wavelet='db1')
            all_reconstructed_signals1.append(reconstructed_signal)

        for signal in tqdm(all_signals, desc="Processing Signals"):
            swt_coeffs = perform_swt(signal[:, 1], wavelet='db1')
            all_swt_coeffs2.append(swt_coeffs)
            filtered_coeffs = []
            for coeff in swt_coeffs:
                filtered_detail = two_stage_median_filter(coeff[1])
                smoothed_detail = apply_savitzky_golay(filtered_detail)
                filtered_coeffs.append((coeff[0], smoothed_detail))
            reconstructed_signal = perform_iswt(filtered_coeffs, wavelet='db1')
            all_reconstructed_signals2.append(reconstructed_signal)

        all_reconstructed_signals1 = np.array(all_reconstructed_signals1)
        all_reconstructed_signals2 = np.array(all_reconstructed_signals2)

        signal_length = all_reconstructed_signals1.shape[1]
        all_signals_fin = np.stack((all_reconstructed_signals1, all_reconstructed_signals2), axis=-1)
        all_signals_fin = all_signals_fin.reshape((all_signals_fin.shape[0], signal_length, 1, 2))
        X_test = np.array(all_signals_fin, dtype=np.float32)
        return X_test

    except Exception as e:
        logging.error(f'Error during preprocessing: {e}')
        raise e

def get_beat_meaning(symbol):
    beat_meanings = {
        'N': 'Normal beat',
        'L': 'Left bundle branch block beat',
        'R': 'Right bundle branch block beat',
        'A': 'Atrial premature beat',
        'a': 'Aberrated atrial premature beat',
        'J': 'Nodal (junctional) premature beat',
        'S': 'Supraventricular premature beat',
        'V': 'Premature ventricular contraction',
        'F': 'Fusion of ventricular and normal beat',
        '[': 'Start of ventricular flutter/fibrillation',
        '!': 'Ventricular flutter wave',
        ']': 'End of ventricular flutter/fibrillation',
        'e': 'Atrial escape beat',
        'j': 'Nodal (junctional) escape beat',
        'E': 'Ventricular escape beat',
        '/': 'Paced beat',
        'f': 'Fusion of paced and normal beat',
        'x': 'Non-conducted P-wave (blocked APB)',
        'Q': 'Unclassifiable beat',
        '|': 'Isolated QRS-like artifact',
    }
    return beat_meanings.get(symbol, 'Unknown symbol')


@app.route('/predict', methods=['POST'])
def predict():
    logging.info('Received prediction request')
    print('Received prediction request')

    if 'atr' not in request.files or 'dat' not in request.files or 'xws' not in request.files or 'hea' not in request.files:
        return jsonify({'error': 'Missing one or more required files: .atr, .dat, .xws, .hea'}), 400

    with tempfile.TemporaryDirectory() as temp_dir:
        file_paths = {}

        try:
            for file_type in ['atr', 'dat', 'xws', 'hea']:
                file = request.files[file_type]
                if file and file.filename:
                    file_path = os.path.join(temp_dir, file.filename)
                    file.save(file_path)
                    file_paths[file_type] = file_path
                else:
                    raise ValueError(f'File for type {file_type} is missing or has an invalid name.')

            X_test = load_and_preprocess_input(file_paths)

            y_pred_probs = model.predict(X_test)
            y_pred = np.argmax(y_pred_probs, axis=1)
            predicted_labels = [label_beats[int(label)] for label in y_pred]

            counter = Counter(predicted_labels)
            most_common_label, count = counter.most_common(1)[0]
            most_common_amly=get_beat_meaning(most_common_label)
            # Generate ECG plot
            ecg_plot_image = plot_ecg_signal(X_test, 10)

            return jsonify({
                'prediction': most_common_amly,
                'ecg_plot': ecg_plot_image
            })

        except Exception as e:
            logging.error(f'Error during prediction: {e}')
            return jsonify({'error': str(e)}), 500

def plot_ecg_signal(X_test, times):
    plt.figure(figsize=(10, 4))

    # Plot the first sample's MLII and V1 signals
    for i in range(times):
        plt.plot(X_test[0, :, 0, 0], label='', alpha=0.5)
        # plt.plot(X_test[i, :, 0, 1], label='V1', alpha=0.5)

    plt.title('ECG Signals')
    plt.xlabel('Samples')
    plt.ylabel('Amplitude')
    plt.legend()
    plt.grid()

    # Save the plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()  # Close the figure to free memory
    buf.seek(0)

    # Encode the image in base64
    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{img_base64}"

if __name__ == '__main__':
    app.run(debug=True)



# 212