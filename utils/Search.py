import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from schemas import FetchData
from config.database import data_col
from dateutil import parser as date_time_parser
import pytz

utc=pytz.UTC

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
            publishedAfter=(last_request_time.replace(microsecond=0).isoformat()+'Z'),
        )

        # https://issuetracker.google.com/issues/35174533 
        # since google api isnt working correctly for new data, I need to check it while entering it in DB

        api_req = api_req.execute()

        # Video title, description, publishing datetime, thumbnails 
        for req in api_req["items"]:
            
            # if(date_time_parser.parse(req["snippet"]["publishedAt"]).replace(tzinfo=utc) < date_time_parser.parse(str(last_request_time)[:-7]).replace(tzinfo=utc)) :
            #     continue

            save_data = FetchData(
                title = req["snippet"]["title"],
                description = req["snippet"]["description"],
                publishedAt = req["snippet"]["publishedAt"],
                thumbnail = req["snippet"]["thumbnails"]["default"]["url"],
                channelTitle = req["snippet"]["channelTitle"],
                channelId = req["snippet"]["channelId"],
            )

            cursor = data_col.insert_one(dict(save_data))

            if not cursor:
                raise Exception("Something went wrong")

    except Exception as e:
        print(e)

