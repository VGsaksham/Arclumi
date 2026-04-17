import './Projects.css';

const projectsData = [
  { id: 1, img: '/project_1_1776455844850.png', title: 'dlf cyberpark, gurugram', category: 'commercial' },
  { id: 2, img: '/project_2_1776455860367.png', title: 'aman hotel, new delhi', category: 'hospitality' },
  { id: 3, img: '/media__1776455558998.png', title: 'private residence', category: 'residential' },
  { id: 4, img: '/media__1776455566687.png', title: 'dubai hills, dubai', category: 'residential' },
  { id: 5, img: '/media__1776455584132.png', title: 'private farmhouse', category: 'residential' },
  { id: 6, img: '/hero_bg_1776455815166.png', title: 'gujarat bhawan, new delhi', category: 'monumental' }
];

const categories = ['all', 'residential', 'hospitality', 'commercial', 'corporate', 'façade', 'f&b', 'monumental', 'light installations'];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h4 className="projects-subtitle">PROJECTS</h4>
        <h2 className="projects-title">experiments with light</h2>
        
        <ul className="project-filters">
          {categories.map((cat, index) => (
            <li key={cat} className={index === 0 ? 'active' : ''}>
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.img} alt={project.title} />
            <div className="project-hover">
              <div className="project-hover-content">
                {project.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
