import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { ConfigProvider } from "antd";
import theme from "./theme/themeConfig";
import { HistoryProvider } from "./contexts/HistoryContext";
import { BrowserRouter } from "react-router";
import { Router } from "./pages/router";

function App() {
	return (
		<BrowserRouter>
			<ConfigProvider theme={theme}>
				<ReactFlowProvider>
					<HistoryProvider>
						<Router />
					</HistoryProvider>
				</ReactFlowProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
