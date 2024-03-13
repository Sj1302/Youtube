import { Link } from "react-router-dom";
import "./Feed.css";
// import Moment from 'react-moment';
import moment from 'moment';
import { API_key, value_Converter } from "../data";
import { useEffect, useState } from "react";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchdata = async () => {

    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_key}`;
    await fetch(video_url)
      .then((res) => res.json())
      .then((data) => setData(data.items));
  };


  useEffect(() => {
    fetchdata();
  }, [category]);


  return (
    <div className="feed">
      {data.map((item,index)=>(
         <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={item.id} className="card">
         <img src={item.snippet.thumbnails.medium.url} alt="" />
         <h2>
           {item.snippet.title}...
         </h2>
         <h3>{item.snippet.channelTitle}</h3>
         <p>{value_Converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
         {/* <Moment fromNow>item.snippet.publishedAt</Moment>  */}
         </p>
       </Link>
      ))}
     
     
     
    </div>
  );
};

export default Feed;
