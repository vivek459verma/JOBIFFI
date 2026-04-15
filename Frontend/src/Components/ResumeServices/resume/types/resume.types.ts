export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    photo?: string;

    website?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };

  education: {
    degree: string;
    institution: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    year?: string;
    gpa?: string;
    description?: string;
  }[];

  experience: {
    role: string;
    company: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    duration?: string;
    description: string;
    achievements?: string[];
    technologies?: string[];
  }[];

  projects: {
    name: string;
    link?: string;
    description: string;
    technologies?: string[];
  }[];

  skills: {
    name: string;
    level?: number; // 0-100
    years?: string;
  }[];

  certifications: {
    title: string;
    issuer: string;
    date?: string;
    link?: string;
  }[];

  publications: {
    title: string;
    publisher?: string;
    year?: string;
    link?: string;
  }[];

  languages: {
    name: string;
    proficiency: string;
  }[];

  interests: string[];
}