import os
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.datasets import imdb

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model("model/sentiment_model.h5")
vocab_size = 10000
max_length = 100

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    # Preprocess input
    word_index = imdb.get_word_index()
    tokens = [word_index.get(word, 0) for word in text.lower().split()]
    padded = pad_sequences([tokens], maxlen=max_length, padding='post')

    # Predict sentiment
    prediction = model.predict(padded)[0][0]
    sentiment = "Positive" if prediction > 0.5 else "Negative"
    return jsonify({"sentiment": sentiment, "confidence": float(prediction)})

if __name__ == "__main__":
    app.run(port=5001)
