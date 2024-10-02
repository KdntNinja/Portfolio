"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models } from "appwrite";

import { account } from "@/config/appwrite";
import AdminPanel from "@/components/AdminPanel";

const AdminPage = () => {
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
		null,
	);
	const router = useRouter();

	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await account.get();

				setUser(user);
			} catch (error) {
				router.push("/login");
			}
		};

		getUser();
	}, [router]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return <AdminPanel />;
};

export default AdminPage;
