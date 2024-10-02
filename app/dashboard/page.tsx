"use client";

import React, { useEffect, useState } from "react";

import { databases } from "@/config/appwrite";
import ProjectCard from "@/components/ProjectCard";

type Project = {
	$id: string;
	name: string;
	description: string;
	githubUrl: string;
};

const HomePage = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await databases.listDocuments(
					process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
					process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
				);

				const projects = response.documents.map((doc: any) => ({
					$id: doc.$id,
					name: doc.name,
					description: doc.description,
					githubUrl: doc.githubUrl,
				}));

				setProjects(projects);
			} catch (error) {}
		};

		fetchProjects();
	}, []);

	return (
		<div>
			<h1>Projects</h1>
			<div>
				{projects.map((project) => (
					<ProjectCard key={project.$id} project={project} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
