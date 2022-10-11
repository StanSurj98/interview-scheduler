import { useState } from "react";

const useVisualMode = (initial) => {
  // array holding all previous mode states
  const [history, setHistory] = useState([initial]);
  // mode will be returned as last element from this array

  // Moving to a different mode for <Appointment /> conditional rendering
  const transition = (mode, replace = false) => {
    // replace truthy ? take out last item in history, insert new mode INSTEAD
    // replace falsey ? just add the new mode to the end of the array
    setHistory((prev) =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
    // NOTE => arr.slice(start, end && NOT include) and COPY of array
  };

  // Moving BACK to previous mode in the history array
  const back = () => {
    // Limit, don't allow it to go back past the initial mode in our history
    if (history.length < 2) return;

    // setHistory array to NOT include the previous last item in the array
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    // Because our hook returns mode to be -> { mode: history[at last item] }
  };

  // !! Again !! returning MODE as the state, reading as LAST item of [ history ]
  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
