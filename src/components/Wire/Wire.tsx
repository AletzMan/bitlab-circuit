import { BaseEdge, EdgeProps, MarkerType, getSmoothStepPath, useReactFlow } from "@xyflow/react";
import styles from "./styles.module.css";
import { ComponentEdge } from "@/types";
import { CSSProperties } from "react";
import { useSimulation, useTheme } from "@/store";
import { markEdgeFlowDirection } from "@/helpers";

export function Wire({
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	data,
}: EdgeProps<ComponentEdge>) {
	const { currentTheme } = useTheme();
	const [d] = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		borderRadius: 2,
		offset: 18,
	});
	const { isSimulationRunning } = useSimulation();

	const flowDirection = data?.flowDirection;

	const simulationClassName = isSimulationRunning
		? flowDirection === "backward"
			? styles.wire_simulation
			: flowDirection === "forward"
			? styles.wire_simulation_reverse
			: ""
		: "";

	return (
		<>
			<BaseEdge
				interactionWidth={5}
				markerEnd={MarkerType.Arrow}
				path={d}
				className={`${styles.wire} ${simulationClassName}`}
				style={
					{
						"--wire-color":
							(data?.color === "#000000" || data?.color === "rgb(0,0,0)") && currentTheme === "dark"
								? "#FFFFFF"
								: (data?.color.toLowerCase() === "#ffffff" || data?.color === "rgb(255,255,255)") &&
								  currentTheme === "light"
								? "#000000"
								: data?.color,
					} as CSSProperties
				}
				type="smoothstep"
			/>
			<BaseEdge
				interactionWidth={5}
				markerEnd={MarkerType.Arrow}
				path={d}
				className={`${styles.wire} ${simulationClassName}`}
				style={
					{
						"--wire-color":
							(data?.color === "#000000" || data?.color === "rgb(0,0,0)") && currentTheme === "dark"
								? "#FFFFFF"
								: (data?.color.toLowerCase() === "#ffffff" || data?.color === "rgb(255,255,255)") &&
								  currentTheme === "light"
								? "#000000"
								: data?.color,
					} as CSSProperties
				}
				type="smoothstep"
			/>
		</>
	);
}
