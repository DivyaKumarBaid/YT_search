import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from googleapiclient.discovery import build

load_dotenv()

def youtube_search():
    # since last requested we need not request same videos
    last_request_time = datetime.now() - timedelta(minutes=5)
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
            maxResults=1,
            eventType="completed",
            type="video",
            publishedAfter=(last_request_time.isoformat()[:-7] + 'Z')
        )

        api_req = api_req.execute()

        print(api_req)

    except Exception as e:
        print(e)

