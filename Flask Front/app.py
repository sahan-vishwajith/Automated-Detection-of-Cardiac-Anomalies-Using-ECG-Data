import tensorflow as tf
import pandas as pd
import streamlit as st

# Load the pre-trained model outside the function to improve performance
@st.cache_resource
def load_model():
    return tf.keras.models.load_model('model/best_model_checkpoint_cnn_lstm.keras')

cnn = load_model()

# Define class labels
Classes = ["Normal Beat", "Supraventricular premature", 
           "Premature ventricular", "Fusion beats", "Unknown beats"]

# Create a file uploader for user to upload a CSV file
st.subheader("Upload an ECG CSV file for Prediction")
uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

# If the user has uploaded a file
if uploaded_file is not None:
    # Load the uploaded CSV file
    uploaded_data = pd.read_csv(uploaded_file, header=None)

    # Ensure the sample has 188 columns (187 for signal, 1 for actual class)
    if uploaded_data.shape[1] != 188:
        st.error('The uploaded file must have exactly 188 columns (187 ECG data points and 1 actual class).')
    else:
        # Show "Predict" button
        if st.button("Predict"):
            # Extract the first 187 columns as the ECG signal
            signal = uploaded_data.iloc[0, :-1]
            actual_class = int(uploaded_data.iloc[0, -1])

            # Visualize the ECG signal
            st.subheader("ECG Signal Visualization")
            st.line_chart(signal)

            # Reshape the signal for model input (1, 187, 1)
            signal = signal.to_numpy().reshape(1, 187, 1)

            # Predict the class using the model
            y_predict = cnn.predict(signal)
            predicted_class = int(y_predict.argmax(axis=-1))

            # Display the predicted class
            st.write(f"**Predicted Category:** {Classes[predicted_class]}")

            # Display the actual class
            st.write(f"**Actual Category:** {Classes[actual_class]}")

            # Display the prediction probabilities for each class
            df = pd.DataFrame(y_predict, columns=Classes)
            st.subheader("Prediction Probabilities")
            st.dataframe(df.style.format("{:.2%}"))

            # Optionally add a bar chart for better visualization
            df_transposed = df.T
            df_transposed = df_transposed.reindex(Classes)
            st.bar_chart(df_transposed)
