import ReactPlayer from "react-player"
import ControlsVideo from "./ControlsVideo"
import classes from './../../styles/video-styles.module.scss'
import { useState, useEffect } from "react"

const VideoPlayer =({youTubeLink, playerState, sendPlayerState}) => {
    
const [state, setState] = useState({playing:false});
const [volume, setVolume] = useState(0.6)
useEffect(() => {
    setState({...state, playing:!playerState});
  }, [playerState]);

const{
    playing
}=state


const handlePlay = () =>{ 
    setState({...state, playing:!state.playing}); 
sendPlayerState(playing)};

const handleVolume =(e) =>{
    setVolume(parseFloat(e.target.value))
};

    return (
        <div className={classes.videoWrapper} >
            <ReactPlayer url={youTubeLink} 
            width='100%'
            height="400px"
            playing ={playing}
            volume={volume}
          /> 
          <ControlsVideo 
          classes ={classes}
          handlePlay ={handlePlay}
          playing ={playing}
          handleVolume={handleVolume}
          volume={volume}/>
        </div>
    )
}

export default VideoPlayer