import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Pick = {
	eventId: string;
	eventName: string;
	prediction: string;
	status: "pending" | "won" | "lost";
	createdAt: string;
};

const fetchPicks = async (): Promise<Pick[]> => {
	const url = import.meta.env.VITE_API_URL;
	const res = await fetch(`${url}/picks`);

	if (!res.ok) throw new Error("Failed to fetch picks");
	return res.json();
};

export const GetAllPicks = () => {
	const [picks, setPicks] = useState<Pick[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPicks()
			.then(setPicks)
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Typography>Loading...</Typography>;
	return (
		<Stack height="100vh">
			<ul>
				{picks.map((pick) => (
					<li key={pick.eventId}>{pick.eventName}</li>
				))}
			</ul>
		</Stack>
	);
};
