import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import './Projects.css';

const categories = ['all', 'residential', 'hospitality', 'commercial', 'light installations'];

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = (project.images || []).filter(img => img && img.asset);

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex < images.length - 1) {
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
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={urlFor(img).width(800).url()}
              alt={project.title}
              className={`project-img ${index === currentImageIndex ? 'active' : ''}`}
            />
          ))
        ) : (
          <div className="project-img active placeholder-img"></div>
        )}
      </div>
      {images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <div className="project-nav-arrow left" onClick={handlePrevImage}></div>
          )}
          {currentImageIndex < images.length - 1 && (
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
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        activeCategory === 'all' || project.category === activeCategory
      )
    );
  }, [activeCategory, projects]);

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

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
            key={project._id}
            className="project-card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/project/${project.slug.current}`)}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
