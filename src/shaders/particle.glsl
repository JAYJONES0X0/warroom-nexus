// Particle System Shader
export const particleVertexShader = \`
  attribute float size;
  attribute vec3 customColor;
  attribute float alpha;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = customColor;
    vAlpha = alpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
\`;

export const particleFragmentShader = \`
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Soft edges
    float alpha = vAlpha * (1.0 - smoothstep(0.3, 0.5, dist));

    // Glow effect
    float glow = exp(-dist * 4.0);
    vec3 finalColor = vColor * glow;

    gl_FragColor = vec4(finalColor, alpha);
  }
\`;