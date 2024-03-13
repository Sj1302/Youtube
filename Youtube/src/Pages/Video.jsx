import PlayVideo from "../Components/PlayVideo"
import Recommended from "../Components/Recommended"
import "./Video.css"
const Video = () => {
  return (
    <div className="play-container">
      <PlayVideo/>
      <Recommended/>
    </div>
  )
}

export default Video
