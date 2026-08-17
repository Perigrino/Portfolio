/*
 * Brand voice — keep every edit inside these lines:
 * - Terminal-native: commands, paths, `$` prompts, `ls`/`./` verbs.
 * - Honest and self-directed: tutorials → shipped code, zero hype.
 * - Concrete beats abstract: name the product, the town, the tool.
 * - One idea per sentence. Cut filler. Rhythm matters.
 * - Stats live in highlights; stories live in paragraphs. Don't repeat them.
 */

export type Project = {
  title: string
  tagline: string
  description: string
  stack: string[]
  image: string
  year: string
  /** Optional: live demo URL. Omit to hide the demo link on the card. */
  demo?: string
  /** Optional: source code URL. Omit to hide the source link on the card. */
  repo?: string
}

type StackCategory = {
  category: string
  items: string[]
}

type ProcessStep = {
  step: string
  title: string
  description: string
}

type SectionHeading = {
  tag: string
  title: string
}

type Social = {
  label: string
  url: string
}

type Content = {
  name: string
  role: string
  headline: string
  subheadline: string[]
  location: string
  email: string
  /** Actual recipient for `mailto:` links — `email` stays as the public address shown. */
  emailTo: string
  socials: Social[]
  about: {
    intro: string
    paragraphs: string[]
    highlights: string[]
  }
  stack: StackCategory[]
  tools: string[]
  projects: Project[]
  process: ProcessStep[]
  /** Closing mantra under the process steps. */
  processClosing: string
  contact: {
    headline: string
    paragraphs: string[]
  }
  /** Copy for the hero terminal window. */
  terminal: {
    windowTitle: string
    prompt: string
    cwd: string
    whoami: string
    /** Output echoed under `whoami` — a one-line identity drawn from about.intro. */
    whoamiOutput: string
    cat: string
    gitLog: string
    gitLogOutput: string
  }
  /** UI labels: nav, section headings, CTAs — every visible string. */
  ui: {
    skip: string
    navAria: string
    backToTop: string
    backToTopAria: string
    nav: { id: string; label: string }[]
    sections: {
      about: SectionHeading
      stack: SectionHeading
      projects: SectionHeading
      process: SectionHeading
      contact: SectionHeading
    }
    cta: {
      viewProjects: string
      sayHello: string
    }
    toolsLabel: string
    projectLinks: {
      demo: string
      source: string
    }
    menu: {
      open: string
      close: string
    }
    theme: {
      light: string
      dark: string
      lightAria: string
      darkAria: string
    }
  }
}

