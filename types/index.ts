export interface Project {
    _id: string;
    title: string;
    slug: string;
    type: "web" | "mobile";
    shortDescription: string;
    description: string;
    features: string[];
    techStack: string[];
    images: string[];
    videoUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    downloadUrl?: string;
    status: "draft" | "published";
    visibility: "public" | "private";
}
