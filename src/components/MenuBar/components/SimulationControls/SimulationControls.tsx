import { getClosedCircuitPaths, isSimulationReady } from "@/helpers";
import { useSimulation } from "@/store";
import { AnalogNode, ComponentEdge } from "@/types";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import { useReactFlow } from "@xyflow/react";
import { Button, notification, Tooltip } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export function SimulationControls() {
	const { setIsSimulationRunning, isSimulationRunning } = useSimulation();
	const { getNodes, getEdges, updateEdge } = useReactFlow();
	const [api, contextHolder] = notification.useNotification();

	const openNotification = (placement: NotificationPlacement, message: string) => {
		api.error({
			message: "Error al iniciar la simulación",
			description: message,
			placement,
			showProgress: true,
		});
	};

	function handleSimulationClick() {
		const currentState = isSimulationRunning;
		if (currentState) {
			setIsSimulationRunning(false);
			return;
		}
		const nodes = getNodes() as AnalogNode[];
		const edges = getEdges() as ComponentEdge[];
		const { isReady, message, updatedEdges } = isSimulationReady(nodes, edges);
		console.log(updatedEdges);
		updatedEdges.forEach((edge) => {
			updateEdge(edge.id, edge);
		});
		if (isReady) {
			const paths = getClosedCircuitPaths(nodes, edges);
			console.log(paths);
			setIsSimulationRunning(true); // aquí ya animas las líneas
		} else {
			openNotification("topRight", message);
		}
	}

	return (
		<>
			{contextHolder}
			<Tooltip title={isSimulationRunning ? "Pause Simulation" : "Run Simulation"}>
				<Button
					type="text"
					icon={
						isSimulationRunning ? (
							<PauseOutlined style={{ fontSize: "1.3em", color: "var(--success-color)" }} />
						) : (
							<CaretRightFilled style={{ fontSize: "1.5em", color: "var(--success-color)" }} />
						)
					}
					onClick={handleSimulationClick}
				/>
			</Tooltip>
		</>
	);
}