export const content: Content = {
  name: 'perigrino',
  role: 'C# / .NET Developer',
  headline: 'Ideas in. Products out.',
  subheadline: [
    'C#/.NET-first, branching into web apps — and shipping. Building real products for Ghana.',
  ],
  location: 'Accra, Ghana',
  email: 'hello@perigrino.dev',
  emailTo: 'chasebruce1992@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/perigrino' },
    { label: 'X / Twitter', url: 'https://x.com/perigrino_' },
  ],
  about: {
    intro:
      'I’m **Perigrino Bruce**, a self-directed developer in Accra, Ghana — early in my journey, but building toward a long-term career. What started with tutorials and small projects has become a serious commitment to making software that works for real people.',
    paragraphs: [
      'I work mainly in **C#, .NET, Web APIs, Entity Framework Core, JWT authentication, Clean Architecture, and full-stack web development**. But technology was never the point — solving problems is. That’s why the ideas I keep returning to are practical ones: tools for local businesses, compliance systems, vehicle and licence verification, digital wallets — software with real value in Ghana and beyond.',
      'AI-assisted development is a big part of how I build — moving from idea to prototype faster, exploring solutions, learning new technologies, and shipping sooner. It’s a powerful tool alongside the fundamentals I keep building. I’m still learning, still experimenting: building things, breaking them, and figuring out why they broke.',
      'This portfolio is a snapshot of that journey — the things I’ve built, the problems I’ve explored, and the progress toward the developer I want to become. **I’m early in the journey, but I’m serious about where I’m going — and I’m just getting started.**',
    ],
    highlights: [
      '10 of 14 repos are C# / .NET',
      'Peak: 103 contributions in 2023',
      '84 contributions in 2026 — just getting started',
      '3 product apps shipped in 2026',
    ],
  },
  stack: [
    { category: 'Languages', items: ['C#', 'TypeScript', 'SQL', 'JavaScript'] },
    { category: 'Backend (.NET)', items: ['ASP.NET Core', 'EF Core', 'WebAPI', 'JWT Auth', 'Clean Architecture'] },
    { category: 'Frontend', items: ['Next.js', 'React', 'Vue', 'Tailwind CSS'] },
    { category: 'Ship & Deploy', items: ['Vercel', 'GitHub', 'REST APIs', 'Git'] },
  ],
  tools: [
    'Visual Studio',
    'VS Code',
    '.NET CLI',
    'Postman',
    'GitHub',
    'Vercel',
    'Git',
  ],
  // NOTE: repo URLs follow the github.com/perigrino/<repo> pattern — swap in
  // your real links. Add `demo` only where a live build exists.
  projects: [
    {
      title: 'InvoiceFlow',
      tagline: 'Next.js invoice generator · live on Vercel',
      description:
        'Invoices with PDF export, multi-currency, accounts and dark mode. The most active repo right now, 30+ commits and still pushing. Full-stack Next.js, end to end.',
      stack: ['Next.js', 'TypeScript', 'Vercel'],
      image: '/assets/img/finance-desk.jpg',
      year: '2026',
      demo: 'https://invoiceflow-ivory-rho.vercel.app/login',
      repo: 'https://github.com/Perigrino/Invoice_App',
    },
    {
      title: 'Motorly',
      tagline: 'Vehicle & licence verification terminal',
      description:
        'Mobile-first field terminal for Ghana traffic officers. Checks plates and licences on the spot, with an audit trail on every lookup. Newest project, shipped August 2026.',
      stack: ['C#', '.NET', 'Mobile-first'],
      image: '/assets/img/traffic-officer.jpg',
      year: '2026',
      repo: 'https://github.com/perigrino/Motorly',
    },
    {
      title: 'Accra-City-Towns-Api',
      tagline: 'REST API of Ghana towns',
      description:
        'REST API serving Ghana towns and cities. Small and focused — built for people here, not for a tutorial.',
      stack: ['C#', 'ASP.NET Core', 'REST'],
      image: '/assets/img/accra-skyline.jpg',
      year: '2023',
      repo: 'https://github.com/perigrino/Accra-City-Towns-Api',
    },
    {
      title: 'ComplySync',
      tagline: 'Business compliance API',
      description:
        'Compliance tooling for local businesses. Product-minded from day one, the kind of API that makes formal paperwork a little less painful.',
      stack: ['C#', '.NET', 'API'],
      image: '/assets/img/complysync.jpg',
      year: '2025',
      repo: 'https://github.com/perigrino/ComplySync',
    },
    {
      title: 'Kopie',
      tagline: 'Native macOS clipboard manager',
      description:
        'Menu-bar first, keyboard-first, fast, local-only. Everything you copy, available when you need it.',
      stack: ['Swift', 'SwiftUI', 'macOS'],
      image: '/assets/img/kopie.jpg',
      year: '2025',
      repo: 'https://github.com/perigrino/Kopie',
    },
    {
      title: 'AdTaskly',
      tagline: 'Browser task manager with live team sessions',
      description:
        'A fast, beautiful task manager that runs entirely in your browser — pick an identity and work solo or with a live team, no account required. React 19, TypeScript, Vite.',
      stack: ['React', 'TypeScript', 'Vite'],
      image: '/assets/img/adtaskly.jpg',
      year: '2026',
      repo: 'https://github.com/perigrino/AdTaskly',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Explore',
      description:
        'Start with a problem worth solving. Understand who it’s for, what they need, and what a useful solution could look like. You don’t need everything figured out — you need a direction worth building.',
    },
    {
      step: '02',
      title: 'Build',
      description:
        'Turn the idea into something real. AI-assisted development and vibe coding get me from concept to working software fast. The first version doesn’t need to be perfect — it needs to exist.',
    },
    {
      step: '03',
      title: 'Refine',
      description:
        'Once it works, make it better. Clean up the code, sharpen the experience, tighten the UI, fix what feels wrong, and learn as you go. This is where a prototype starts becoming a product.',
    },
    {
      step: '04',
      title: 'Ship',
      description:
        'Put it in the hands of real people. Deploy it, gather feedback, learn from what happens, and iterate. Every release is another chance to improve.',
    },
  ],
  processClosing:
    'Explore → Build → Refine → Ship — then repeat. That’s the workflow.',
  contact: {
    headline: 'Let’s Build Something',
    paragraphs: [
      'I’m open to collaborations, freelance projects, and opportunities to build meaningful products.',
      'I’m still growing as a developer — but I bring curiosity, a willingness to learn, and a bias toward shipping. I enjoy taking an idea from “what if?” to something people can actually use.',
      'If you have a problem worth solving, let’s build it.',
    ],
  },
  terminal: {
    windowTitle: 'zsh',
    prompt: 'perigrino',
    cwd: '~/portfolio',
    whoami: 'whoami',
    whoamiOutput: 'perigrino — self-directed dev · early in the journey',
    cat: 'cat vibe.txt',
    gitLog: 'git log --oneline -1',
    gitLogOutput: '5319555 fix: update email recipient',
  },
  ui: {
    skip: 'Skip to content',
    navAria: 'Sections',
    backToTop: '↑ /top',
    backToTopAria: 'Back to top',
    nav: [
      { id: 'about', label: '~about' },
      { id: 'stack', label: '~stack' },
      { id: 'projects', label: '~shipped' },
      { id: 'process', label: '~process' },
      { id: 'contact', label: '~contact' },
    ],
    sections: {
      about: { tag: '// about', title: 'whoami' },
      stack: { tag: '// stack', title: 'the_arsenal' },
      projects: { tag: '// projects', title: 'ls ./shipped' },
      process: { tag: '// process', title: './workflow.sh' },
      contact: { tag: '// contact', title: 'send_hello' },
    },
    cta: {
      viewProjects: './view_projects',
      sayHello: './say_hello',
    },
    toolsLabel: 'vibe_tools$',
    projectLinks: {
      demo: '▲ live_demo',
      source: '</> source',
    },
    menu: {
      open: 'Open menu',
      close: 'Close menu',
    },
    theme: {
      light: 'light',
      dark: 'dark',
      lightAria: 'Switch to light theme',
      darkAria: 'Switch to dark theme',
    },
  },
}

export const pexelsCredit = {
  note: '# Photos & video from Pexels',
  label: 'pexels.com',
  url: 'https://www.pexels.com/',
}
