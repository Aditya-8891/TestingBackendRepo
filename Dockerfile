FROM nvcr.io/nvidia/tritonserver:latest

# Copy model repository into the container
COPY model_repository /models

# Start Triton Server
CMD ["tritonserver", "--model-repository=/models"]