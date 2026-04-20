import { Stack } from "@mui/material";
import { SectionTitle } from "../components/section-title/SectionTitle";
import { GetAllPicks } from "../features/picks/components/GetAllPicks";

export const Picks = () => {
	return (
		<Stack height="100vh">
			<SectionTitle title="Schmick Picks Home Page" />
			<GetAllPicks />
		</Stack>
	);
};
