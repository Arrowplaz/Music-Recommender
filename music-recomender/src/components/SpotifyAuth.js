import React from 'react';

const SpotifyAuth = () => {
  const authenticateWithSpotify = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const redirectUri = process.env.REACT_APP_REDIRECT_URI; // Your Redirect URI
    const scope = process.env.SCOPE; // Scopes you want to request
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // Generate code_verifier and code_challenge here (You can use a library like 'pkce-challenge' to do this)
    const codeVerifier = generateRandomString(128); 
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed); 
    window.localStorage.setItem('code_verifier', codeVerifier);

    // Store code_verifier in localStorage for later use during token exchange
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect to Spotify's authorization page
  };
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  return (
    <div>
      <h2>Click the button below to authenticate with Spotify:</h2>
      <button onClick={authenticateWithSpotify}>Authenticate with Spotify</button>
    </div>
  );
};

export default SpotifyAuth;
