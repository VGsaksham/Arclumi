import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "project" && slug.current == $slug][0]`,
          { slug }
        );
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="project-detail-loading">Loading project...</div>;
  }

  if (!project) {
    return <Navigate to="/" />;
  }

  const isHighQuality = project.imageQuality === 'high';
  const images = (project.images || []).filter(img => img && img.asset);

  return (
    <div className={`project-detail-page ${isHighQuality ? 'layout-high' : 'layout-standard'}`}>
      <div className="project-detail-header">
        <h4 className="project-detail-category">{project.category}</h4>
        <h1 className="project-detail-title">{project.title}</h1>
      </div>

      <div className="project-detail-content">
        <div className="project-detail-gallery">
          {!isHighQuality && (
            <div className="gallery-item text-slot">
              <p className="centered-text">
                In this space, architectural forms<br/>
                interact seamlessly with natural light,<br/>
                defining a new spatial narrative.
              </p>
            </div>
          )}
          
          {images.map((img, index) => (
            <div key={`img-${img._key || index}`} className="gallery-item">
              <img 
                src={urlFor(img).width(1200).auto('format').quality(80).url()} 
                alt={`${project.title} view ${index + 1}`} 
                className="gallery-image" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
