from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.tasks import repeat_every
from utils.Search import youtube_search
from routes.videos import videos

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.on_event("startup")
@repeat_every(seconds=(60),wait_first=False)
async def search():
    await youtube_search()

app.include_router(videos.router)