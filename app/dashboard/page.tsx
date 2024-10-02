"use client";

import React, { useEffect, useState } from "react";

import { databases } from "@/config/appwrite";

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
					process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string
				);

				const projects = response.documents.map((doc: any) => ({
					$id: doc.$id,
					name: doc.name,
					description: doc.description,
					githubUrl: doc.githubUrl
				}));

				setProjects(projects);
			} catch (error) {
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-center text-[25px] font-bold mb-6">Projects</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4">
				{projects.map((project) => (
					<div key={project.$id} className="project-card border p-4 rounded">
						<h3 className="text-xl font-bold">{project.name}</h3>
						<p>{project.description}</p>
						<a className="text-blue-500" href={project.githubUrl}>
							GitHub
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
