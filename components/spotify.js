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
  const [auraColor1, setAura1Color] = useState('#f2f2f2'); // Default aura1 color
  const [auraColor2, setAura2Color] = useState('#ffffff'); // Default aura2 color (lighter)

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
      if (prominentColor.length > 1) {
        const color1 = `rgb(${prominentColor[1][0]}, ${prominentColor[1][1]}, ${prominentColor[1][2]})`;
        const color2 = `rgb(${prominentColor[0][0]}, ${prominentColor[0][1]}, ${prominentColor[0][2]})`;

        if (isLighter(color2, color1)) {
          setAura1Color(color1);
          setAura2Color(color2);
        } else {
          setAura1Color(color2);
          setAura2Color(color1);
        }
      }
    };

    img.src = imageUrl;
  };

  const isLighter = (color1, color2) => {
    // Calculate the luminance of a color (higher value means lighter)
    const calculateLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      return (
        0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
      );
    };

    return calculateLuminance(color1) > calculateLuminance(color2);
  };

  useEffect(() => {
    if (auraColor1 && auraColor2) {
      // Change the background color of the body based on auraColor
      document.body.style.background = `radial-gradient(circle at bottom, ${auraColor1}, ${auraColor2}, white 35%)`;
    }
    if (songData.title === 'Not playing') {
      document.body.style.background = "white";
    }
  }, [auraColor1, auraColor2]);

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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const slidingTextContainerStyle = {
    position: 'absolute',
    display: 'block',
    bottom: '4.1rem', // Adjusted spacing at the bottom
    left: isHovered ? '33%' : '0',
    width: '100%',
    padding: '1.8rem', // Adjusted padding
    fontSize: '7px',
    color: isHovered ? 'white' : 'transparent',
    zIndex: -1,
    transition: 'left 0.5s ease-in-out, color 0.5s ease-in-out',
  };

  return (
    <div>
      <div style={slidingTextContainerStyle}>
        <div style={{ fontSize: '14px', padding: '.07rem' }}>
          Currently Playing (on my Spotify ☺︎)
        </div>
        <div>
          *************background color changes depending on album art ;)</div>
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
