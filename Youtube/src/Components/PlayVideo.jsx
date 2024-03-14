import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import save from "../assets/save.png";
import share from "../assets/share.png";
import jack from "../assets/jack.png";
import user_profile from "../assets/user_profile.jpg";
import "./PlayVideo.css";
import { useEffect, useState } from "react";
import { API_key, value_Converter } from "../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const PlayVideo = ({ videoId }) => {

    // const { videoId }= useParams
  const [apidata, setApidata] = useState(null);
  const [channeldata, setChannelData] = useState(null);
  const [commentsdata, setCommentsdata] = useState(null);
  const fetchVideoData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_key}`;
    const response = await fetch(video_url);
    const data = await response.json();
    setApidata(data.items[0]);
  };

  const fetchchanneldata = async () => {
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
      apidata && apidata.snippet && apidata.snippet.channelId
    }&key=${API_key}`;
    const response = await fetch(channel_url);
    const data = await response.json();
    setChannelData(data.items[0]);

    const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_key}`;
    const responsecmt = await fetch(comments_url);
    const datacmt = await responsecmt.json();
    setCommentsdata(datacmt.items);

  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchchanneldata();
  }, [apidata]);


  console.log(channeldata,"channel");
  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h3>
        {apidata && apidata.snippet ? apidata.snippet.title : "Tittle..."}
      </h3>
      <div className="play-video-info">
        <p>
          {apidata && apidata.statistics
            ? value_Converter(apidata.statistics.viewCount)
            : "15k"}
          Views &bull;
          {apidata && apidata.snippet
            ? moment(apidata.snippet.publishedAt).fromNow()
            : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata && apidata.statistics
              ? value_Converter(apidata.statistics.likeCount)
              : "2k"}
          </span>
          <span>
            <img src={dislike} alt="" />2
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <div className="publisher">
        <img
          src={
            channeldata && channeldata.snippet
              ? channeldata.snippet.thumbnails.medium.url
              : ""
          }
          alt=""
        />
        <div>
          <p>
            {apidata && apidata.snippet
              ? apidata.snippet.channelTitle
              : "channel name"}
          </p>
          <span>
            {channeldata && channeldata.statistics
              ? value_Converter(channeldata.statistics.subscriberCount)
              : "1.2M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apidata && apidata.snippet
            ? apidata.snippet.description.slice(0, 250)
            : "Description Here"}
          ...
        </p>
        <hr />
        <h4>
          {apidata && apidata.statistics
            ? value_Converter(apidata.statistics.commentCount)
            : "250"}{" "}
          Comments
        </h4>

        {commentsdata && commentsdata.map((item,index)=>(

            <div className="comment" key={index} >
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
            <h3>
            {item.snippet.topLevelComment.snippet.authorDisplayName}  <span>  {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
            </h3>
            <p>
            {item.snippet.topLevelComment.snippet.textDisplay} 
            </p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>{value_Converter(item.snippet.topLevelComment.snippet.likeCount)} </span>
                <img src={dislike} alt="" />
            </div>
            </div>
            </div>
        ))}
       


      </div>
    </div>
  );
};

export default PlayVideo;
