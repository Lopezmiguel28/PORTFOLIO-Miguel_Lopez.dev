import React, { useState, useMemo } from "react";
import styles from "./Projects.module.css";
import { projectsData, categories } from "./data";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projectsData;
    }
    return projectsData.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Mis Proyectos</h2>
        <p className={styles.subtitle}>
          Explora algunos de mis trabajos destacados
        </p>

        {/* Filtros de categoría */}
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Imagen del proyecto */}
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div
                  className={`${styles.overlay} ${
                    hoveredProject === project.id ? styles.active : ""
                  }`}
                >
                  <a href={project.link} className={styles.viewBtn}>
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Contenido del proyecto */}
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                {/* Tecnologías */}
                <div className={styles.technologies}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Categoría */}
                <span className={styles.category}>
                  {categories.find((cat) => cat.id === project.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay proyectos */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>No hay proyectos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
