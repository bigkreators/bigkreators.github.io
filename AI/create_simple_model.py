import tensorflow as tf
from tensorflow.keras.layers import Input, Dense, LSTM
from tensorflow.keras.models import Model
import tensorflowjs as tfjs

def create_simple_lipnet():
    # Simple model just to test the pipeline
    inputs = Input(shape=(75, 100, 50, 3), name='video_input')
    
    # Flatten the spatial dimensions 
    flattened = tf.keras.layers.Reshape((75, 100*50*3))(inputs)
    
    # Simple LSTM
    lstm_out = LSTM(128, return_sequences=True)(flattened)
    
    # Output layer (28 characters)
    outputs = Dense(28, activation='softmax', name='character_output')(lstm_out)
    
    model = Model(inputs=inputs, outputs=outputs, name='simple_lipnet')
    return model

# Create and save model
print("Creating simple test model...")
model = create_simple_lipnet()
model.summary()

print("Converting to TensorFlow.js...")
tfjs.converters.save_keras_model(model, 'web_model_simple')

print("✅ Simple model created successfully!")
