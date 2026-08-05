import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  MarkerType,
  Position,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import styles from "./styles.module.css";
import { ComponentEdge } from "@/types";
import { CSSProperties, useCallback, useRef } from "react";
import { useSimulation, useTheme } from "@/store";

const GRID_SIZE = 10;
const STUB = 18;

function getDirection(position: Position): { dx: number; dy: number } {
  switch (position) {
    case Position.Top:
      return { dx: 0, dy: -1 };
    case Position.Bottom:
      return { dx: 0, dy: 1 };
    case Position.Left:
      return { dx: -1, dy: 0 };
    case Position.Right:
      return { dx: 1, dy: 0 };
    default:
      return { dx: 0, dy: 1 };
  }
}

function buildDetourPath(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position,
  centerX?: number,
  centerY?: number
) {
  const sourceDir = getDirection(sourcePosition);
  const targetDir = getDirection(targetPosition);

  // Punto donde termina el "stub" de salida del source y de llegada al target
  const p1 = { x: sourceX + sourceDir.dx * STUB, y: sourceY + sourceDir.dy * STUB };
  const p4 = { x: targetX + targetDir.dx * STUB, y: targetY + targetDir.dy * STUB };

  if (centerX !== undefined) {
    // Desvío en columna intermedia (para wires con tramo medio vertical)
    const d = `M ${sourceX},${sourceY}
      L ${p1.x},${p1.y}
      L ${centerX},${p1.y}
      L ${centerX},${p4.y}
      L ${p4.x},${p4.y}
      L ${targetX},${targetY}`;

    return [d, centerX, (p1.y + p4.y) / 2] as const;
  }

  if (centerY !== undefined) {
    // Desvío en fila intermedia (para wires con tramo medio horizontal)
    const d = `M ${sourceX},${sourceY}
      L ${p1.x},${p1.y}
      L ${p1.x},${centerY}
      L ${p4.x},${centerY}
      L ${p4.x},${p4.y}
      L ${targetX},${targetY}`;

    return [d, (p1.x + p4.x) / 2, centerY] as const;
  }

  return null;
}

export function Wire({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<ComponentEdge>) {
  const { currentTheme } = useTheme();
  const { isSimulationRunning } = useSimulation();
  const { screenToFlowPosition, updateEdgeData } = useReactFlow();

  const centerX = data?.centerX;
  const centerY = data?.centerY;

  const detour = buildDetourPath(
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    centerX,
    centerY
  );

  const [defaultD, defaultLabelX, defaultLabelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 2,
    offset: STUB,
  });

  const [d, labelX, labelY] = detour ?? [defaultD, defaultLabelX, defaultLabelY];

  const flowDirection = data?.flowDirection;
  const voltage = data?.voltage;
  const current = data?.current;

  const simulationClassName = isSimulationRunning
    ? voltage === 0 && current === 0
      ? ""
      : flowDirection === "backward"
      ? styles.wire_simulation
      : flowDirection === "forward"
      ? styles.wire_simulation_reverse
      : ""
    : "";

  const wireStyle = {
    "--wire-color":
      (data?.color === "#000000" || data?.color === "rgb(0,0,0)") && currentTheme === "dark"
        ? "#FFFFFF"
        : (data?.color.toLowerCase() === "#ffffff" || data?.color === "rgb(255,255,255)") &&
          currentTheme === "light"
        ? "#000000"
        : data?.color,
  } as CSSProperties;

  const isVertical = Math.abs(sourceX - targetX) < Math.abs(sourceY - targetY);

  const dragging = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const pos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const snappedX = Math.round(pos.x / GRID_SIZE) * GRID_SIZE;
      const snappedY = Math.round(pos.y / GRID_SIZE) * GRID_SIZE;

      updateEdgeData(id, isVertical ? { centerX: snappedX } : { centerY: snappedY });
    },
    [id, isVertical, screenToFlowPosition, updateEdgeData]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const onDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateEdgeData(id, { centerX: undefined, centerY: undefined });
    },
    [id, updateEdgeData]
  );

  return (
    <>
      <BaseEdge
        interactionWidth={5}
        markerEnd={MarkerType.Arrow}
        path={d}
        className={`${styles.wire} ${simulationClassName}`}
        style={wireStyle}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            cursor: isVertical ? "ew-resize" : "ns-resize",
            width: 14,
            height: 14,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onDoubleClick={onDoubleClick}
          className={`${styles.wire_drag_handle} nodrag nopan`}
        />
      </EdgeLabelRenderer>
    </>
  );
}