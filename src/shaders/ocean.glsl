// Liquidity Ocean Shader
export const oceanVertexShader = \`
  uniform float time;
  uniform float waveHeight;
  uniform float waveFrequency;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Multiple wave layers
    float wave1 = sin(pos.x * waveFrequency + time) * waveHeight;
    float wave2 = sin(pos.z * waveFrequency * 0.7 + time * 1.3) * waveHeight * 0.5;
    float wave3 = sin((pos.x + pos.z) * waveFrequency * 0.5 + time * 0.8) * waveHeight * 0.3;

    pos.y += wave1 + wave2 + wave3;
    vElevation = pos.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
\`;

export const oceanFragmentShader = \`
  uniform vec3 deepColor;
  uniform vec3 shallowColor;
  uniform float time;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Color based on elevation (depth)
    float mixStrength = (vElevation + 0.5) * 0.5;
    vec3 color = mix(deepColor, shallowColor, mixStrength);

    // Foam on peaks
    float foam = smoothstep(0.3, 0.5, vElevation);
    color = mix(color, vec3(1.0), foam * 0.3);

    // Transparency based on depth
    float alpha = 0.7 + mixStrength * 0.3;

    gl_FragColor = vec4(color, alpha);
  }
\`;