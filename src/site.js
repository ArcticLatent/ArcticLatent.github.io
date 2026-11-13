// The page's text, links and apps.

export const siteUrl = "https://burceboran.ca";
export const resumeUrl = "/Burce_Boran_Resume_2026.pdf";
export const imdbUrl = "https://www.imdb.com/name/nm9667865/";
export const githubUrl = "https://github.com/ArcticLatent";
export const linkedinUrl = "https://www.linkedin.com/in/burceboran/";
export const youtubeUrl = "https://www.youtube.com/@ArcticLatent";

export const pageTitle = "Burce Boran, GenAI TD in VFX pipeline";
export const pageDescription =
  "GenAI TD in VFX pipeline, after over 15 years in visual effects, most recently as an asset supervisor (The Mandalorian, Star Trek: Discovery, Avatar: The Last Airbender). I also teach ComfyUI on Arctic Latent and build free, open-source apps.";
export const email = "burce.boran@gmail.com";

// A reel's still is its Vimeo thumbnail unless `still` says otherwise: a
// path to a frame in public/ (e.g. "/reel-2025.webp"), or false for none.
export const reels = [
  { label: "VFX demo reel", url: "https://vimeo.com/1044521891" },
  { label: "Unreal environment reel", url: "https://vimeo.com/1090716436" },
  { label: "Previous VFX demo reel", url: "https://vimeo.com/424411862" },
  { label: "Early VFX demo reel", url: "https://vimeo.com/299818240" }
];

// My credits, as on my résumé: these are the ones shown. Metacritic adds
// each one's poster, year and kind; `year` and `type` here stand in when
// Metacritic doesn't list it. `episodes`: the ones I worked on.
export const credits = [
  { title: "Final Destination: Bloodlines" },
  { title: "Borderlands", type: "Film", year: 2024 },
  { title: "Avatar: The Last Airbender", episodes: 8 },
  { title: "Goliath", episodes: 10 },
  { title: "The Mandalorian", episodes: 4 },
  { title: "Star Trek: Discovery", episodes: 21 },
  { title: "Carnival Row", episodes: 8 },
  { title: "Colony", episodes: 6 },
  { title: "See", episodes: 1 },
  { title: "The Stand", episodes: 1 },
  { title: "Midway" },
  { title: "Goosebumps 2: Haunted Halloween" }
];

// The apps I build (the same four as on my GitHub profile).
export const apps = [
  {
    name: "harlo",
    href: "https://harlo.run",
    platforms: "Linux · iPhone",
    description: "Your coding agents in one native app: Claude Code, OpenCode, pi and Oh My Pi, with an iPhone app to follow and answer them.",
    tech: ["Rust", "Qt 6", "SwiftUI"]
  },
  {
    name: "ComfyPilot",
    href: "https://github.com/ArcticLatent/ComfyPilot",
    platforms: "Linux · Windows",
    description: "Install, run and keep ComfyUI up to date, with the right models, LoRAs and workflows for your GPU.",
    tech: ["Rust", "Qt 6", "ComfyUI"]
  },
  {
    name: "Bootcraft",
    href: "https://github.com/ArcticLatent/Bootcraft",
    platforms: "Fedora · Arch · Ubuntu · Mint · Debian",
    description: "Set up a fresh Linux install in one go: drivers, codecs, Flatpak and your apps.",
    tech: ["Rust", "Qt 6", "Linux"]
  },
  {
    name: "ComfyCatalog",
    href: "https://github.com/ArcticLatent/ComfyCatalog",
    platforms: "",
    description: "The catalog behind ComfyPilot: curates its models, LoRAs and workflows, from a link to a published catalog in a few clicks.",
    tech: ["Rust", "TypeScript", "Supabase"]
  }
];

// For search engines (schema.org).
const person = { "@type": "Person", name: "Burce Boran" };
export const structuredData = [
  {
    "@context": "https://schema.org",
    ...person,
    url: siteUrl,
    jobTitle: "GenAI TD, Pipeline",
    description: pageDescription,
    sameAs: [linkedinUrl, githubUrl, youtubeUrl, reels[0].url, imdbUrl],
    knowsAbout: [
      "Visual Effects",
      "Generative AI",
      "VFX Pipeline",
      "Asset Supervision",
      "3D Assets",
      "Texturing",
      "AI Workflows",
      "ComfyUI",
      "Creative Technology",
      "Desktop App Development"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Burce Boran",
    url: siteUrl,
    description: pageDescription,
    author: person
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Burce Boran",
    url: `${siteUrl}/`,
    description: pageDescription,
    about: person,
    hasPart: [
      ...reels.map((reel) => ({ "@type": "VideoObject", name: `Burce Boran: ${reel.label}`, url: reel.url })),
      { "@type": "CreativeWork", name: "Arctic Latent", url: youtubeUrl },
      { "@type": "ProfilePage", name: "IMDb filmography", url: imdbUrl },
      { "@type": "ProfilePage", name: "GitHub", url: githubUrl },
      { "@type": "ProfilePage", name: "LinkedIn", url: linkedinUrl }
    ]
  }
];
