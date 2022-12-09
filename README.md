# YT_search
FastAPI (Python) is used to build the server. The server automatically calls the youtube api after every 5 mins and this can be change in main.py and Search.py
The server also supports multiple API keys as it switches between keys on error by the googleAPI

Example of the live server : https://xw8csg.deta.dev/docs#/
Live Webpage : https://yt-search-ny4nf7tis-divyakumarbaid.vercel.app/

Use
```git clone <url>```
To clone the repository locally.

## Setting up
An example of .env is provided as `.env-sample`
Create a .env file or any other method to store environment variables

## Installation of packages
`requirements.txt` is provided in the files to install the libraries involved.
Use
```pip install -r requirements.txt``` 
To install all the dependencies.

## Starting the Server
Use
```uvicorn main:app --reload``` 
To start the server.

## Docs
Go to the port where server is listening and add `/docs` at the end of url to use Swagger Documentation.

## Usage
The server has a single get request.
Filters are used as optional path parameters.
Filters are : page, channel name, video title, video description. 
For more clarity refer to the swagger docs on local host.

## Hosting
Use Deta to host the server.
Refer to : https://fastapi.tiangolo.com/deployment/deta/


