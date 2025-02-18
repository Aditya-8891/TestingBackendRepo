from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import onnx

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

dummy_input = tokenizer("Hello, how are you?", return_tensors="pt")["input_ids"]

try:
    torch.onnx.export(
        model,
        (dummy_input,),
        "model.onnx",
        input_names=["input_ids"],
        output_names=["logits"],
        dynamic_axes={"input_ids": {0: "batch_size", 1: "sequence_length"}},
        opset_version=14
    )
    print("ONNX model saved as model.onnx")
except Exception as e:
    print(f"Error during ONNX export: {e}")
