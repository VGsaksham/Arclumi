import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './Projects.css';

const categories = ['all', 'residential', 'hospitality', 'commercial', 'light installations'];

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="project-card">
      <div className="project-image-container">
        {project.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={project.title}
            className={`project-img ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      {project.images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <div className="project-nav-arrow left" onClick={handlePrevImage}></div>
          )}
          {currentImageIndex < project.images.length - 1 && (
            <div className="project-nav-arrow right" onClick={handleNextImage}></div>
          )}
        </>
      )}
      <div className="project-hover">
        <div className="project-hover-content">
          {project.title}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProjects(
      projectsData.filter(project =>
        activeCategory === 'all' || project.category === activeCategory
      )
    );
  }, [activeCategory]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h4 className="projects-subtitle">PROJECTS</h4>
        <h2 className="projects-title">experiments with light</h2>

        <ul className="project-filters">
          {categories.map((cat) => (
            <li
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={`${activeCategory}-${project.id}`}
            className="project-card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
