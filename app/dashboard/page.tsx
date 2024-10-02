"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppwriteException } from "appwrite";

import { siteConfig } from "@/config/site";
import { fetchProjects } from "@/components/fetchProjects";
import { databases, account, ID, Permission, Role } from "@/config/appwrite";

type Project = {
	$id: string;
	name: string;
	description: string;
	githubUrl: string;
};

const Dashboard = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [newProject, setNewProject] = useState({
		name: "",
		description: "",
		githubUrl: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			try {
				const user = await account.get();

				if (!user.emailVerification) {
					router.push(siteConfig.routes.verify);
				} else {
					await fetchProjects(setProjects, setLoading, setError, router);
				}
			} catch (error) {
				router.push("/login");
			}
		};

		checkUser();
	}, [router]);

	const addProject = async () => {
		setLoading(true);
		setError(null);
		try {
			const user = await account.get();

			await databases.createDocument(
				process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
				process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
				ID.unique(),
				newProject,
				[
					Permission.read(Role.user(user.$id)),
					Permission.update(Role.label("admin")),
					Permission.delete(Role.label("admin")),
				],
			);
			setNewProject({ name: "", description: "", githubUrl: "" });
			await fetchProjects(setProjects, setLoading, setError, router);
		} catch (error) {
			const appwriteError = error as AppwriteException;

			if (appwriteError.code === 400) {
				setError("Bad Request: " + appwriteError.message);
			} else {
				setError("Failed to add project: " + appwriteError.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="dashboard p-8">
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>
			<div className="new-project-form mb-8">
				<h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
				<input
					className="border p-2 mb-2 w-full"
					placeholder="Name"
					type="text"
					value={newProject.name}
					onChange={(e) =>
						setNewProject({ ...newProject, name: e.target.value })
					}
				/>
				<input
					className="border p-2 mb-2 w-full"
					placeholder="Description"
					type="text"
					value={newProject.description}
					onChange={(e) =>
						setNewProject({ ...newProject, description: e.target.value })
					}
				/>
				<input
					className="border p-2 mb-2 w-full"
					placeholder="GitHub URL"
					type="text"
					value={newProject.githubUrl}
					onChange={(e) =>
						setNewProject({ ...newProject, githubUrl: e.target.value })
					}
				/>
				<button
					className="bg-blue-500 text-white p-2 rounded mt-2"
					disabled={loading}
					onClick={addProject}
				>
					{loading ? "Adding..." : "Add Project"}
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</div>
			<div className="projects-list">
				<h2 className="text-2xl font-semibold mb-4">Projects</h2>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{projects.map((project) => (
							<div
								key={project.$id}
								className="project-card border p-4 rounded"
							>
								<h3 className="text-xl font-bold">{project.name}</h3>
								<p>{project.description}</p>
								<a className="text-blue-500" href={project.githubUrl}>
									GitHub
								</a>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
