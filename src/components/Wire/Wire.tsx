import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";


export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }: EdgeProps) {
    const [d] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });

    return (
        <BaseEdge path={d} style={{ stroke: "#00aaff", strokeWidth: 2 }} markerEnd={markerEnd} type="smoothstep" />
    );
};