from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.tasks import repeat_every
from utils.Search import youtube_search
from routes.videos import videos
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

api_keys=[]
using_api_key = []
no_of_api_keys = int(os.getenv('NO_OF_API'))

@app.on_event("startup")
async def load_api():
    # loading all api keys in api_keys array
    for i in range (1,no_of_api_keys+1):
        print(i)
        api_keys.append(os.getenv(f'API_KEY_{i}'))
    print("initially->",api_keys)
    # loading first api key
    using_api_key.append(api_keys[0])
    print("initially",using_api_key)
    # print(api_keys)

@app.on_event("startup")
@repeat_every(seconds=(60*5),wait_first=False)
async def search():
    try:
        res = await youtube_search(using_api_key[len(using_api_key)-1])
        if(res):
            if(len(using_api_key) == len(api_keys)):
                using_api_key.clear()
                using_api_key.append(api_keys[0])
            else:
                using_api_key.append(api_keys[len(using_api_key)])
    except Exception as e:
        print(e)


app.include_router(videos.router)