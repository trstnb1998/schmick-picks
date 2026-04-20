import { Container } from "@mui/material";
import "./App.css";
import { Picks } from "./pages/Picks";

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
