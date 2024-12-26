import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import { FaPlay, FaPause } from "react-icons/fa";
import screenfull from "screenfull"; // Import screenfull for fullscreen functionality

function VideoPlayer( {getVideo} ) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playing, setPlaying] = useState(false); // Track play/pause state
  const [volume, setVolume] = useState(0.8); // Volume state
  const [playbackRate, setPlaybackRate] = useState(1.0); // Playback rate state
  
  const [showControls, setShowControls] = useState(false); // State to control visibility of play/pause icon
  const playerRef = useRef(null); // Reference to the player
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
  };

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
    // Show controls when clicked
    // setTimeout(() => {
    //   setShowControls(false); // Hide controls after 3 seconds
    // }, 3000);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value);
    playerRef.current.seekTo(newTime); // Seek to the new time
    
  }; 

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds); // Update current time
    setDuration(progress.loadedSeconds ? progress.loadedSeconds : 0); // Update duration  
    
  };
 
   
  const hoverEnter = () => {
    setShowControls(true);
  };
  const hoverLeave = () => {
    setShowControls(false);
  };

  const videoEnd = () => {
    console.log("ended")
    setPlaying(false)
  }

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current.wrapper);
    }
  };

  const handlePlaybackRateChange = (event) => {
    setPlaybackRate(parseFloat(event.target.value));
  };
  

  return (
    <section className="w-[75rem] text-white flex flex-col gap-3">
      <section
        onMouseEnter={hoverEnter}
        onMouseLeave={hoverLeave}
        className="border border-zinc-600 rounded-2xl overflow-hidden h-[40rem] w-[75rem] relative"
      >
        <ReactPlayer
          ref={playerRef}
          url={getVideo.videoFile} // Cloudinary video URL
          onReady={handleVideoReady}
          onBuffer={handleBuffer}
          onBufferEnd={handleBufferEnd}
          playing={playing}
          volume={volume}
          onProgress={handleProgress}
          onEnded={videoEnd}
          playbackRate={playbackRate} // Set playback rate
          width="100%"
          height="100%"
          className="react-player"
          style={{ display: isVideoLoaded ? "block" : "none" }}
        />
        {(isBuffering || !isVideoLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <ClipLoader color="#ffffff" loading={true} size={50} />
          </div>
        )}
        {isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className={` ${
                showControls ? "show" : ""
              } bg-transparent border-none playerTrue cursor-pointer delay-200 transition-transform transform hover:scale-110`}
              style={{ fontSize: "3rem"}} // Larger button
            >
              {playing ? <FaPause/> : <FaPlay />} {/* Play/Pause Icon */}
            </button>
          </div>
        )}
        {/* Fullscreen Button */}
        {isVideoLoaded && (
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 bg-transparent border-none cursor-pointer text-white"
            style={{ fontSize: "2rem" }}
          >
            ⛶
          </button>
        )}
      </section>
      {/* Volume Control */}
      <div className="flex justify-between items-center mt-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-1/2"
        />
        <span className="text-white">{Math.round(volume * 100)}%</span>
      </div>
      {/* Seek Bar */}
      <div className="flex justify-between items-center mt-2">
        <input
          type="range"
          min={0}
          max={duration} // Set max to video duration
          step="0.01"
          onChange={handleSeekChange}
          className="w-full"
          value={currentTime} 
          
        />
      </div>
      {/* Playback Rate Control */}
      <div className="flex justify-between items-center mt-2">
        <label className="text-white mr-2">Speed:</label>
        <select
          value={playbackRate}
          onChange={handlePlaybackRateChange}
          className="bg-zinc-800 text-white p-1 rounded"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </section>
  );
}

export default VideoPlayer;
