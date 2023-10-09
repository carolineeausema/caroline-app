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
    maxWidth: '18rem', // Set a maximum width
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden', // Hide overflow content
  };

  const imageStyle = {
    maxWidth: '70px', // Smaller image width
    marginRight: '10px', // Smaller spacing between image and text
  };

  const textContainerStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '16px', // Smaller font size for the title
    marginBottom: '-15px', // Reduced space below the title
    whiteSpace: 'nowrap',
    flex: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Truncate text with ellipsis if it overflows
  };

  const artistStyle = {
    color: '#888',
    fontSize: '14px', // Smaller font size for artist name
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Truncate text with ellipsis if it overflows
  };

  const slidingTextContainerStyle = {
    position: 'absolute',
    display: 'block',
    bottom: '5.1rem',
    left: isHovered ? '38%' : '0', // Show text on hover, hide otherwise
    width: '100%',
    padding: '0.5rem',
    fontSize: '14px',
    color: isHovered ? '#475d00' : 'white', // Text color changes on hover
    zIndex: 1, // Bring it above other content
    transition: 'left 0.5s ease-in-out, color 0.5s ease-in-out',
  };

  return (
    <div>
      <div style={slidingTextContainerStyle}>Currently Playing (on my Spotify ☺︎)</div>
      <div
        style={containerStyle}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        
        <img src={songData.image} alt="Album cover" style={imageStyle} />
        <div style={textContainerStyle}>
          <p style={titleStyle} title={songData.title}>
            {songData.title}
          </p>
          <p style={artistStyle} title={songData.artist}>
            {songData.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
