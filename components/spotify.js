import React from 'react';
import useSWR from 'swr';

const SpotifyPlayer = () => {
  const fallbackSongData = {
    title: 'Not playing',
    artist: 'Not playing',
    image: 'spotify.png',
  };

  const fetcher = (...args) =>
    fetch(...args).then((res) => res.json());

  const { data: songData } = useSWR('/api/playing', fetcher, {
    fallbackData: fallbackSongData,
    refreshInterval: 5000,
  });

  const containerStyle = {
    background: '#f2f2f2',
    padding: '0.75rem', // Smaller padding for the entire container
    borderRadius: '0.75rem', // Smaller border radius
    display: 'flex',
    alignItems: 'center',
    width: '17rem', // Smaller width
    margin: '0 auto',
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

  return (
    <div style={containerStyle}>
      <img src={songData.image} alt="Album cover" style={imageStyle} />
      <div style={textContainerStyle}>
        <p style={titleStyle}>{songData.title}</p>
        <p style={artistStyle}>{songData.artist}</p>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
