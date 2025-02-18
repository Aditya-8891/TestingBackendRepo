# filepath: /Users/adi-kewalram/adi-work/Honkai-Chatbot-Backend/TestingBackendRepo/Dockerfile
FROM nvcr.io/nvidia/tritonserver:23.01-py3

# Install necessary packages
RUN apt-get update && apt-get install -y \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install fastapi tritonclient[http] transformers numpy uvicorn gevent

# Copy your model repository
COPY ./model_repository ./models

# Set Triton server entrypoint
ENTRYPOINT ["tritonserver", "--model-repository=/models", "--http-port=3000"]