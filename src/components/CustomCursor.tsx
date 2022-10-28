import React, { FC, useEffect, useRef } from 'react';

interface CustomCursorProps {}

const CustomCursor: FC<CustomCursorProps> = ({}) => {
  const cursor = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    cursor.current!.style.left = `${clientX}px`;
    cursor.current!.style.top = `${clientY}px`;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  return <div ref={cursor} className="custom-cursor"></div>;
};

export default CustomCursor;
