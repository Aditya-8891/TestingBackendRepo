from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import onnx

model_name = "facebook/llama-2-7b"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

dummy_input = tokenizer("Hello, how are you?", return_tensors="pt")["input_ids"]

torch.onnx.export(
    model,
    (dummy_input,),
    "llama-2-7b.onnx",
    input_names=["input_ids"],
    output_names=["logits"],
    dynamic_axes={"input_ids": {0: "batch_size", 1: "sequence_length"}},
    opset_version=11
)

print("ONNX model saved as llama-2-7b.onnx")
