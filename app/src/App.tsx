import { Container } from "@mui/material";
import "./App.css";
import { Picks } from "./features/picks/components/Picks";

function App() {
	return (
		<Container
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "80%",
			}}
		>
			<Picks />
		</Container>
	);
}
export default App;
