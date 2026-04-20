import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SectionTitle } from "../../../components/section-title/SectionTitle";

type Pick = {
	eventId: string;
	eventName: string;
	prediction: string;
	status: "pending" | "won" | "lost";
	createdAt: string;
};

const getAllPicks = async (): Promise<Pick[]> => {
	const url = import.meta.env.VITE_API_URL;
	const res = await fetch(`${url}/picks`, {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch picks");
	return res.json();
};

export const Picks = () => {
	const [picks, setPicks] = useState<Pick[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllPicks()
			.then(setPicks)
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Typography>Loading...</Typography>;
	return (
		<Stack height="100vh">
			<SectionTitle title="Schmick Picks Home Page" />
			<ul>
				{picks.map((pick) => (
					<li key={pick.eventId}>{pick.eventName}</li>
				))}
			</ul>
		</Stack>
	);
};
