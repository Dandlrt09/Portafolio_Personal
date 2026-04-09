import { motion } from 'framer-motion';
import { BrainCircuit, BarChart2, Clock } from 'lucide-react';
import { projects, biProjects } from '../data/projects';
import ProjectCard from './ProjectCard';
import BiProjectCard from './BiProjectCard';
import { useLanguage } from '../context/LanguageContext';

const SectionHeader = ({ icon: Icon, title, color = "primary" }) => (
    <div className="flex items-center gap-3 mb-8">
        <div className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20`}>
            <Icon size={20} className={`text-${color}`} />
        </div>
        <h3 className={`text-2xl font-bold text-${color}`}>{title}</h3>
        <div className={`flex-1 h-px bg-gradient-to-r from-${color}/30 to-transparent`} />
    </div>
);

const ProjectGrid = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-20 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main heading */}
                <div className="mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {t.projects.title}
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                {/* ── Sub-section 1: Data Science ── */}
                <div className="mb-20">
                    <SectionHeader icon={BrainCircuit} title={t.projects.dsTitle} color="primary" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* ── Sub-section 2: Data Analysis ── */}
                <div>
                    <SectionHeader icon={BarChart2} title={t.projects.biTitle} color="accent" />

                    {biProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {biProjects.map((project, index) => (
                                <BiProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center justify-center gap-4 py-16 rounded-2xl border border-dashed border-accent/20 bg-accent/5"
                        >
                            <div className="p-4 rounded-full bg-accent/10">
                                <Clock size={28} className="text-accent opacity-70" />
                            </div>
                            <p className="text-xl font-semibold text-accent/80">{t.projects.comingSoon}</p>
                            <p className="text-sm text-text-muted text-center max-w-md px-4">
                                {t.projects.comingSoonDesc}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectGrid;

