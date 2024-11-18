import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useWindowScroll from "../hooks/useWindowScroll";
import useWindowSize from "../hooks/useWindowSize";

const VirtualScroll = ({
  children,
  itemHeight,
  columnGap = 0,
  renderAhead = 5,
}) => {
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  const scrollRef = useRef(null);
  const [viewportY, setViewportY] = useState(0);
  const relativeY = y - viewportY;

  useEffect(() => {
    const viewportY = scrollRef.current?.getBoundingClientRect().y ?? 0;
    setViewportY(viewportY);
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
};

VirtualScroll.propTypes = {
  children: PropTypes.node.isRequired,
  itemHeight: PropTypes.number.isRequired,
  columnGap: PropTypes.number,
  renderAhead: PropTypes.number,
};

export default VirtualScroll;
