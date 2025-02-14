import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { ClipLoader } from "react-spinners";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";
import screenfull from "screenfull";

function VideoPlayer({ getVideo }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // States for the preview player.
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeout = useRef(null);
  const previewPlayerRef = useRef(null);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes().toString().padStart(2, "0");
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return hh ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  };

  // Use a shorter progress interval for smoother updates.
  const handleProgress = (progress) => {
    // Update with three decimal places for a resolution of 0.001 seconds.
    setCurrentTime(Number(progress.playedSeconds.toFixed(3)));
    setIsBuffering(false);
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    setPlaying((prev) => !prev);
    resetControlsTimer();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume <= 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
    if (!muted) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  const resetControlsTimer = () => {
    clearTimeout(controlsTimeout.current);
    setShowControls(true);
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(controlsTimeout.current);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (screenfull.isFullscreen) {
        setShowControls(true);
        resetControlsTimer();
      } else {
        clearTimeout(controlsTimeout.current);
        setShowControls(true);
      }
    };

    screenfull.on("change", handleFullscreenChange);
    return () => screenfull.off("change", handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    resetControlsTimer();
  };

  // --- Handlers for the preview player on the seekbar ---

  const handlePreviewMouseEnter = () => {
    setIsPreviewVisible(true);
  };

  const handlePreviewMouseLeave = () => {
    setIsPreviewVisible(false);
  };

  const handlePreviewMouseMove = (e) => {
    // Calculate hovered position relative to the seekbar container.
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const newPreviewTime = (relativeX / rect.width) * duration;
    setPreviewTime(newPreviewTime);
    setPreviewPosition(relativeX);
    if (previewPlayerRef.current) {
      previewPlayerRef.current.seekTo(newPreviewTime, "seconds");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full  bg-black min-[700px]:rounded-2xl overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlayPause}
      id="video-player"
    >
      {/* Main Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={getVideo.videoFile}
        onReady={handleVideoReady}
        onBuffer={() => setIsBuffering(true)}
        onBufferEnd={() => setIsBuffering(false)}
        playing={playing}
        volume={muted ? 0 : volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        progressInterval={1} // more frequent progress updates
        onEnded={() => setPlaying(false)}
        width="100%"
        height="100%"
        className="react-player"
      />

      {/* Loading Spinner */}
      {(isBuffering || !isVideoLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      {/* Central Play Button */}
      {!playing && isVideoLoaded && !isBuffering && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center w-full transition-opacity opacity-0 group-hover:opacity-100"
        >
          <div className="p-6 bg-black/40 rounded-full max-[500px]:p-4">
            <FaPlay className="w-14 h-14 text-white/90 max-[500px]:h-5 max-[500px]:w-5" />
          </div>
        </button>
      )}

      {/* Bottom Controls Container */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        } bg-gradient-to-t from-black/80 to-transparent`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seekbar Container */}
        <div
          className="relative w-full h-1 mb-3"
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
          onMouseMove={handlePreviewMouseMove}
        >
          <input
            type="range"
            min={0}
            max={duration}
            step="0.001" // fine control step
            value={currentTime}
            onChange={handleSeekChange}
            className="absolute w-full h-1 transition-all bg-gradient-to-r from-red-500 to-pink-700 rounded-full appearance-none cursor-pointer"
          />

          {/* Mini Preview Player */}
          {isPreviewVisible && (
            <div
              className="absolute -top-28" // adjust as needed; here 28 units above
              style={{
                // Center preview on the mouse position (adjust the offset by half of preview width)
                left: previewPosition - 80, // if preview width is 160px
                width: 160,
                height: 90,
              }}
            >
              <ReactPlayer
                ref={previewPlayerRef}
                url={getVideo.videoFile}
                playing={false}
                controls={false}
                light={false}
                muted={true}
                width="100%"
                height="100%"
                style={{ pointerEvents: "none" }}
              />
              <div className="text-center text-xs text-white mt-1">
                {formatTime(previewTime)}
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="text-white transition-transform hover:scale-110"
            >
              {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white">
                {muted || volume === 0 ? (
                  <FaVolumeMute size={20} />
                ) : (
                  <FaVolumeUp size={20} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 transition-opacity duration-200 opacity-100"
              />
            </div>

            <div className="flex gap-2 text-sm font-medium text-white">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="bg-transparent text-white border-none outline-none"
            >
              <option className="bg-zinc-800" value="0.5">
                0.5x
              </option>
              <option className="bg-zinc-800" value="1">
                Speed
              </option>
              <option className="bg-zinc-800" value="1.5">
                1.5x
              </option>
              <option className="bg-zinc-800" value="2">
                2x
              </option>
            </select>

            <button
              onClick={toggleFullscreen}
              className="text-white transition-transform hover:scale-110"
            >
              <FaExpand size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoPlayer;
