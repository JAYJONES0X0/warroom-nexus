import * as THREE from 'three';

export function createPlanetTexture(type: string, color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  switch (type) {
    case 'markets':
      return createMarketsTexture(ctx, canvas, color);
    case 'intelligence':
      return createIntelligenceTexture(ctx, canvas, color);
    case 'analysis':
      return createAnalysisTexture(ctx, canvas, color);
    case 'portfolio':
      return createPortfolioTexture(ctx, canvas, color);
    case 'nexus':
      return createNexusTexture(ctx, canvas, color);
    case 'settings':
      return createSettingsTexture(ctx, canvas, color);
    default:
      return createDefaultTexture(ctx, canvas, color);
  }
}

function createMarketsTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Base gradient
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, adjustColor(color, -30));
  gradient.addColorStop(1, adjustColor(color, -60));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Grid lines (latitude/longitude)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Add some "continents" (random shapes)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 40 + 20;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createIntelligenceTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Neural network pattern
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -80));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Neural nodes
  const nodes: Array<{x: number, y: number}> = [];
  for (let i = 0; i < 30; i++) {
    nodes.push({
      x: Math.random() * 512,
      y: Math.random() * 512
    });
  }

  // Connections
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Nodes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createAnalysisTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Chart pattern
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -70));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Candlestick-like patterns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  for (let x = 20; x < 512; x += 40) {
    const y1 = 256 + Math.sin(x / 50) * 100 + (Math.random() - 0.5) * 50;
    const y2 = y1 + (Math.random() - 0.5) * 60;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();

    ctx.fillStyle = y2 > y1 ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)';
    ctx.fillRect(x - 8, Math.min(y1, y2), 16, Math.abs(y2 - y1));
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createPortfolioTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Metallic gold texture
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, adjustColor(color, -20));
  gradient.addColorStop(1, adjustColor(color, -50));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Hexagonal pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  const hexSize = 30;
  for (let y = 0; y < 512; y += hexSize * 1.5) {
    for (let x = 0; x < 512; x += hexSize * Math.sqrt(3)) {
      const offsetX = (y / (hexSize * 1.5)) % 2 === 0 ? 0 : hexSize * Math.sqrt(3) / 2;
      drawHexagon(ctx, x + offsetX, y, hexSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createNexusTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Data stream pattern
  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -60));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Flowing data lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    const startY = (i / 15) * 512;
    ctx.moveTo(0, startY);
    for (let x = 0; x < 512; x += 20) {
      const y = startY + Math.sin(x / 30 + i) * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Data points
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createSettingsTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  // Mechanical/tech pattern
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -40));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Circuit board pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    const x1 = Math.random() * 512;
    const y1 = Math.random() * 512;
    const x2 = x1 + (Math.random() - 0.5) * 100;
    const y2 = y1 + (Math.random() - 0.5) * 100;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Connection points
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x1 - 3, y1 - 3, 6, 6);
    ctx.fillRect(x2 - 3, y2 - 3, 6, 6);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createDefaultTexture(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string): THREE.Texture {
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -50));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const hx = x + size * Math.cos(angle);
    const hy = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.stroke();
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
