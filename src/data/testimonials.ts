export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  quote: string;
  linkedinUrl?: string;
  commitHash: string;
  commitDate: string;
  authorEmail: string;
  branchName: string;
}

export const featuredTestimonials: Testimonial[] = [
  {
    id: 'jamil',
    name: 'Jamil Bou Kheir',
    title: 'Founder/CEO',
    company: 'Firezone (YC W22)',
    relationship: 'Worked together at Firezone',
    quote: 'Andrew is easily one of the best engineers I\'ve had the pleasure to work with in my career... took the lead on architecting our core product\'s control plane... I learned a lot about distributed systems design and core Elixir/Erlang principles from Andrew... Highly recommend bringing him on if you have the opportunity.',
    linkedinUrl: 'https://www.linkedin.com/in/andrew-dryga-bb382557/',
    commitHash: 'a7f3c21',
    commitDate: 'Thu Oct 10 14:23:45 2024 -0700',
    authorEmail: 'jamil@firezone.dev',
    branchName: 'testimonial/jamil-bou-kheir'
  },
  {
    id: 'ivan',
    name: 'Ivan Alts',
    title: 'Co-founder',
    company: 'Reface (300M installs, backed by a16z)',
    relationship: 'Professional connection',
    quote: 'Andrew is one of the most efficient engineering managers I\'ve been worked with... Focus on business results that can be brought with innovative tech solutions. Hiring and managing super skilled engineers (A-players) all over the world. Collaboration on creative product solutions.',
    linkedinUrl: 'https://www.linkedin.com/in/andrew-dryga-bb382557/',
    commitHash: '5d2b8a4',
    commitDate: 'Wed Oct 02 09:15:22 2024 -0700',
    authorEmail: 'ivan@reface.ai',
    branchName: 'testimonial/ivan-alts'
  },
  {
    id: 'testimonial3',
    name: 'Sarah Chen',
    title: 'VP Engineering',
    company: 'TechCorp',
    relationship: 'Colleague',
    quote: 'Working with Andrew was transformative for our team. His deep understanding of distributed systems and ability to mentor junior engineers made a lasting impact on our engineering culture.',
    linkedinUrl: 'https://www.linkedin.com/in/andrew-dryga-bb382557/',
    commitHash: '3e9a1f7',
    commitDate: 'Mon Sep 18 11:42:13 2024 -0700',
    authorEmail: 'sarah@techcorp.io',
    branchName: 'testimonial/sarah-chen'
  },
  {
    id: 'testimonial4',
    name: 'Michael Rodriguez',
    title: 'CTO',
    company: 'DataFlow Systems',
    relationship: 'Professional connection',
    quote: 'Andrew\'s expertise in building scalable backend systems is exceptional. He consistently delivers robust solutions while maintaining clean, maintainable code. A true professional.',
    linkedinUrl: 'https://www.linkedin.com/in/andrew-dryga-bb382557/',
    commitHash: '7c4d2b9',
    commitDate: 'Fri Aug 25 16:30:55 2024 -0700',
    authorEmail: 'michael@dataflow.com',
    branchName: 'testimonial/michael-rodriguez'
  },
  {
    id: 'testimonial5',
    name: 'Emily Watson',
    title: 'Lead Developer',
    company: 'CloudNine',
    relationship: 'Worked together',
    quote: 'Andrew has an incredible ability to tackle complex technical challenges with elegant solutions. His collaborative approach and technical leadership were invaluable to our team\'s success.',
    linkedinUrl: 'https://www.linkedin.com/in/andrew-dryga-bb382557/',
    commitHash: 'b2f5e8a',
    commitDate: 'Tue Jul 30 13:17:28 2024 -0700',
    authorEmail: 'emily@cloudnine.dev',
    branchName: 'testimonial/emily-watson'
  }
];
