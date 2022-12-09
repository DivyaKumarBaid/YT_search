import React from 'react'
import './card.css'
import {TbSquaresFilled} from 'react-icons/tb'


export default function Card({ obj, theme }) {
  
  const imageUrl = obj.thumbnail;

  return (
    <a href={`https://www.youtube.com/watch?v=${obj.videoId}`}>
      <div className={`cardContainer ${theme&&'darkTheme'}`}>
      <div className="thumbnail" style={{ backgroundImage: `url("${imageUrl}")` }}>
      </div>
        <div className="info">
          <div className="rentalInfo">
            <div className={`name ${theme&&'darkThemeText'}`}>
              {obj.title}
            </div>
            <div className="address">
              {obj.description.substring(0,50)}...
            </div>     
            <div className="country">
              {obj.channelTitle}
            </div>     
          </div>
          <div className="houseInfo">
            <div className="area">
              <TbSquaresFilled className ='infoIcons'/>
              {String(new Date(obj.publishedAt)).split(" ").slice(0,5).join()}
            </div>
          </div>
        </div>
      </div>
      </a>
  )
}
