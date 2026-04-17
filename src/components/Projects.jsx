import './Projects.css';

const projectsData = [
  { id: 1, img: '/proj_commercial.png', title: 'dlf cyberpark, gurugram', category: 'commercial' },
  { id: 2, img: '/proj_hospitality.png', title: 'aman hotel, new delhi', category: 'hospitality' },
  { id: 3, img: '/proj_res_1.png', title: 'private residence', category: 'residential' },
  { id: 4, img: '/proj_res_2.png', title: 'dubai hills, dubai', category: 'residential' },
  { id: 5, img: '/proj_res_3.png', title: 'private farmhouse', category: 'residential' },
  { id: 6, img: '/proj_monumental.png', title: 'gujarat bhawan, new delhi', category: 'monumental' },
  { id: 7, img: '/proj_monumental_2.png', title: 'the louvre, abu dhabi', category: 'monumental' },
  { id: 8, img: '/proj_hospitality_2.png', title: 'marriott resort, goa', category: 'hospitality' },
  { id: 9, img: '/proj_commercial_2.png', title: 'boutique retail, mumbai', category: 'commercial' },
  { id: 10, img: '/proj_res_4.png', title: 'high-end penthouse, london', category: 'residential' }
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
