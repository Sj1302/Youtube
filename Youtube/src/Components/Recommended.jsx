import "./Recommended.css"

import { useEffect, useState } from "react"
import { API_key, value_Converter } from "../data"
import { Link } from "react-router-dom"

const Recommended = ({categoryId}) => {

    const [categorydata, setCategorydata]= useState([]);
    const fetchcategorydata= async()=>{
        const category_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_key}`;
        const response = await fetch(category_url);
        const data = await response.json();
        setCategorydata(data.items);
    }
    useEffect(()=>{
        fetchcategorydata();
    },[])
  return (
    <div className="recommended">

        {categorydata.map((item,index)=>(
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_Converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
          
        ))}
      
    </div>
  )
}

export default Recommended
