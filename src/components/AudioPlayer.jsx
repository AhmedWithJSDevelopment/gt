import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './AudioPlayer.css'; // Create a CSS file for styling
// import src from '../assets/images/Yani.mp3'
const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
     // If the audio is playing, pause it; otherwise, play it.
    if (audioRef.current) {
      if (isPlaying) {
        
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="audio-player">
      <audio
        // src={Audio}
                src={src}

                ref={audioRef}

        // controls
        loop
              autoPlay={isPlaying}
              onClick={togglePlay}
          />
      {/* <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button> */}
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};
export default AudioPlayer;

