import { Coordinates } from "@/types/config";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData(prev => ({
      ...prev,
      error: null,
      isLoading: true
    }))

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false
      })
    }

    function success(position: GeolocationPosition) {
      setLocationData({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        },
        error: null,
        isLoading: false
      })
    }

    function error(err: GeolocationPositionError) {
      let errorMsg: string;

      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMsg =
            "Location permission denied. Please enable location access.";
          break;
        case err.POSITION_UNAVAILABLE:
          errorMsg = "Location information is unavailable.";
          break;
        case err.TIMEOUT:
          errorMsg = "Location request timed out.";
          break;
        default:
          errorMsg = "An unknown error occurred.";
      }

      setLocationData({
        coordinates: null,
        error: errorMsg,
        isLoading: false
      })
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation
  }
}
