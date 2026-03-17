import type { ResumeData } from "../types/resume.types";

export const resumeData: ResumeData = {
  personal: {
    fullName: "John Doe",
    title: "Software Developer",
    email: "john@example.com",
    phone: "1234567890",
    location: "New York",
    summary:
      "Experienced developer skilled in React, TypeScript and backend systems.",
    photo: undefined,

    website: "www.johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "www.portfolio.com",
  },

  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "XYZ University",
      location: "New York",
      startDate: "2018",
      endDate: "2022",
      gpa: "8.5/10",
      description: "Focused on Software Engineering and AI.",
    },
  ],

  experience: [
    {
      role: "Frontend Developer",
      company: "ABC Company",
      location: "New York",
      startDate: "2022",
      endDate: "Present",
      duration: "2022 - Present",
      description:
        "Built scalable UI components and improved application performance.",
      achievements: [
        "Improved performance by 30%",
        "Led frontend architecture redesign",
      ],
      technologies: ["React", "TypeScript", "Tailwind"],
    },
  ],

  projects: [
    {
      name: "Portfolio Website",
      link: "https://portfolio.com",
      description: "Personal portfolio website built using React.",
      technologies: ["React", "Tailwind", "Vite"],
    },
  ],

  skills: [
    { name: "React", level: 90, years: "4+ yrs" },
    { name: "TypeScript", level: 85, years: "4+ yrs" },
    { name: "Node.js", level: 75, years: "3+ yrs" },
  ],

  certifications: [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon",
      date: "2023",
      link: "",
    },
  ],

  publications: [
    {
      title: "Efficient Web Architectures",
      publisher: "Tech Journal",
      year: "2024",
      link: "",
    },
  ],

  languages: [
    { name: "English", proficiency: "Fluent" },
    { name: "Hindi", proficiency: "Native" },
  ],

  interests: ["Reading", "Traveling", "Fitness"],
};