import React, { useEffect, useRef, useState } from 'react';

// Detect touch-only devices (phones / tablets) — no real mouse present
const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Move the dot instantly via ref (no React re-render)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      // Move the ring (CSS transition will handle the smooth follow)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      if (!visible) setVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const hovering =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('glass-panel');

      if (cursorRef.current) {
        cursorRef.current.classList.toggle('hovering', hovering);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;
