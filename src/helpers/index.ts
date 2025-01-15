import { ReactFlowState } from "@xyflow/react";
import { ComponentNode, ComponentType, Presets } from "../types";

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

// Función para calcular la luminancia
export function getLuminance(hex: string): number {
    const [r, g, b] = hex
        .replace("#", "")
        .match(/.{2}/g)!
        .map((channel) => parseInt(channel, 16) / 255);

    const toLinear = (value: number) =>
        value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Función para verificar si hay buen contraste
export function hasGoodContrast(colorHex: string, theme: "dark" | "light"): boolean {
    const colorLuminance = getLuminance(colorHex);
    const themeLuminance = theme === "dark" ? 0 : 1;

    const contrastRatio =
        (Math.max(colorLuminance, themeLuminance) + 0.05) /
        (Math.min(colorLuminance, themeLuminance) + 0.05);

    return contrastRatio >= 4.5;
}

export function genPresets(customColors: { [key: string]: string[] }) {
    return Object.entries(customColors).map<Presets>(([label, colors]) => ({
        label,
        colors,
        key: label,
    }));
}

export function findComponentReference(type: ComponentType, components: ComponentNode[]): string {
    let reference = "";
    switch (type) {
        case ComponentType.Resistor: {
            const numberOfResistor = components.filter(component => component.data.type === ComponentType.Resistor);
            reference = `R${numberOfResistor.length + 1}`;
        }
            break;
        case ComponentType.Capacitor: {
            const numberOfCapacitor = components.filter(component => component.data.type === ComponentType.Capacitor);
            reference = `C${numberOfCapacitor.length + 1}`;
        }

            break;

        default:
            break;
    }
    return reference;
}