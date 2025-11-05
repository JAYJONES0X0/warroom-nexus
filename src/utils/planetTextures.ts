export function generatePlanetTexture(color: string, type: 'data' | 'analysis' | 'execution' | 'system'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Base gradient
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, adjustBrightness(color, -20));
  gradient.addColorStop(1, adjustBrightness(color, -40));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Add texture patterns based on type
  ctx.globalAlpha = 0.3;

  switch(type) {
    case 'data':
      drawDataPattern(ctx);
      break;
    case 'analysis':
      drawAnalysisPattern(ctx);
      break;
    case 'execution':
      drawExecutionPattern(ctx);
      break;
    case 'system':
      drawSystemPattern(ctx);
      break;
  }

  return canvas.toDataURL();
}

function adjustBrightness(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function drawDataPattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const length = Math.random() * 30 + 10;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.stroke();
  }
}

function drawAnalysisPattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 20 + 10;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawExecutionPattern(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ffffff';

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 3 + 1;

    ctx.fillRect(x, y, size, size);
  }
}

function drawSystemPattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  for (let i = 0; i < 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
}