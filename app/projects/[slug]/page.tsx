import { API_URL } from "@/lib/config";
import { Project } from "@/types";
import { Metadata } from "next";
import ProjectDetailContent from "@/components/ProjectDetailContent";

// Fetch data
async function getProject(slug: string): Promise<Project | null> {
    try {
        const res = await fetch(`${API_URL}/projects/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Case Study`,
        description: project.shortDescription,
    };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-400">Project Not Found</h1>
            </div>
        );
    }

    return <ProjectDetailContent project={project} />;
}
