import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useWindowScroll from "../hooks/useWindowScroll";
import useWindowSize from "../hooks/useWindowSize";

function VirtualScroll({
  children,
  itemHeight,
  columnGap = 0,
  renderAhead = 5,
}) {
  const [viewportY, setViewportY] = useState(0);
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  const animationId = useRef(null);
  const scrollRef = useRef(null);

  const relativeY = y - viewportY;

  useEffect(() => {
    const maintainPositionY = () => {
      const viewportY =
        (scrollRef.current?.getBoundingClientRect().y ?? 0) + window.scrollY;
      setViewportY(viewportY);
    };

    animationId.current = requestAnimationFrame(maintainPositionY);

    return () => {
      cancelAnimationFrame(animationId.current);
    };
  }, []);

  const containerHeight = (itemHeight + columnGap) * children.length;

  const startIndex = Math.max(
    Math.floor(relativeY / (itemHeight + columnGap)) - renderAhead,
    0
  );

  const endIndex = Math.min(
    Math.ceil(height / (itemHeight + columnGap) + startIndex) + renderAhead,
    children.length
  );

  const visibleItem = children.slice(
    Math.max(startIndex, 0),
    Math.min(endIndex + 1, children.length)
  );

  const translateY = Math.max((itemHeight + columnGap) * startIndex, columnGap);

  return (
    <div
      style={{
        height: `${containerHeight}px`,
      }}
      ref={scrollRef}
    >
      <div style={{ transform: `translateY(${translateY}px)` }}>
        {visibleItem}
      </div>
    </div>
  );
}

VirtualScroll.propTypes = {
  children: PropTypes.node.isRequired,
  itemHeight: PropTypes.number.isRequired,
  columnGap: PropTypes.number,
  renderAhead: PropTypes.number,
};

export default VirtualScroll;
