// src/hooks/useGooglePicker.js

import { useEffect, useState } from "react";

/**
 * Custom hook to load and initialize Google APIs for the Picker.
 *
 * @param {"1062247369631-2i266asc9rltsjaknplpc6pl079ji3r1.apps.googleusercontent.com"} clientId - Your Google OAuth 2.0 Client ID.
 * @param {"AIzaSyAkUl6HfJdQ52iswh8Uhmi6xA_vk1nebZ4"} developerKey - Your Google Developer API Key.
 * @param {"https://www.googleapis.com/auth/drive"} scope - Array of OAuth 2.0 scopes.
 * @returns {Object} - An object containing the loading state and any initialization errors.
 */
const useGooglePicker = (clientId, developerKey, scope) => {
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [isPickerLoaded, setIsPickerLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Loads the Google APIs script.
     */
    const loadGapiScript = () => {
      return new Promise((resolve, reject) => {
        // Check if gapi is already loaded
        if (window.gapi) {
          resolve();
          return;
        }

        // Create script element
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject(new Error("Failed to load gapi script."));
        };

        document.body.appendChild(script);
      });
    };

    /**
     * Initializes the Google API client.
     */
    const initGapiClient = async () => {
      try {
        await window.gapi.load("client:auth2", async () => {
          await window.gapi.client.init({
            apiKey: developerKey,
            clientId: clientId,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            scope: scope.join(" "),
          });

          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

          setIsGapiLoaded(true);
        });
      } catch (err) {
        console.error("Error initializing gapi client:", err);
        setError(err);
      }
    };

    /**
     * Updates the sign-in status.
     *
     * @param {boolean} isSignedIn - The current sign-in status.
     */
    const updateSigninStatus = (isSignedIn) => {
      if (isSignedIn) {
        setIsPickerLoaded(true);
      } else {
        setIsPickerLoaded(false);
      }
    };

    /**
     * Main function to load and initialize Google APIs.
     */
    const loadAndInitGapi = async () => {
      try {
        await loadGapiScript();
        await initGapiClient();
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    loadAndInitGapi();

    // Cleanup function to remove the script if needed
    return () => {
      // Optional: Remove the script if you want to reload it every time
      // However, it's generally not necessary and can cause issues
      // const scripts = document.querySelectorAll("script[src='https://apis.google.com/js/api.js']");
      // scripts.forEach((script) => script.remove());
    };
  }, [clientId, developerKey, scope]);

  return { isGapiLoaded, isPickerLoaded, error };
};

export default useGooglePicker;
