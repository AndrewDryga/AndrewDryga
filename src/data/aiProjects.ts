import { allProjects } from "./projects";

// Landing-page presentation; canonical project details live in projects.ts.
const showcases = [
  {
    id: "ryker",
    discipline: "Applied AI",
    headline: "Your proactive AI teammate.",
    summary:
      "Talk to Ryker in Slack or GitHub. It builds features, fixes bugs, reviews pull requests, and investigates alerts. It keeps track of the conversation and follows up on unfinished work.",
    logo: "/images/projects/ryker.svg",
  },
  {
    id: "emisar",
    discipline: "AI security",
    headline: "Secure remote access for AI agents.",
    summary:
      "A zero-trust gateway connecting AI agents to your infrastructure. Give agents the tools to investigate incidents, manage deployments, and handle daily operations. Your team controls what runs, what needs approval, and what stays off-limits in one place.",
    logo: "/images/projects/emisar.png",
  },
  {
    id: "coop",
    discipline: "AI security",
    headline: "A sandbox and orchestrator for AI agents.",
    summary:
      "co:op runs agents in an isolated sandbox, with secret files hidden and network access restricted to approved destinations. It adds task queues and unattended runs, with agents able to share work across models.",
    logo: "/images/projects/coop.svg",
  },
];

export const aiProjects = showcases.map((showcase) => {
  const project = allProjects.find((project) => project.id === showcase.id);
  if (!project) throw new Error(`Missing AI project: ${showcase.id}`);
  return { ...showcase, project };
});
