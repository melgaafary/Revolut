import React, {useState, useEffect, useRef} from 'react';

// Courtesy of https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Just a helper hook, could have used the build it useEffect but this is much cleaner

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
