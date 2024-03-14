import { useParams } from "react-router-dom"
import PlayVideo from "../Components/PlayVideo"
import Recommended from "../Components/Recommended"
import "./Video.css"
const Video = () => {
  const {videoId,categoryId}= useParams();
  console.log(videoId, categoryId);
  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video
