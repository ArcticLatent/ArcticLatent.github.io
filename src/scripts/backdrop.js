// The page's backdrop, in WebGL: an aurora (slow curtains of light) and a
// point-cloud sculpture on a turntable, as in a 3D viewport: it settles into
// one form after another (sphere, torus knot, galaxy, wave, helix, cube),
// a scan line sweeps up it, and it leans toward the pointer. The colours are
// the stylesheet's (light or dark). With reduced motion it's drawn once and
// stays still; without WebGL the page keeps its plain background.

const HOLD = 7; // seconds a form stays
const MORPH = 2.6; // seconds from one form to the next

// ---- the forms: `count` points each, within a radius of about 1 ----------

const random = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const forms = [
  function sphere(count, rnd) {
    const out = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (2 * (i + 0.5)) / count;
      const r = Math.sqrt(1 - y * y);
      const a = i * golden;
      const k = 1 + (rnd() - 0.5) * 0.03;
      out.set([Math.cos(a) * r * k, y * k, Math.sin(a) * r * k], i * 3);
    }
    return out;
  },
  function torusKnot(count, rnd) {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const t = (i / count) * Math.PI * 2;
      const point = (u) => {
        const r = Math.cos(3 * u) + 2;
        return [r * Math.cos(2 * u) * 0.36, -Math.sin(3 * u) * 0.36, r * Math.sin(2 * u) * 0.36];
      };
      const [x, y, z] = point(t);
      const [nx, ny, nz] = point(t + 0.001);
      // Around the curve: a tube, a little uneven.
      const tangent = normalize([nx - x, ny - y, nz - z]);
      const side = normalize(cross(tangent, [0, 1, 0.3]));
      const up = cross(tangent, side);
      const a = rnd() * Math.PI * 2;
      const tube = 0.06 * Math.sqrt(rnd());
      out.set(
        [
          x + (side[0] * Math.cos(a) + up[0] * Math.sin(a)) * tube,
          y + (side[1] * Math.cos(a) + up[1] * Math.sin(a)) * tube,
          z + (side[2] * Math.cos(a) + up[2] * Math.sin(a)) * tube
        ],
        i * 3
      );
    }
    return out;
  },
  function galaxy(count, rnd) {
    const out = new Float32Array(count * 3);
    const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
    for (let i = 0; i < count; i += 1) {
      if (i < count * 0.18) {
        // The core.
        out.set([gauss() * 0.22, gauss() * 0.1, gauss() * 0.22], i * 3);
        continue;
      }
      // Two arms winding out, looser toward the edge.
      const r = 0.12 + Math.pow(rnd(), 0.7) * 1.05;
      const a = r * 4.2 + (i % 2) * Math.PI + gauss() * (0.25 + 0.2 * r);
      out.set([Math.cos(a) * r, gauss() * 0.05 * (1.3 - r), Math.sin(a) * r], i * 3);
    }
    return out;
  },
  function wave(count) {
    const out = new Float32Array(count * 3);
    const side = Math.ceil(Math.sqrt(count));
    for (let i = 0; i < count; i += 1) {
      const x = ((i % side) / (side - 1)) * 2 - 1;
      const z = (Math.floor(i / side) / (side - 1)) * 2 - 1;
      const d = Math.hypot(x, z);
      const y = 0.32 * Math.cos(d * 7) * Math.exp(-d * 1.4) - 0.05;
      out.set([x * 1.15, y, z * 1.15], i * 3);
    }
    return out;
  },
  function helix(count, rnd) {
    const out = new Float32Array(count * 3);
    const strands = Math.floor(count * 0.7);
    for (let i = 0; i < count; i += 1) {
      if (i < strands) {
        const t = (i / strands) * 2 - 1;
        const a = t * Math.PI * 3 + (i % 2) * Math.PI;
        const j = (rnd() - 0.5) * 0.05;
        out.set([Math.cos(a) * 0.45 + j, t * 1.1, Math.sin(a) * 0.45 + j], i * 3);
      } else {
        // Rungs between the strands.
        const rung = Math.floor(rnd() * 24);
        const t = (rung / 23) * 2 - 1;
        const a = t * Math.PI * 3;
        const s = rnd() * 2 - 1;
        out.set([Math.cos(a) * 0.45 * s, t * 1.1, Math.sin(a) * 0.45 * s], i * 3);
      }
    }
    return out;
  },
  function cube(count, rnd) {
    const out = new Float32Array(count * 3);
    const h = 0.68;
    for (let i = 0; i < count; i += 1) {
      // Mostly its edges (a wireframe), some on its faces.
      const p = [0, 1, 2].map(() => (rnd() < 0.5 ? -h : h));
      const free = Math.floor(rnd() * 3);
      p[free] = (rnd() * 2 - 1) * h;
      if (rnd() < 0.25) {
        const other = (free + 1 + Math.floor(rnd() * 2)) % 3;
        p[other] = (rnd() * 2 - 1) * h;
      }
      out.set(p, i * 3);
    }
    return out;
  }
];

