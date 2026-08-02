import { CursorIcon, ProbeIcon } from "@/icons";
import { Button, Tooltip } from "antd";
import styles from "./styles.module.css";
import { useSimulation, useWorkbenchTools } from "@/store";
import { useEffect } from "react";

export function WorkbenchTools() {
	const workbenchTools = useWorkbenchTools((state) => state.workbenchTools);
	const setWorkbenchTools = useWorkbenchTools((state) => state.setWorkbenchTools);
	const isSimulationRunning = useSimulation((state) => state.isSimulationRunning);

	useEffect(() => {
		if (isSimulationRunning) {
			document.body.classList.remove("cursor");
			document.body.classList.add("probe");
			setWorkbenchTools("voltmeter");
		} else {
			document.body.classList.remove("probe");
			document.body.classList.add("cursor");
			setWorkbenchTools("cursor");
		}
	}, [isSimulationRunning]);

	return (
		<div
			className={`${styles.workbenchTools} ${
				isSimulationRunning ? styles.workbenchTool_active : styles.workbenchTool_inactive
			}`}
		>
			<Tooltip title={!isSimulationRunning ? "Cursor" : "Simulation is running"}>
				<Button
					type={workbenchTools === "cursor" ? "primary" : "text"}
					icon={<CursorIcon />}
					disabled={isSimulationRunning}
					onClick={() => setWorkbenchTools("cursor")}
				/>
			</Tooltip>
			<Tooltip title={isSimulationRunning ? "Voltmeter" : "Simulation not running"}>
				<Button
					type={workbenchTools === "voltmeter" ? "primary" : "text"}
					icon={<ProbeIcon />}
					disabled={!isSimulationRunning}
					onClick={() => setWorkbenchTools("voltmeter")}
				/>
			</Tooltip>
		</div>
	);
}
