import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from schemas import FetchData
from config.database import data_col

load_dotenv()

def youtube_search():
    # since last requested we need not request same videos
    last_request_time = datetime.now() - timedelta(minutes=1)
    print(f"\n{last_request_time.isoformat()[:-7] + 'Z'}\n")

    # loading api key
    api_key = os.getenv('API_KEY')

    # youtube object is build
    youtube = build('youtube','v3',developerKey=api_key)

    try:

        api_req = youtube.search().list(
            q="java", 
            part="snippet",
            order="date", 
            type = "video",
            maxResults=50,
            eventType="completed",
            publishedAfter=(last_request_time.isoformat()[:-7] + 'Z'),
        )

        api_req = api_req.execute()

        # Video title, description, publishing datetime, thumbnails 
        for req in api_req["items"]:
            save_data = FetchData(
                title = req["snippet"]["title"],
                description = req["snippet"]["description"],
                publishedAt = req["snippet"]["publishedAt"],
                thumbnail = req["snippet"]["thumbnails"]["default"]["url"],
                channelTitle = req["snippet"]["channelTitle"],
            )

            cursor = data_col.insert_one(dict(save_data))

            if not cursor:
                raise Exception("Something went wrong")

    except Exception as e:
        print(e)

