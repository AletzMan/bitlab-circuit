import { ReactFlowState } from "@xyflow/react";
import { ComponentNode, ComponentType, Presets, UnitsType } from "../types";

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


export type ComponentPropertiesDefault = {
    value: number,
    prefix: string,
    unit: UnitsType,
    reference: string
}

// Mapa para almacenar contadores por tipo
const typePropertiesMap: Record<ComponentType, ComponentPropertiesDefault> = {
    [ComponentType.Resistor]: { value: 1, unit: UnitsType.Ohm, prefix: "KΩ", reference: "R" },
    [ComponentType.Capacitor]: { value: 4.7, unit: UnitsType.Ohm, prefix: "µF", reference: "C" },
    [ComponentType.Diode]: { value: 0.7, unit: UnitsType.Voltage, prefix: "V", reference: "D" },
    [ComponentType.Led]: { value: 30, unit: UnitsType.Current, prefix: "µA", reference: "LED" },
    [ComponentType.Battery]: { value: 12, unit: UnitsType.Voltage, prefix: "V", reference: "B" },
    [ComponentType.Board]: { value: 0, unit: UnitsType.Undefined, prefix: "", reference: "BR" },
};

export function getComponentProperties(type: ComponentType, components: ComponentNode[]): ComponentPropertiesDefault {

    const reference = typePropertiesMap[type].reference;
    if (!reference) {
        throw new Error(`Unknown component type: ${type}`);
    }

    const matchingComponents = components.filter(component => component.data.type === type);

    const properties: ComponentPropertiesDefault = {
        reference: `${reference}${matchingComponents.length + 1}`,
        prefix: typePropertiesMap[type].prefix,
        unit: typePropertiesMap[type].unit,
        value: typePropertiesMap[type].value
    };
    return properties;
}

export function reorderComponentReferences(components: ComponentNode[]): ComponentNode[] {
    const typeCounters: Record<ComponentType, number> = {
        [ComponentType.Resistor]: 0,
        [ComponentType.Capacitor]: 0,
        [ComponentType.Diode]: 0,
        [ComponentType.Led]: 0,
        [ComponentType.Battery]: 0,
        [ComponentType.Board]: 0,
    };

    return components.map((component) => {
        const { type } = component.data;

        // Incrementar el contador para este tipo
        typeCounters[type] += 1;

        // Actualizar la referencia con el nuevo identificador
        const newReference = `${typePropertiesMap[type].reference.toUpperCase()}${typeCounters[type]}`;
        return {
            ...component,
            data: {
                ...component.data,
                reference: newReference,
            },
        };
    });
}
