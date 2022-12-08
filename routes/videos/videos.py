from fastapi import Depends, APIRouter, HTTPException, status
from config.database import data_col
from schemas import FetchData
import os

router = APIRouter(tags=["videos"], prefix="/videos")

@router.get('/', status_code=200)
def home(page: int = 1):
    try:
        posts = []
        cursor = data_col.find().skip((page-1)*10).limit(10).sort("_id", -1)
        if cursor:
            for res in cursor:
                posts.append(FetchData(**res))

        return posts

    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)