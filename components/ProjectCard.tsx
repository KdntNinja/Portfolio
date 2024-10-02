import React from "react";

const ProjectCard = ({ project }: { project: any }) => (
	<div className="card">
		<h2>{project.name}</h2>
		<p>{project.description}</p>
		<a href={project.githubUrl} rel="noopener noreferrer" target="_blank">
			GitHub
		</a>
	</div>
);

export default ProjectCard;
