import { useEffect, useMemo, useState } from "react";

const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(() => ({
    x: window.scrollX,
    y: window.scrollY,
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const x = useMemo(() => scrollPosition.x, [scrollPosition.x]);
  const y = useMemo(() => scrollPosition.y, [scrollPosition.y]);

  return { x, y };
};

export default useWindowScroll;
