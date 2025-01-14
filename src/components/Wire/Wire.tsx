import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styles from "./styles.module.css";

export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
    const [d] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });
    function convertToStraightLines(path: string) {
        // Reemplaza todas las curvas Q por líneas rectas L
        return path.replace(/Q/g, 'L');
    }

    const modifiedPath = convertToStraightLines(d);
    return (
        <BaseEdge path={modifiedPath} className={styles.wire} type="smoothstep" />
    );
};