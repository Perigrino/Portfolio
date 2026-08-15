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

export type StackCategory = {
  category: string
  items: string[]
}

export type ProcessStep = {
  step: string
  title: string
  description: string
}

export type SectionHeading = {
  tag: string
  title: string
}

export type Social = {
  label: string
  url: string
}

export type Content = {
  name: string
  role: string
  headline: string
  subheadline: string
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
  contact: {
    headline: string
    note: string
  }
  /** Copy for the hero terminal window. */
  terminal: {
    windowTitle: string
    prompt: string
    cwd: string
    whoami: string
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
  subheadline:
    'C#/.NET-first, branching into web apps — and shipping. Building real products for Ghana.',
  location: 'Accra, Ghana',
  email: 'hello@perigrino.dev',
  emailTo: 'chasebruce@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/perigrino' },
    { label: 'X / Twitter', url: 'https://x.com/perigrino_' },
  ],
  about: {
    intro:
      'I’m Perigrino Bruce — a self-directed developer in Accra. 11 of 13 repos are C#: WebAPIs, EF Core, JWT auth, Clean Architecture. I learned .NET the honest way — tutorials first, shipped code after — and now I build full-stack web apps.',
    paragraphs: [
      'The through-line: tools that solve real problems for people here. Town data for Accra. Vehicle and licence verification for Ghana traffic officers. Compliance APIs. Digital wallets. Not tutorials wearing a trench coat — real things people can use.',
      'The trajectory tells the story. 2022–23 was the learning grind: demos and Clean Architecture reps. 2024 was consolidation. 2025–26 is product work — full-stack apps, deployments, releases. Git history as progress report.',
    ],
    highlights: [
      '11 of 13 repos are C# / .NET',
      'Peak: 103 contributions in 2023',
      '84 contributions in 2026 — and counting',
      'Accra-City-Towns-Api · 11 stars',
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
        'REST API serving Ghana towns and cities. Small, focused, and the most-starred repo on the profile. Built for people here, not for a tutorial.',
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
      title: 'DevRoutine',
      tagline: 'Dev productivity tool',
      description:
        'A tool that smooths out the daily dev loop. Building for your own daily annoyance is the most honest product work there is.',
      stack: ['C#', '.NET', 'Tooling'],
      image: '/assets/img/devroutine.jpg',
      year: '2025',
      repo: 'https://github.com/perigrino/DevRoutine',
    },
    {
      title: 'Taskly',
      tagline: 'To-do & task tracking in Vue',
      description:
        'A simple to-do and task-tracking app built with Vue. Proof the range goes beyond .NET — a clean frontend with no framework magic.',
      stack: ['Vue', 'JavaScript', 'CSS'],
      image: '/assets/img/taskly.jpg',
      year: '2023',
      repo: 'https://github.com/perigrino/Taskly',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Ideate',
      description:
        'One sentence: who is this for, and how should it make them feel? A spec is what committees write; a feeling ships.',
    },
    {
      step: '02',
      title: 'Prototype',
      description:
        'Prompt the core loop into existence in a day. Ugly is fine. Alive beats perfect.',
    },
    {
      step: '03',
      title: 'Polish',
      description:
        'The vibe-check pass. Tighten type, spacing, micro-interactions — until nothing looks generated.',
    },
    {
      step: '04',
      title: 'Ship',
      description:
        'Deploy. Share the build-log. Get feedback. Ship again. Momentum compounds. That’s the whole game.',
    },
  ],
  contact: {
    headline: 'Let’s ship your idea.',
    note: 'Open to collabs and freelance builds, especially Ghana-focused civic, compliance and fintech tooling. Self-directed, product-minded, and shipping. If it can be built, it can be shipped.',
  },
  terminal: {
    windowTitle: 'zsh',
    prompt: 'perigrino',
    cwd: '~/portfolio',
    whoami: 'whoami',
    cat: 'cat vibe.txt',
    gitLog: 'git log --oneline -1',
    gitLogOutput: '8f3a2c1 shipped: Motorly — mobile field terminal for traffic officers',
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
