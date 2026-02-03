import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../context/LanguageContext';

const ProjectGrid = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-20 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {t.projects.title}
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGrid;
