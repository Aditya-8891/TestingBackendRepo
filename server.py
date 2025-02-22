from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import tritonclient.http as hclient
import numpy as np
from transformers import AutoTokenizer

from fastapi.middleware.cors import CORSMiddleware
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

triton_url = "localhost:3000"
model_name = "gpt2"

client = hclient.InferenceServerClient(url=triton_url)
tokenizer = AutoTokenizer.from_pretrained("gpt2")

#chat interface
@app.websocket("/ws")
async def chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            input_text = await websocket.receive_text()

            inputs = tokenizer(input_text, return_tensors="np")
            input_ids = inputs["input_ids"].astype(np.int64)
        
            #input
            inputs_tens = hclient.InferInput("input_text", input_ids.shape, "INT64")
            inputs_tens.set_data_from_numpy(input_ids)
            outputs_tens = hclient.InferRequestedOutput("logits")

            #infer
            response = client.infer(model_name, inputs=[inputs_tens], outputs=[outputs_tens])
            logits = response.as_numpy("logits")

            generated_ids = np.argmax(logits, axis=-1)
            generated_text = tokenizer.decode(generated_ids[0], skip_special_tokens=True)

            await websocket.send_text(generated_text)
            #await websocket.send_text("[END]")
    except WebSocketDisconnect:
        print("Client disconnected.")
    except Exception as e:
        print(f"WebSocket Error: {e}")
        await websocket.close()

    


