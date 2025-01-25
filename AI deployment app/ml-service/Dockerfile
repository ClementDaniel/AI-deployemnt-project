# Use a slim Python base image
FROM python:3.9-slim

# Set working directory in the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining app files into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["python3", "app.py"]
