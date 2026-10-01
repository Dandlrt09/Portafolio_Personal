import { BrainCircuit, BarChart2 } from 'lucide-react';
import { featuredProjects, analyticsProjects } from '../data/projects';
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectCard from './ProjectCard';
import BiProjectCard from './BiProjectCard';
import ArchiveSection from './ArchiveSection';
import { useLanguage } from '../context/LanguageContext';

const tones = {
    primary: {
        box: 'bg-primary/10 border-primary/20',
        icon: 'text-primary',
        rule: 'from-primary/30',
    },
    accent: {
        box: 'bg-accent/10 border-accent/20',
        icon: 'text-accent',
        rule: 'from-accent/30',
    },
};

const SectionHeader = ({ icon: Icon, title, color = 'primary' }) => {
    const tone = tones[color] || tones.primary;

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${tone.box}`}>
                    <Icon size={20} className={tone.icon} />
                </div>
                <h3 className={`text-2xl font-bold ${tone.icon}`}>{title}</h3>
                <div className={`flex-1 h-px bg-gradient-to-r to-transparent ${tone.rule}`} />
            </div>
        </div>
    );
};

const ProjectGrid = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-20 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main heading */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {t.projects.title}
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                {/* ── Sub-section 1: Featured — data & AI applications ── */}
                <div className="mb-24">
                    <SectionHeader icon={BrainCircuit} title={t.projects.featuredTitle} color="primary" />
                    <p className="mb-8 max-w-2xl text-text-muted">{t.projects.featuredIntro}</p>

                    <div className="flex flex-col gap-8">
                        {featuredProjects.map((project, index) => (
                            <FeaturedProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* ── Sub-section 2: Analytics & BI ── */}
                <div>
                    <SectionHeader icon={BarChart2} title={t.projects.analyticsTitle} color="accent" />
                    <p className="mb-8 max-w-2xl text-text-muted">{t.projects.analyticsIntro}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {analyticsProjects.map((project, index) =>
                            project.kind === 'bi' ? (
                                <BiProjectCard key={project.id} project={project} index={index} />
                            ) : (
                                <ProjectCard key={project.id} project={project} index={index} />
                            )
                        )}
                    </div>

                    <ArchiveSection />
                </div>
            </div>
        </section>
    );
};

export default ProjectGrid;
