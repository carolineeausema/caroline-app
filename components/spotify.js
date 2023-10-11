import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import ColorThief from 'colorthief';

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
  const [auraColor, setAuraColor] = useState('#f2f2f2'); // Default aura color

  useEffect(() => {
    // Analyze the colors from the album cover image
    if (songData.image) {
      analyzeImageColors(songData.image);
    }
  }, [songData.image]);

  const analyzeImageColors = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const colorThief = new ColorThief();
      const prominentColor = colorThief.getPalette(img, 3);
      if (prominentColor.length > 0) {
        const auraColor = `rgb(${prominentColor[1][0]}, ${prominentColor[1][1]}, ${prominentColor[1][2]})`;
        setAuraColor(auraColor);
      }
    };

    img.src = imageUrl;
  };

  useEffect(() => {
    if (auraColor) {
      // Change the background color of the body based on auraColor
      document.body.style.background = `linear-gradient(to top, ${auraColor}, white 25%)`;
    }
  }, [auraColor]);

  const containerStyle = {
    background: '#f2f2f2', // Set the container background to transparent
    padding: '0.75rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '18rem',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  };

  const auraStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent', // Set the aura background to transparent
    opacity: 0.5,
  };

  const imageStyle = {
    maxWidth: '70px',
    marginRight: '10px',
  };

  const textContainerStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '16px',
    marginBottom: '-15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const artistStyle = {
    color: '#888',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const slidingTextContainerStyle = {
    position: 'absolute',
    display: 'block',
    bottom: '4.1rem',
    left: isHovered ? '33%' : '0',
    width: '100%',
    padding: '1.8rem',
    fontSize: '7px',
    color: isHovered ? 'white' : 'transparent',
    zIndex: -1,
    transition: 'left 0.5s ease-in-out, color 0.5s ease-in-out',
  };

  return (
    <div>
      <div style={slidingTextContainerStyle}>
          *************background color changes depending on album art ;)</div>
      <div style={slidingTextContainerStyle}>
        <div style={{ fontSize: '14px', padding: '.4rem' }}>
          Currently Playing (on my Spotify ☺︎)
        </div>
      </div> 
      <div style={containerStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div style={auraStyle}></div>
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
