import React, { useEffect, useState } from 'react';

const SpotifyCallback = () => {
  const [token, setToken] = useState(null); // State to store the access token
  const [loading, setLoading] = useState(true); // State to track the loading state

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code'); // Get authorization code from URL
    const codeVerifier = window.localStorage.getItem('code_verifier'); // Get code_verifier from localStorage

    if (authorizationCode && codeVerifier) {
        console.log("Have both Auth Code and Verify Code")
      // Exchange authorization code for access token
      const fetchAccessToken = async () => {
        const clientId = process.env.SPOTIFY_CLIENT_ID
        const redirectUri = process.env.REACT_APP_REDIRECT_URI

        const tokenUrl = 'https://accounts.spotify.com/api/token';
        console.log("Sending request")
        try {
            const payload = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  client_id: clientId,
                  grant_type: 'authorization_code',
                  code: authorizationCode,
                  redirect_uri: redirectUri,
                  code_verifier: codeVerifier,
                }),
              }
          const body = await fetch(tokenUrl, payload);
          const data = await body.json();

          if (data.access_token) {
            setToken(data.access_token); // Store access token
            setLoading(false); // Update loading state to false
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
          setLoading(false); // Update loading state to false if an error occurs
        }
      };

      fetchAccessToken();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h2>Authenticating...</h2>
      ) : (
        token ? (
          <div>
            <h2>Successfully authenticated with Spotify!</h2>
            <p>Your access token is:</p>
            <pre>{token}</pre> {/* Display the access token */}
          </div>
        ) : (
          <h2>Authentication failed. Please try again.</h2>
        )
      )}
    </div>
  );
};

export default SpotifyCallback;
