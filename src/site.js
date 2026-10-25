// The page's text, links and apps.

export const siteUrl = "https://burceboran.ca";
export const resumeUrl = "/Burce_Boran_Resume_2026.pdf";
export const imdbUrl = "https://www.imdb.com/name/nm9667865/";
export const githubUrl = "https://github.com/ArcticLatent";
export const linkedinUrl = "https://www.linkedin.com/in/burceboran/";
export const youtubeUrl = "https://www.youtube.com/@ArcticLatent";

export const pageTitle = "Burce Boran | Asset Supervisor, VFX, AI Workflows and Apps";
export const pageDescription =
  "Burce Boran is an Asset Supervisor sharing VFX work, film and television credits, AI workflows, ComfyUI education, GitHub projects, and creative technology experiments.";
export const ledeText = "Asset supervision, VFX, AI workflows, ComfyUI education, and the apps I build, in one place.";

export const reels = [
  { label: "VFX Demo Reel", url: "https://vimeo.com/1044521891" },
  { label: "Unreal Environment Reel", url: "https://vimeo.com/1090716436" },
  { label: "VFX Demo Reel 2", url: "https://vimeo.com/424411862" },
  { label: "VFX Demo Reel 3", url: "https://vimeo.com/299818240" }
];

export const aboutParagraphs = [
  `Asset Supervisor with 15+ years of experience across design, visual effects, film, and television. Experienced in leading asset teams, improving workflows, and delivering high-quality 3D assets and textures for film and television.`,
  `Known for mentoring artists, coaching teams, teaching practical workflows, and creating supportive environments where people can grow while delivering strong production results.`,
  `Credits include Final Destination: Bloodlines, Borderlands, Avatar: The Last Airbender (8 episodes, all 3 seasons), Goliath (10 episodes), The Mandalorian (4 episodes), Star Trek: Discovery (21 episodes), Carnival Row (8 episodes), Colony (6 episodes), See (1 episode), The Stand (1 episode), Midway, and Goosebumps 2: Haunted Halloween.`,
  `Alongside that production background, brings strong curiosity for new AI tools and emerging technology, now applying that mindset to AI workflow design, ComfyUI education, and free, open-source creator tools: native Linux apps such as harlo, ComfyPilot and Bootcraft, with a focus on practical systems and artist-friendly pipelines.`
];

// The cards beside the headline. `section`: what it opens on the page (its
// id, also the address: burceboran.ca/#apps); `about`: the About text in
// place of the headline; otherwise `href`, another site.
export const links = [
  { label: "About Me", note: "Background, credits, and focus", icon: "about", about: true },
  { label: "VFX Demo Reel", note: "Selected professional work", icon: "reel", section: "reels" },
  { label: "Arctic Latent", note: "ComfyUI and AI tutorials", icon: "youtube", section: "videos" },
  { label: "Filmography", note: "Credits and production work", icon: "film", section: "films" },
  { label: "Apps", note: "harlo, ComfyPilot, Bootcraft and more", icon: "github", section: "apps" },
  { label: "LinkedIn", note: "Professional profile and experience", icon: "linkedin", href: linkedinUrl }
];

// The apps I build (the same four as on my GitHub profile).
export const apps = [
  {
    name: "harlo",
    href: "https://harlo.run",
    logo: "/apps/harlo.svg",
    accent: "#c6a0f6",
    platforms: "Linux · iPhone",
    description: "Your coding agents in one native app: Claude Code, OpenCode, pi and Oh My Pi, with an iPhone app to follow and answer them.",
    tech: ["Rust", "Qt 6", "SwiftUI"]
  },
  {
    name: "ComfyPilot",
    href: "https://github.com/ArcticLatent/ComfyPilot",
    logo: "/apps/comfypilot.svg",
    tile: true,
    accent: "#bd93f9",
    platforms: "Linux · Windows",
    description: "Install, run and keep ComfyUI up to date, with the right models, LoRAs and workflows for your GPU.",
    tech: ["Rust", "Qt 6", "ComfyUI"]
  },
  {
    name: "Bootcraft",
    href: "https://github.com/ArcticLatent/Bootcraft",
    logo: "/apps/bootcraft.svg",
    accent: "#5ee0b5",
    platforms: "Fedora · Arch · Ubuntu · Mint · Debian",
    description: "Set up a fresh Linux install in one go: drivers, codecs, Flatpak and your apps.",
    tech: ["Rust", "Qt 6", "Linux"]
  },
  {
    name: "ComfyCatalog",
    href: "https://github.com/ArcticLatent/ComfyCatalog",
    logo: "/apps/comfypilot.svg",
    tile: true,
    accent: "#ff79c6",
    platforms: "The catalog behind ComfyPilot",
    description: "Curates ComfyPilot's models, LoRAs and workflows: from a link to a published catalog in a few clicks.",
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
    jobTitle: "Asset Supervisor",
    description: pageDescription,
    sameAs: [linkedinUrl, githubUrl, youtubeUrl, reels[0].url, imdbUrl],
    knowsAbout: [
      "Visual Effects",
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
      ...reels.map((reel) => ({ "@type": "VideoObject", name: reel.label, url: reel.url })),
      { "@type": "CreativeWork", name: "Arctic Latent", url: youtubeUrl },
      { "@type": "ProfilePage", name: "IMDb Filmography", url: imdbUrl },
      { "@type": "ProfilePage", name: "GitHub", url: githubUrl },
      { "@type": "ProfilePage", name: "LinkedIn", url: linkedinUrl }
    ]
  }
];
