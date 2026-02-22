// src/data/projects.ts
export interface Project {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags: string[];
  status: 'completed' | 'in-progress' | 'archived';
  date?: string;
}

export interface Social {
  label: string;
  href: string;
  icon: 'github' | 'linkedin'| 'mail';
}

export interface Skill {
  tag: string;
}

// ============================== PROJECTS ==============================
export const projects: Project[] = [
  {
    title: 'CHIP-8 Emulator',
    description: 'A CHIP-8 Emulator built in Rust.',
    href: 'https://github.com/chr0mazone/chip8-emulator',
    image:'https://raw.githubusercontent.com/Timendus/chip8-test-suite/refs/heads/main/pictures/ibm-logo.png',
    tags: ['rust', 'systems'],
    status: 'in-progress',
    date: 'Jan 2026 - Present',
  },
  {
    title: 'Ripple Dot Zero archive',
    description: 'An archive I made for my favourite game Ripple Dot Zero.',
    href: 'https://github.com/chr0mazone/rippledotzero',
    image:'https://www.salomonsson.se/img/rippleAnim2.gif',
    tags: ['web', 'game'],
    status: 'completed',
    date: 'Jan 2026 - Feb 2026',
  },
  {
    title: 'C2 Framework',
    description: 'A custom C2 framework I built for my final year CS project.',
    href: 'https://github.com/chr0mazone/chip8-emulator',
    image:"https://images3.alphacoders.com/134/1343189.png",
    tags: ['python', 'rust'],
    status: 'in-progress',
    date: 'Jan 2026',
  },
];

// ============================== SKILLS ==============================
export const skills: Skill[] = [
  { tag: 'linux' },
  { tag: 'python' },
  { tag: 'rust' },
  { tag: 'web' },
  { tag: 'pentest' },
  { tag: 'osint' },
  { tag: 'network' },
  { tag: 'ctf' },
  { tag: 'htb' },
  { tag: 'crypto' },
  { tag: 'pwn' },
  { tag: 'malware' },
  { tag: 'red-team' },
  { tag: 'active-directory' },
  { tag: 'windows' },
  { tag: 'privesc' },
];

// ============================== SOCIALS ==============================
export const socials: Social[] = [
  { label: 'GitHub',   href: 'https://github.com/chr0mazone',icon: 'github'},
  // { label: 'Twitter',  href: 'https://twitter.com/yourusername',     icon: 'twitter'  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arjitpraveen/', icon: 'linkedin' },
  { label: 'Mail',     href: 'mailto:arjitpraveen.sec@gmail.com', icon: 'mail'},
];
