import { AppwriteException } from "appwrite";

import { databases } from "@/config/appwrite";

export const fetchProjects = async (
	setProjects: Function,
	setLoading: Function,
	setError: Function,
	router: any,
) => {
	setLoading(true);
	setError(null);
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
	} catch (error) {
		const appwriteError = error as AppwriteException;

		if (appwriteError.code === 401) {
			router.push("/login");
		} else {
			setError("Failed to fetch projects.");
		}
	} finally {
		setLoading(false);
	}
};
