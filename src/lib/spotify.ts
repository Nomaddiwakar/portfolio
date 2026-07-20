import { useState, useEffect } from "react";

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumUrl: string;
  songUrl: string;
}

export function useSpotifyTrack(): SpotifyTrack {
  const [track, setTrack] = useState<SpotifyTrack>({
    isPlaying: true,
    title: "Nadaan Parindey",
    artist: "A.R. Rahman",
    albumUrl: "https://i.scdn.co/image/ab67616d0000b273b75131a980590a36e9ff096c",
    songUrl: "https://open.spotify.com/search/nadaan%20parindey",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLiveSpotify = async () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

      if (!clientId || !refreshToken) return;

      try {
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const basic = btoa(`${clientId}:${clientSecret}`);
        
        // 1. Get Access Token
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        });

        if (!tokenRes.ok) return;
        const { access_token } = await tokenRes.json();

        // 2. Fetch Currently Playing
        const nowPlayingRes = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (nowPlayingRes.status === 200) {
          const song = await nowPlayingRes.json();
          if (song.item && isMounted) {
            setTrack({
              isPlaying: song.is_playing,
              title: song.item.name,
              artist: song.item.artists.map((a: { name: string }) => a.name).join(", "),
              albumUrl: song.item.album.images[0]?.url || "",
              songUrl: song.item.external_urls.spotify,
            });
            return;
          }
        }

        // 3. Fallback to Recently Played
        const recentlyPlayedRes = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (recentlyPlayedRes.ok) {
          const recent = await recentlyPlayedRes.json();
          if (recent.items && recent.items.length > 0 && isMounted) {
            const item = recent.items[0].track;
            setTrack({
              isPlaying: false,
              title: item.name,
              artist: item.artists.map((a: { name: string }) => a.name).join(", "),
              albumUrl: item.album.images[0]?.url || "",
              songUrl: item.external_urls.spotify,
            });
          }
        }
      } catch {
        // Retain default track on network error
      }
    };

    fetchLiveSpotify();
  }, []);

  return track;
}
