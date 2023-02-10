import React, { MouseEvent, useRef, ReactElement } from 'react';

interface IDraggable {
  className: string | undefined;
  children: ReactElement;
}

const Draggable = ({ className, children }: IDraggable) => {
  const slider = useRef<HTMLDivElement>(null);

  let mouseDown = false;
  let startX: number, scrollLeft: number;

  const startDragging = function (e: MouseEvent<HTMLDivElement>) {
    mouseDown = true;
    startX = e.pageX - slider.current!.offsetLeft;
    scrollLeft = slider.current!.scrollLeft;
  };
  const stopDragging = () => {
    mouseDown = false;
  };

  function mouseMoveEvent(e: MouseEvent<HTMLDivElement>) {
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.current!.offsetLeft;
    const scroll = x - startX;
    slider.current!.scrollLeft = scrollLeft - scroll;
  }

  return (
    <div
      ref={slider}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={mouseMoveEvent}
      className={className}
    >
      {children}
    </div>
  );
};

export default Draggable;
