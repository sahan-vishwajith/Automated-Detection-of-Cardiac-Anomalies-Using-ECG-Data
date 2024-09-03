import tensorflow as tf
import pandas as pd
import streamlit as st

# Load the pre-trained model outside the function to improve performance
@st.cache_resource
def load_model():
    return tf.keras.models.load_model('model/best_model_checkpoint_cnn_lstm.keras')

cnn = load_model()

# Load the test dataset
test_df = pd.read_csv('mitbih_test.csv', header=None)

# Define class labels
Classes = ["Normal Beat", "Supraventricular premature", 
           "Premature ventricular", "Fusion beats", "Unknown beats"]

# User selects a sample from the test dataset
sample_index = st.slider("Select Sample Index", 0, len(test_df) - 1, 0)

# Extract the selected sample
selected_sample = test_df.iloc[sample_index, :-1]  # ECG signal (first 187 values)
actual_class = int(test_df.iloc[sample_index, -1])  # Actual class (last value)

# Display the selected sample and actual class
st.subheader("Selected Sample ECG Signal")
st.line_chart(selected_sample)

st.write(f"**Actual Category:** {Classes[actual_class]}")

# Ensure the sample has 187 features and reshape for model input
if selected_sample.shape[0] != 187:
    st.error('Selected sample does not have 187 features!')
else:
    # Reshape the sample to fit the model's input shape (1, 187, 1)
    signal = selected_sample.to_numpy().reshape(1, 187, 1)

    # Predict the class using the model
    y_predict = cnn.predict(signal)
    predicted_class = int(y_predict.argmax(axis=-1))

    # Display the predicted class
    st.write(f"**Predicted Category:** {Classes[predicted_class]}")

    # Display the prediction probabilities for each class
    df = pd.DataFrame(y_predict, columns=Classes)
    st.subheader("Prediction Probabilities")
    st.dataframe(df.style.format("{:.2%}"))

    # Optionally add a bar chart for better visualization
    df_transposed = df.T
    df_transposed = df_transposed.reindex(Classes)
    st.bar_chart(df_transposed)

	# Ensure that the DataFrame index is in the correct order
	

	# Plot the bar chart
	
