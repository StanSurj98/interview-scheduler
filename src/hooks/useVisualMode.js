import { useState } from 'react';

const useVisualMode = (initial) => {
  // Takes an initial mode, sets the state to it
  const [mode, setMode] = useState(initial);


  // Ultimately, we want to return an object with that mode as its property
  return { mode: mode }; // return as key:val so that tests/components can access it later
}

export default useVisualMode;