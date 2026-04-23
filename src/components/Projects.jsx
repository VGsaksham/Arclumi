import { useState, useEffect } from 'react';
import './Projects.css';

const projectsData = [
  { id: 1, images: ['/proj_commercial.png', '/project_1_1776455844850.png'], title: 'dlf cyberpark, gurugram', category: 'commercial' },
  { id: 2, images: ['/proj_hospitality.png', '/project_2_1776455860367.png'], title: 'aman hotel, new delhi', category: 'hospitality' },
  { id: 3, images: ['/proj_res_1.png', '/hero_bg_1776455815166.png'], title: 'private residence', category: 'residential' },
  { id: 4, images: ['/proj_res_2.png', '/proj_res_1.png'], title: 'dubai hills, dubai', category: 'residential' },
  { id: 5, images: ['/proj_res_3.png', '/proj_res_2.png'], title: 'private farmhouse', category: 'residential' },
  { id: 6, images: ['/proj_monumental.png', '/proj_hospitality.png'], title: 'gujarat bhawan, new delhi', category: 'light installations' },
  { id: 7, images: ['/proj_monumental_2.png', '/proj_monumental.png'], title: 'the louvre, abu dhabi', category: 'light installations' },
  { id: 8, images: ['/proj_hospitality_2.png', '/proj_commercial.png'], title: 'marriott resort, goa', category: 'hospitality' },
  { id: 9, images: ['/proj_commercial_2.png', '/proj_commercial.png'], title: 'boutique retail, mumbai', category: 'commercial' },
  { id: 10, images: ['/proj_res_4.png', '/proj_res_3.png'], title: 'high-end penthouse, london', category: 'residential' }
];

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
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
