import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { BoardFlow } from "@/components/BoardFlow/BoardFlow";
import { ConfigProvider } from "antd";
import theme from "./theme/themeConfig";
import { HistoryProvider } from "./contexts/HistoryContext";

function App() {
	return (
		<ConfigProvider theme={theme}>
			<ReactFlowProvider>
				<HistoryProvider>
					<BoardFlow />
				</HistoryProvider>
			</ReactFlowProvider>
		</ConfigProvider>
	);
}

export default App;
