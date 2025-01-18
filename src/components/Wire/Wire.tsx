import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styles from "./styles.module.css";
import { ComponentEdge } from "@/types";
import { CSSProperties } from "react";
import { useTheme } from "@/store";

export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<ComponentEdge>) {
    const { currentTheme } = useTheme();
    const [d] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 2, offset: 18
    });



    return (
        <BaseEdge path={d} className={styles.wire} style={{ "--wire-color": ((data?.color === "#000000" || data?.color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((data?.color.toLowerCase() === "#ffffff" || data?.color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : data?.color } as CSSProperties} type="smoothstep" />
    );
};