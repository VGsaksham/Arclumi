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
          {(() => {
            const elements = [];
            let imgIndex = 0;
            let slotIndex = 0;

            while (true) {
              const pattern = slotIndex % 6;
              const isFeaturedSlot = (pattern === 0 || pattern === 5);
              const isTextSlot = isFeaturedSlot && !isHighQuality;

              if (imgIndex >= images.length) {
                // Out of images. 
                // Only continue if we need to close the layout with a text block (pattern 5)
                if (isTextSlot && pattern === 5) {
                  // Let it render the closing text block
                } else {
                  break;
                }
              }

              let slotClass = 'small-slot';
              if (pattern === 0) slotClass = 'big-slot';
              if (pattern === 3) slotClass = 'wide-slot';
              if (pattern === 4) slotClass = 'tall-slot';
              if (pattern === 5) slotClass = 'big-slot';

              if (isTextSlot) {
                // Insert text block for standard quality in big slots
                elements.push(
                  <div key={`text-${slotIndex}`} className={`gallery-item ${slotClass} text-slot`}>
                    <p className="centered-text">
                      In this space, architectural forms<br/>
                      interact seamlessly with natural light,<br/>
                      defining a new spatial narrative.
                    </p>
                  </div>
                );
              } else {
                // Insert image
                const img = images[imgIndex];
                elements.push(
                  <div key={`img-${img._key || imgIndex}`} className={`gallery-item ${slotClass}`}>
                    <img 
                      src={urlFor(img).width(1200).url()} 
                      alt={`${project.title} view ${imgIndex + 1}`} 
                      className="gallery-image" 
                    />
                  </div>
                );
                imgIndex++; // Only advance image index when an image is placed
              }
              slotIndex++;
            }

            return elements;
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
