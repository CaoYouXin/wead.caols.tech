precision mediump float;

uniform sampler2D u_texture;

varying vec2 v_uv;
 
void main() {
  // // Generate noisy x value
  // vec2 n0Uv = vec2(v_uv.x*1.4 + 0.01, v_uv.y - u_now*0.69);
  // vec2 n1Uv = vec2(v_uv.x*0.5 - 0.033, v_uv.y*2.0 - u_now*0.12);
  // vec2 n2Uv = vec2(v_uv.x*0.94 + 0.02, v_uv.y*3.0 - u_now*0.61);
  // float n0 = (texture2D(u_texture, n0Uv).w-0.5)*2.0;
  // float n1 = (texture2D(u_texture, n1Uv).w-0.5)*2.0;
  // float n2 = (texture2D(u_texture, n2Uv).w-0.5)*2.0;
  // float noiseA = clamp(n0 + n1 + n2, -1.0, 1.0);

  // // Generate noisy y value
  // vec2 n0UvB = vec2(v_uv.x*0.7 - 0.01, v_uv.y - u_now*0.27);
  // vec2 n1UvB = vec2(v_uv.x*0.45 + 0.033, v_uv.y*1.9 - u_now*0.61);
  // vec2 n2UvB = vec2(v_uv.x*0.8 - 0.02, v_uv.y*2.5 - u_now*0.51);
  // float n0B = (texture2D(u_texture, n0UvB).w-0.5)*2.0;
  // float n1B = (texture2D(u_texture, n1UvB).w-0.5)*2.0;
  // float n2B = (texture2D(u_texture, n2UvB).w-0.5)*2.0;
  // float noiseB = clamp(n0B + n1B + n2B, -1.0, 1.0);

  // vec2 finalNoise = vec2(noiseA, noiseB);
  // float perturb = (1.0 - v_uv.y) * 0.35 + 0.02;
  // finalNoise = (finalNoise * perturb) + v_uv - 0.02;
  
  // vec4 color = texture2D(u_texture, finalNoise);
  // color = vec4(color.x*2.0, color.y*0.9, (color.y/color.x)*0.2, 1.0);
  // finalNoise = clamp(finalNoise, 0.05, 1.0);
  // color.w = texture2D(u_texture, finalNoise).z*2.0;
  // color.w = color.w*texture2D(u_texture, v_uv).z;
  gl_FragColor = texture2D(u_texture, v_uv);
}