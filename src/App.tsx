import { useEffect, useRef } from 'react';
import './App.css';
import cityVideo from './assets/video_1.mp4';
import useIsScrolled from './hooks/useIsScrolled';
import useWindowSize from './hooks/useWindowSize';

function App() {
  let isScrolled = useIsScrolled();
  let canvas = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    let renderingElement = canvas.current;

    if (renderingElement != null || renderingElement != undefined) {
      let drawingElement = renderingElement.cloneNode() as HTMLCanvasElement;
      let drawingCtx = drawingElement.getContext('2d');
      let renderingCtx = renderingElement.getContext('2d');

      let lastX: number;
      let lastY: number;
      let moving = false;
      if (renderingCtx) {
        renderingCtx.globalCompositeOperation = 'source-over';
        renderingCtx.fillStyle = '#000000';
        renderingCtx.fillRect(0, 0, windowSize.width, windowSize.height);

        renderingElement.addEventListener('mouseover', (e: MouseEvent) => {
          moving = true;
          lastX = e.pageX - renderingElement!.offsetLeft;
          lastY = e.pageY - renderingElement!.offsetTop;
        });

        renderingElement.addEventListener('click', (e: MouseEvent) => {
          moving = true;
          lastX = e.pageX - renderingElement!.offsetLeft;
          lastY = e.pageY - renderingElement!.offsetTop;
        });

        renderingElement.addEventListener('mouseup', (e: MouseEvent) => {
          moving = false;
          lastX = e.pageX - renderingElement!.offsetLeft;
          lastY = e.pageY - renderingElement!.offsetTop;
        });

        renderingElement.addEventListener('mousemove', (e: MouseEvent) => {
          if (moving) {
            if (renderingElement && drawingCtx && renderingCtx) {
              drawingCtx.globalCompositeOperation = 'source-over';
              renderingCtx.globalCompositeOperation = 'destination-out';
              let currentX = e.pageX - renderingElement.offsetLeft;
              let currentY = e.pageY - renderingElement.offsetTop;
              drawingCtx.lineJoin = 'round';
              drawingCtx.moveTo(lastX, lastY);
              drawingCtx.lineTo(currentX, currentY);
              drawingCtx.closePath();
              drawingCtx.lineWidth = 120;
              drawingCtx.stroke();
              lastX = currentX;
              lastY = currentY;
              renderingCtx.drawImage(drawingElement, 0, 0);
            }
          }
        });
      }
    }
  }, []);
  return (
    <div className="app">
      <video
        className={isScrolled ? 'video scrolled' : 'video'}
        autoPlay
        muted
        loop
      >
        <source src={cityVideo} />
      </video>

      <canvas
        width={windowSize.width}
        height={windowSize.height}
        ref={canvas}
      ></canvas>
      <h1>
        <span className={isScrolled ? 'herz' : ''}>Herz</span>lich Willkommen
      </h1>
    </div>
  );
}

export default App;
