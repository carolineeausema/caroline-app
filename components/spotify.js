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

  const [isHovered, setIsHovered] = useState(false);
  const [auraColor1, setAura1Color] = useState('#f2f2f2');
  const [auraColor2, setAura2Color] = useState('#ffffff');

  useEffect(() => {
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
    const calculateLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    };

    return calculateLuminance(color1) > calculateLuminance(color2);
  };

  useEffect(() => {
    if (auraColor1 && auraColor2) {
      document.body.style.background = `radial-gradient(circle at bottom, ${auraColor1}, ${auraColor2}, white 35%)`;
    }
    if (songData.title === 'Not playing') {
      document.body.style.background = "white";
    }
  }, [auraColor1, auraColor2]);

  const containerStyle = {
    background: '#f2f2f2',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '20rem',
    margin: '0 auto',
    position: 'relative',
    overflow: 'visible',
  };

  const auraStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    opacity: 0.5,
  };

  const imageStyle = {
    maxWidth: '70px',
    marginRight: '10px',
  };

  const textContainerStyle = {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const titleStyle = {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '0',
  };

  const artistStyle = {
    color: '#888',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0',
  };

  const popupStyle = {
    position: 'absolute',
    top: '-2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem 0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '0.5rem',
    fontSize: '9px',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: isHovered ? 'auto' : 'none',
    zIndex: 1,
    textAlign: 'center',
  };

  return (
    <div>
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
        {isHovered && (
          <div style={popupStyle}>
            <div>currently playing (on my Spotify ☺︎)</div>
            <div style={{ fontSize: '7px', marginTop: '0.25rem' }}>
              gradient colors r pulled from album cover
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlayer;
