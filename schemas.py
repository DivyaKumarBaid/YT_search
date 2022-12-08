from typing import Optional
from pydantic import BaseModel, EmailStr, Field

# store in db from yt search
class FetchData(BaseModel):
    title: str = Field(...)
    description: str = Field(...)
    publishedAt: str = Field(...)
    thumbnail: str = Field(...)
    channelTitle: str = Field(...)