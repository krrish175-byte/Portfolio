"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveEndGameSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const game = {
      width: canvas.width,
      height: canvas.height,
      paddleWidth: 10,
      paddleHeight: 100,
      ballSize: 10,
      playerY: canvas.height / 2 - 50,
      aiY: canvas.height / 2 - 50,
      ballX: canvas.width / 2,
      ballY: canvas.height / 2,
      ballSpeedX: 5,
      ballSpeedY: 5,
      scorePlayer: 0,
      scoreAi: 0,
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = Math.min(window.innerHeight * 0.8, 600); // Max 600px height
      game.width = canvas.width;
      game.height = canvas.height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Only track if mouse is over the canvas area roughly
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const relativeY = e.clientY - rect.top;
        // Center paddle on mouse
        game.playerY = Math.max(0, Math.min(relativeY - game.paddleHeight / 2, game.height - game.paddleHeight));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resetBall = () => {
      game.ballX = game.width / 2;
      game.ballY = game.height / 2;
      game.ballSpeedX = -game.ballSpeedX; // Give to the player who lost point usually, or just flip
      game.ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 5;
    };

    const update = () => {
      // Move Ball
      game.ballX += game.ballSpeedX;
      game.ballY += game.ballSpeedY;

      // Ball collision top/bottom
      if (game.ballY <= 0 || game.ballY >= game.height - game.ballSize) {
        game.ballSpeedY = -game.ballSpeedY;
      }

      // Ball collision Left Paddle
      if (
        game.ballX <= game.paddleWidth * 2 &&
        game.ballY + game.ballSize >= game.playerY &&
        game.ballY <= game.playerY + game.paddleHeight
      ) {
        game.ballSpeedX = -game.ballSpeedX;
        game.ballX = game.paddleWidth * 2; // prevent sticking
      }

      // Ball collision Right Paddle (AI)
      if (
        game.ballX >= game.width - game.paddleWidth * 2 - game.ballSize &&
        game.ballY + game.ballSize >= game.aiY &&
        game.ballY <= game.aiY + game.paddleHeight
      ) {
        game.ballSpeedX = -game.ballSpeedX;
        game.ballX = game.width - game.paddleWidth * 2 - game.ballSize; // prevent sticking
      }

      // AI Movement (very basic)
      const aiCenter = game.aiY + game.paddleHeight / 2;
      // Add some randomness to AI so it's not perfect
      if (Math.random() > 0.2) {
        if (aiCenter < game.ballY - 20) {
          game.aiY += 4;
        } else if (aiCenter > game.ballY + 20) {
          game.aiY -= 4;
        }
      }
      
      // Keep AI in bounds
      game.aiY = Math.max(0, Math.min(game.aiY, game.height - game.paddleHeight));

      // Scoring
      let scored = false;
      if (game.ballX < 0) {
        game.scoreAi++;
        scored = true;
      } else if (game.ballX > game.width) {
        game.scorePlayer++;
        scored = true;
      }

      if (scored) {
        setScore({ player: game.scorePlayer, ai: game.scoreAi });
        resetBall();
      }
    };

    const draw = () => {
      // Clear background with slight fade for trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
      ctx.fillRect(0, 0, game.width, game.height);

      // Neon Glow styling
      ctx.shadowBlur = 15;

      // Draw Center Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(game.width / 2, 0);
      ctx.lineTo(game.width / 2, game.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Player Paddle
      ctx.shadowColor = "#00FFFF";
      ctx.fillStyle = "#00FFFF";
      ctx.fillRect(game.paddleWidth, game.playerY, game.paddleWidth, game.paddleHeight);

      // Draw AI Paddle
      ctx.shadowColor = "#FF00FF";
      ctx.fillStyle = "#FF00FF";
      ctx.fillRect(game.width - game.paddleWidth * 2, game.aiY, game.paddleWidth, game.paddleHeight);

      // Draw Ball
      ctx.shadowColor = "#FFFFFF";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(game.ballX, game.ballY, game.ballSize, game.ballSize);

      // Reset shadow
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      // Only update/draw if the canvas is roughly in view to save resources
      const rect = canvas.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        update();
        draw();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] py-32 flex flex-col items-center">
      <div className="max-w-6xl w-full px-6 flex flex-col items-center">
        <h2 className="text-4xl font-mono text-white mb-8 tracking-widest text-center">
          SYSTEM_IDLE: INITIATE_PONG
        </h2>
        
        {/* Score Board */}
        <div className="flex gap-20 font-mono text-4xl mb-8">
          <span className="text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">{score.player}</span>
          <span className="text-white/50">-</span>
          <span className="text-[#FF00FF] drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">{score.ai}</span>
        </div>

        {/* Game Canvas */}
        <div className="w-full max-w-4xl border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm relative">
          <canvas 
            ref={canvasRef} 
            className="w-full cursor-none" // Hide default cursor over canvas
            style={{ touchAction: 'none' }} // Prevent scrolling when touching on mobile
          />
        </div>
        
        <p className="mt-8 text-white/40 font-mono text-sm">USE_MOUSE_Y_AXIS_TO_CONTROL_LEFT_PADDLE</p>
      </div>
    </section>
  );
}
