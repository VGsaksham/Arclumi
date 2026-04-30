import { useParams, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return <Navigate to="/" />;
  }

  const isHighQuality = project.imageQuality === 'high';

  return (
    <div className={`project-detail-page ${isHighQuality ? 'layout-high' : 'layout-standard'}`}>
      <div className="project-detail-header">
        <h4 className="project-detail-category">{project.category}</h4>
        <h1 className="project-detail-title">{project.title}</h1>
      </div>

      <div className="project-detail-content">
        <div className="project-detail-gallery">
          {project.images.map((img, idx) => {
            const getSlotClass = (index) => {
              const pattern = index % 6;
              if (pattern === 0) return 'big-slot';
              if (pattern === 1) return 'small-slot';
              if (pattern === 2) return 'small-slot';
              if (pattern === 3) return 'wide-slot';
              if (pattern === 4) return 'tall-slot';
              if (pattern === 5) return 'big-slot';
              return 'small-slot';
            };
            
            const slotClass = getSlotClass(idx);
            const isFeaturedSlot = slotClass === 'big-slot';
            
            if (isFeaturedSlot && !isHighQuality) {
              return (
                <div key={idx} className={`gallery-item ${slotClass} text-slot`}>
                  <p className="centered-text">
                    In this space, architectural forms<br/>
                    interact seamlessly with natural light,<br/>
                    defining a new spatial narrative.
                  </p>
                </div>
              );
            }

            return (
              <div key={idx} className={`gallery-item ${slotClass}`}>
                <img src={img} alt={`${project.title} view ${idx + 1}`} className="gallery-image" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
