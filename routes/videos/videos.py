from fastapi import Depends, APIRouter, HTTPException, status
from config.database import data_col
from schemas import FetchData
from typing import Optional
import os

router = APIRouter(tags=["videos"], prefix="/videos")

@router.get('/', status_code=200)
def home(page: int = 1,sort:bool = True, channelName: Optional[str] = None, videoTitle:Optional[str]=None,description:Optional[str]=None):
    try:
        # for path parameteres
        filter_dict = {}
        sorting = -1
        if sort:
            sorting = 1
        if channelName != None:
            filter_dict['channelTitle'] = channelName
        if videoTitle != None:
            filter_dict['title'] = videoTitle
        if description != None:
            filter_dict['description'] = description
        
        videos = []
        print(filter_dict)
        cursor = data_col.find(filter_dict).skip((page-1)*10).limit(10).sort("_id",sorting)
        if cursor:
            for res in cursor:
                videos.append(FetchData(**res))

        return videos

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)