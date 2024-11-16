import { NextApiRequest, NextApiResponse } from 'next'
import getAccessToken from '../../lib/get_access_token'

export default async (req, res) => {
  try {
    //@ts-ignore
    const { access_token } = await getAccessToken()

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      })

    // If the response is a 404, treat it as "Not playing"
    if (response.status === 404 || response.status !== 200) {
      return res.json({
        title: 'Not playing',
        artist: 'Not playing',
        image: 'spotify.png'
      })
    }

    const data = await response.json()
    const { name: title, artists } = data.item
    const image = data.item.album.images[0].url
    //@ts-ignore
    const _artists = artists.map(({ name }) => name)
    const artist = _artists.length > 1 ? _artists.join(', ') : _artists[0]

    return res.json({ title, artist, image })
  } catch (error) {
    // If there is an error (network or other issues), return the same "Not playing" response
    return res.json({
      title: 'Not playing',
      artist: 'Not playing',
      image: 'spotify.png'
    })
  }
}
