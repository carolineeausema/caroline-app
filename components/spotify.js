import React, { useState } from 'react';
import useSWR from 'swr';

const SpotifyPlayer = () => {
  const fallbackSongData = {
    title: 'Not playing',
    artist: 'Not playing',
    image: 'spotify.png',
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: songData } = useSWR('/api/playing', fetcher, {
    fallbackData: fallbackSongData,
    refreshInterval: 5000,
  });

  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const containerStyle = {
    background: '#f2f2f2',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    width: '18rem',
    margin: '0 auto',
    position: 'relative',
    whiteSpace: 'nowrap', // Prevent text from wrapping to a new line
    textOverflow: 'ellipsis', // Show ellipsis for overflowing text
  };

  const imageStyle = {
    maxWidth: '60px', // Smaller image width
    marginRight: '10px', // Smaller spacing between image and text
  };

  const textContainerStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '16px', // Smaller font size for the title
    marginBottom: '-15px', // Reduced space below the title
  };

  const artistStyle = {
    color: '#888',
    fontSize: '14px', // Smaller font size for artist name
  };

  const slidingTextContainerStyle = {
    position: 'absolute',
    display: 'block',
    bottom: '5.5rem',
    left: isHovered ? '11rem' : '0rem', // Show text on hover, hide otherwise
    width: '100%',
    padding: '0.5rem',
    fontSize: '14px',
    color: isHovered ? '#475d00' : 'white', // Text color changes on hover
    'z-index': -1,
    transition: 'left 0.5s ease-in-out, color 0.5s ease-in-out', // Add color transition
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => {
        // Set isHovered to true on hover
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        // Set isHovered to false on mouse leave
        setIsHovered(false);
      }}
    >
      <div style={slidingTextContainerStyle}>Currently Playing</div>
      <img src={songData.image} alt="Album cover" style={imageStyle} />
      <div style={textContainerStyle}>
        <p style={titleStyle}>{songData.title}</p>
        <p style={artistStyle}>{songData.artist}</p>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
