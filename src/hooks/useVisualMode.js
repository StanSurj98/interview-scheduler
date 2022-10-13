import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    // replaces last mode in history with next mode, else append mode to history
    setHistory((prev) =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  };

  const back = () => {
    if (history.length < 2) return;

    // setHistory to NOT include the previous last item in the array
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  // mode state always as LAST item of [ history ]
  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
