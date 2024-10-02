const routes = {
	home: "/",
	about: "/about",
	login: "/login",
	signup: "/signup",
	verify: "/verify",
	dashboard: "/dashboard",
	profile: "/profile",
	settings: "/settings",
	admin: "/admin",
};

export const siteConfig = {
	name: "Versionary",
	prodDomain: "https://kdnsite.xyz",
	title_p1: "/",
	title_p2: "config",
	title_p3: "/site.ts",
	description: "Beautiful, fast, and modern. Everything you need.",
	routes,
	navItems: [
		{
			label: "Home",
			href: routes.home,
		},
		{
			label: "About",
			href: routes.about,
		},
	],
	features: [
		{
			label: "Better",
			description: "Just Better",
		},
		{
			label: "Better than Max",
			description: "Just Better",
		},
		{
			label: "Betterer",
			description: "Just Betterer",
		},
	],
};
