// Holographic Shader
export const holographicVertexShader = \`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

export const holographicFragmentShader = \`
  uniform float time;
  uniform vec3 color;
  uniform float opacity;
  uniform float glowIntensity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

    // Scanlines
    float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.05 + 0.95;

    // Holographic flicker
    float flicker = sin(time * 10.0) * 0.02 + 0.98;

    // Edge glow
    float edge = fresnel * glowIntensity;

    // Combine effects
    vec3 finalColor = color * scanline * flicker + vec3(edge);
    float finalOpacity = opacity * (0.7 + fresnel * 0.3);

    gl_FragColor = vec4(finalColor, finalOpacity);
  }
\`;