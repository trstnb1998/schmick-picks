import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import App from "./App.tsx";

const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: grey[900],
		},
		primary: {
			main: orange[500],
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>,
);