function normalize([x, y, z]) {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// ---- WebGL --------------------------------------------------------------

const AURORA_VERTEX = `
attribute vec2 aCorner;
void main() { gl_Position = vec4(aCorner, 0.0, 1.0); }
`;

const AURORA_FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uLow;
uniform vec3 uHigh;
uniform float uStrength;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
// One curtain: a wavy lower edge, light that thins upward, in rays.
float curtain(vec2 uv, float aspect, float base, float seed, float t) {
  float x = uv.x * aspect;
  float edge = base + 0.08 * sin(x * 1.1 + t * 0.11 + seed) + 0.16 * (fbm(vec2(x * 0.55 + seed, t * 0.035)) - 0.5);
  float d = uv.y - edge;
  float lit = smoothstep(-0.09, 0.07, d) * exp(-max(d, 0.0) * 3.2);
  float rays = fbm(vec2(x * 8.0 + 3.0 * fbm(vec2(x * 1.4 + seed, t * 0.06)), t * 0.045 + seed));
  return lit * (0.15 + 1.6 * rays * rays);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float a1 = curtain(uv, aspect, 0.66, 0.0, uTime);
  float a2 = curtain(uv, aspect, 0.5, 7.3, uTime * 0.8) * 0.5;
  vec3 colour = mix(uLow, uHigh, smoothstep(0.5, 0.95, uv.y)) * a1 + mix(uHigh, uLow, smoothstep(0.3, 0.8, uv.y)) * a2;
  float alpha = clamp(a1 + a2, 0.0, 1.0) * uStrength;
  gl_FragColor = vec4(colour * uStrength, alpha);
}
`;

const SCULPTURE_VERTEX = `
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aSeed;
uniform float uMorph;
uniform float uTime;
uniform mat3 uTurn;
uniform vec2 uCentre;
uniform vec2 uScale;
uniform float uSize;
uniform float uScan;
varying float vShade;
varying float vHeight;
varying float vScan;

void main() {
  // Each point leaves a little after the last, flies out, and settles.
  float start = aSeed * 0.45;
  float t = smoothstep(start, start + 0.55, uMorph);
  vec3 drift = normalize(vec3(sin(aSeed * 91.7), cos(aSeed * 47.3), sin(aSeed * 13.1 + 1.0)));
  vec3 p = mix(aFrom, aTo, t) + drift * sin(t * 3.14159) * 0.42;
  p += drift * 0.012 * sin(uTime * 1.3 + aSeed * 40.0);

  vec3 q = uTurn * p;
  float depth = q.z + 3.2;
  gl_Position = vec4(uCentre + q.xy * uScale * (2.2 / depth), 0.0, 1.0);

  // (The scan line runs up the screen, so it crosses flat forms too.)
  vScan = exp(-pow((q.y - uScan) * 12.0, 2.0));
  vShade = smoothstep(1.3, -1.0, q.z);
  vHeight = q.y;
  gl_PointSize = uSize * (3.2 / depth) * (1.0 + vScan * 0.9);
}
`;

const SCULPTURE_FRAGMENT = `
precision mediump float;
uniform vec3 uLow;
uniform vec3 uHigh;
uniform vec3 uScanColour;
uniform float uStrength;
varying float vShade;
varying float vHeight;
varying float vScan;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float disc = smoothstep(0.5, 0.1, d);
  vec3 colour = mix(uLow, uHigh, smoothstep(-1.0, 1.0, vHeight));
  colour = mix(colour, uScanColour, vScan * 0.7);
  float alpha = disc * mix(0.22, 1.0, vShade) * (0.75 + vScan * 0.6) * uStrength;
  gl_FragColor = vec4(colour * alpha, alpha);
}
`;

function program(gl, vertex, fragment) {
  const build = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  const p = gl.createProgram();
  gl.attachShader(p, build(gl.VERTEX_SHADER, vertex));
  gl.attachShader(p, build(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}

const uniforms = (gl, p, names) => Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(p, name)]));

function attribute(gl, p, name, data, size, usage = gl.STATIC_DRAW) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  const at = gl.getAttribLocation(p, name);
  gl.enableVertexAttribArray(at);
  gl.vertexAttribPointer(at, size, gl.FLOAT, false, 0, 0);
  return buffer;
}

// The stylesheet's colours, as 0–1 RGB.
function palette() {
  const css = getComputedStyle(document.documentElement);
  const rgb = (name) => {
    const hex = css.getPropertyValue(name).trim().replace("#", "");
    return [0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16) / 255);
  };
  return { accent: rgb("--accent"), accent2: rgb("--accent-2"), fg: rgb("--fg"), light: matchMedia("(prefers-color-scheme: light)").matches };
}

export function startBackdrop(auroraCanvas, sculptureCanvas) {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const options = { alpha: true, antialias: false, premultipliedAlpha: true };
  const ag = auroraCanvas?.getContext("webgl", options);
  const sg = sculptureCanvas?.getContext("webgl", options);
  if (!ag || !sg) return;

  // The aurora: a triangle over the screen, drawn small (it's soft anyway).
  const auroraProgram = program(ag, AURORA_VERTEX, AURORA_FRAGMENT);
  ag.useProgram(auroraProgram);
  attribute(ag, auroraProgram, "aCorner", new Float32Array([-1, -1, 3, -1, -1, 3]), 2);
  const au = uniforms(ag, auroraProgram, ["uRes", "uTime", "uLow", "uHigh", "uStrength"]);

  // The sculpture: its points move from one form (aFrom) to the next (aTo).
  const phone = () => window.innerWidth < 860;
  const count = phone() ? 2600 : 5200;
  const rnd = random(7);
  const shapes = forms.map((form) => form(count, rnd));
  const sculptureProgram = program(sg, SCULPTURE_VERTEX, SCULPTURE_FRAGMENT);
  sg.useProgram(sculptureProgram);
  const seeds = new Float32Array(count).map(() => rnd());
  attribute(sg, sculptureProgram, "aSeed", seeds, 1);
  const fromBuffer = attribute(sg, sculptureProgram, "aFrom", shapes[0], 3, sg.DYNAMIC_DRAW);
  const toBuffer = attribute(sg, sculptureProgram, "aTo", shapes[1], 3, sg.DYNAMIC_DRAW);
  const su = uniforms(sg, sculptureProgram, [
    "uMorph", "uTime", "uTurn", "uCentre", "uScale", "uSize", "uScan", "uLow", "uHigh", "uScanColour", "uStrength"
  ]);
  let current = 0;
  let morphStarted = HOLD;

  let colours;
  const applyColours = () => {
    colours = palette();
    ag.useProgram(auroraProgram);
    ag.uniform3fv(au.uLow, colours.accent);
    ag.uniform3fv(au.uHigh, colours.accent2);
    ag.uniform1f(au.uStrength, colours.light ? 0.22 : 0.34);
    sg.useProgram(sculptureProgram);
    sg.uniform3fv(su.uLow, colours.accent);
    sg.uniform3fv(su.uHigh, colours.accent2);
    sg.uniform3fv(su.uScanColour, colours.light ? colours.accent : colours.fg);
    sg.uniform1f(su.uStrength, (colours.light ? 0.8 : 0.9) * (phone() ? 0.6 : 1));
    // Light adds up on a dark page; on a light one it covers.
    sg.enable(sg.BLEND);
    if (colours.light) sg.blendFunc(sg.ONE, sg.ONE_MINUS_SRC_ALPHA);
    else sg.blendFunc(sg.ONE, sg.ONE);
  };

  // Where it stands: between the headline and the link cards, or, on a
  // phone, lower down behind the cards.
  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    auroraCanvas.width = Math.ceil(width * 0.5);
    auroraCanvas.height = Math.ceil(height * 0.5);
    ag.viewport(0, 0, auroraCanvas.width, auroraCanvas.height);
    ag.useProgram(auroraProgram);
    ag.uniform2f(au.uRes, auroraCanvas.width, auroraCanvas.height);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    sculptureCanvas.width = Math.round(width * dpr);
    sculptureCanvas.height = Math.round(height * dpr);
    sg.viewport(0, 0, sculptureCanvas.width, sculptureCanvas.height);
    const panel = document.querySelector(".links-panel")?.getBoundingClientRect();
    const centreX = phone() || !panel ? width / 2 : panel.left - 16;
    const centreY = phone() ? height * 0.66 : height * 0.45;
    const radius = Math.min(width, height) * (phone() ? 0.4 : 0.38);
    // (A form of radius 1 at the turntable's centre spans 2.2 / 3.2 of uScale.)
    const scale = radius / (2.2 / 3.2);
    sg.useProgram(sculptureProgram);
    sg.uniform2f(su.uCentre, (centreX / width) * 2 - 1, 1 - (centreY / height) * 2);
    sg.uniform2f(su.uScale, (scale * 2) / width, (scale * 2) / height);
    sg.uniform1f(su.uSize, (phone() ? 2.4 : 3) * dpr);
    applyColours();
  };

  // Leaning toward the pointer, smoothly.
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );

  const turn = (angle, tilt) => {
    const c = Math.cos(angle), s = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
    // Around y (the turntable), then x (the camera looking down a little).
    return new Float32Array([c, s * st, -s * ct, 0, ct, st, s, -c * st, c * ct]);
  };

  const draw = (seconds) => {
    ag.useProgram(auroraProgram);
    ag.uniform1f(au.uTime, seconds + 40);
    ag.drawArrays(ag.TRIANGLES, 0, 3);

    if (seconds - morphStarted > MORPH) {
      // Settled: the next morph goes from this form to the one after.
      current = (current + 1) % shapes.length;
      morphStarted += HOLD + MORPH;
      sg.bindBuffer(sg.ARRAY_BUFFER, fromBuffer);
      sg.bufferSubData(sg.ARRAY_BUFFER, 0, shapes[current]);
      sg.bindBuffer(sg.ARRAY_BUFFER, toBuffer);
      sg.bufferSubData(sg.ARRAY_BUFFER, 0, shapes[(current + 1) % shapes.length]);
    }
    const morph = Math.min(1, Math.max(0, (seconds - morphStarted) / MORPH));
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    sg.useProgram(sculptureProgram);
    sg.uniform1f(su.uMorph, morph);
    sg.uniform1f(su.uTime, seconds);
    // (Still, no scan line: it would light up one band for good.)
    sg.uniform1f(su.uScan, still ? 9 : ((seconds * 0.16) % 1) * 3 - 1.5);
    sg.uniformMatrix3fv(su.uTurn, false, turn(seconds * 0.16 + pointer.x * 0.5, -0.38 - pointer.y * 0.25));
    sg.clear(sg.COLOR_BUFFER_BIT);
    sg.drawArrays(sg.POINTS, 0, count);
  };

  resize();
  window.addEventListener("resize", () => {
    resize();
    if (still) draw(3);
  });
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    applyColours();
    if (still) draw(3);
  });

  if (still) {
    current = 2;
    morphStarted = 1e9;
    sg.bindBuffer(sg.ARRAY_BUFFER, fromBuffer);
    sg.bufferSubData(sg.ARRAY_BUFFER, 0, shapes[current]);
    draw(3);
    return;
  }
  const begun = performance.now();
  const frame = (now) => {
    draw((now - begun) / 1000);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
