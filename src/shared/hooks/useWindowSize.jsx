import { useEffect, useMemo, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const width = useMemo(() => windowSize.width, [windowSize.width]);
  const height = useMemo(() => windowSize.height, [windowSize.height]);

  return { width, height };
};

export default useWindowSize;
