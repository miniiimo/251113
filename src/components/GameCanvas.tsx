import React, { useRef, useEffect } from 'react';
import { Droplet } from '../types';
import { GAME_CONFIG } from '../constants';

interface GameCanvasProps {
  droplets: Droplet[];
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ droplets }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 구름 효과 (간단한 원들)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 5; i++) {
      const x = (i * 200) % canvas.width;
      const y = 50 + (i * 30);
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.arc(x + 25, y, 40, 0, Math.PI * 2);
      ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // 물방울과 문제 그리기
    droplets.forEach(droplet => {
      const { x, y, multiplicand, multiplier } = droplet;

      // 물방울 그림자
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.ellipse(x, y + 45, 35, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // 물방울 본체
      const dropletGradient = ctx.createRadialGradient(x - 10, y - 10, 5, x, y, 40);
      dropletGradient.addColorStop(0, '#6DD5FA');
      dropletGradient.addColorStop(1, '#2193B0');
      
      ctx.fillStyle = dropletGradient;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      // 물방울 하이라이트
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(x - 10, y - 10, 12, 0, Math.PI * 2);
      ctx.fill();

      // 테두리
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.stroke();

      // 문제 텍스트
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${multiplicand} × ${multiplier}`, x, y);
    });
  }, [droplets]);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_CONFIG.CANVAS_WIDTH}
      height={GAME_CONFIG.CANVAS_HEIGHT}
      className="game-canvas"
    />
  );
};

