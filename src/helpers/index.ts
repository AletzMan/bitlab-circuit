import { ReactFlowState } from "@xyflow/react";
import { ComponentType } from "../types";

export const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.7;

export const isPointInBox = (
    point: { x: number; y: number },
    box: { x: number; y: number; height: number; width: number }
) => {
    return (
        point.x >= box.x &&
        point.x <= box.x + box.width &&
        point.y >= box.y &&
        point.y <= box.y + box.height
    );
};

export function getUnit(type: ComponentType) {
    let unit;
    switch (type) {
        case ComponentType.Resistor: {
            unit = "kΩ";
            break;
        }
        case ComponentType.Capacitor: {
            unit = "μF";
            break;
        }
        case ComponentType.Battery: {
            unit = "V";
            break;
        }
    }
    return unit;
}