from fastapi import FastAPI, WebSocket, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str | None = None


class Answer(BaseModel):
    message: str


app = FastAPI(
    title="ChimichangApp",
    description="description",
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
)
router = APIRouter()

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인에서의 접근을 허용할 때
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/items/", response_model=Answer)
def create_item(item: Item):
    print(item)
    return {"message": f"Item {item.description} created"}


@app.websocket("/ws")  # 엔드포인트 변경: "/ws"
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # 연결 수락

    # WebSocket 연결 유지 및 메시지 송수신 루프
    while True:
        data = await websocket.receive_text()
        print(f"Received text: {data}")  # 수신 메시지 출력
        await websocket.send_text(f"Message text was: {data}")  # 메시지 에코


@app.websocket("/ws2")
async def websocket_endpoint_2(websocket: WebSocket):
    await websocket.accept()  # 연결 수락
    while True:
        data = await websocket.receive_text()
        print(f"WS2 Received: {data}")
        await websocket.send_text(f"WS2 Echo: {data}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
