

import { AnalogNode, ComponentType, GroupComponent, Presets, UnitsType } from "../types";
import { COMPONENTS, STRUCTURE_COMPONENTS } from "@/constants";
import { XYPosition } from "@xyflow/react";
import { CSSProperties } from "react";
import { createRoot } from "react-dom/client";

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
    type: 'analogComponent' | 'nodeComponent' | 'board',
    has_properties: boolean
    isValueVisible: boolean,
    isReferenceVisible: boolean
    connectedHandles: boolean[],
    color?: string,
    size: 'small' | 'medium' | 'large',
    style: CSSProperties | undefined
}

// Mapa para almacenar contadores por tipo
const typePropertiesMap: Record<ComponentType, ComponentPropertiesDefault> = {
    [ComponentType.Resistor]: { value: 1, unit: UnitsType.Ohm, prefix: "KΩ", reference: "R", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Rheostat]: { value: 1, unit: UnitsType.Ohm, prefix: "KΩ", reference: "RH", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Thermistor]: { value: 10, unit: UnitsType.Ohm, prefix: "KΩ", reference: "RT", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Photoresistance]: { value: 10, unit: UnitsType.Ohm, prefix: "KΩ", reference: "LDR", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "medium" },
    [ComponentType.Capacitor]: { value: 100, unit: UnitsType.Capacitance, prefix: "nF", reference: "C", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.PolarisedCapacitor]: { value: 4.7, unit: UnitsType.Capacitance, prefix: "µF", reference: "C", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.VariableCapacitor]: { value: 100, unit: UnitsType.Capacitance, prefix: "µF", reference: "VC", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.TrimmerCapacitor]: { value: 100, unit: UnitsType.Capacitance, prefix: "µF", reference: "VC", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Inductor]: { value: 100, unit: UnitsType.Inductance, prefix: "mH", reference: "L", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Diode]: { value: 0.7, unit: UnitsType.Voltage, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Led]: { value: 30, unit: UnitsType.Current, prefix: "µA", reference: "LED", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Zener]: { value: 6, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Schottky]: { value: 30, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Tunnel]: { value: 15, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.PhotoDiode]: { value: 6, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.TVSDiode]: { value: 15, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Varactor]: { value: 30, unit: UnitsType.Current, prefix: "V", reference: "D", type: 'analogComponent', has_properties: true, isReferenceVisible: true, isValueVisible: true, connectedHandles: [false, false], style: undefined, size: "small" },
    [ComponentType.Board]: { value: 0, unit: UnitsType.Undefined, prefix: "", reference: "BR", type: 'board', has_properties: false, isReferenceVisible: false, isValueVisible: false, connectedHandles: [], style: { height: 200, width: 200 }, size: "small" },
    [ComponentType.Node]: { value: 0, unit: UnitsType.Undefined, prefix: "", reference: "N", type: 'nodeComponent', has_properties: false, isReferenceVisible: false, isValueVisible: false, connectedHandles: [false, false, false, false], color: 'var(--foreground-color)', style: undefined, size: "small" },
};

const typeGroupDiode = new Set<ComponentType>([
    ComponentType.Diode,
    ComponentType.Zener,
    ComponentType.Schottky,
    ComponentType.Tunnel,
    ComponentType.PhotoDiode,
    ComponentType.TVSDiode,
    ComponentType.Varactor,
]);


const typeGroupCapacitor = new Set<ComponentType>([
    ComponentType.Capacitor,
    ComponentType.PolarisedCapacitor,
]);


const typeGroupVariableCapacitor = new Set<ComponentType>([
    ComponentType.VariableCapacitor,
    ComponentType.TrimmerCapacitor,
]);



export function getComponentProperties(type: ComponentType, components: AnalogNode[]): ComponentPropertiesDefault {

    const reference = typePropertiesMap[type].reference;
    if (!reference) {
        throw new Error(`Unknown component type: ${type}`);
    }
    let matchingComponents: AnalogNode[] = [];
    if (typeGroupDiode.has(type)) {
        matchingComponents = components.filter(component => typeGroupDiode.has(component.data.type));
    } else if (typeGroupCapacitor.has(type)) {
        matchingComponents = components.filter(component => typeGroupCapacitor.has(component.data.type));
    } else if (typeGroupVariableCapacitor.has(type)) {
        matchingComponents = components.filter(component => typeGroupVariableCapacitor.has(component.data.type));
    } else {
        matchingComponents = components.filter(component => component.data.type === type);
    }

    const properties: ComponentPropertiesDefault = {
        reference: `${reference}${matchingComponents.length + 1}`,
        prefix: typePropertiesMap[type].prefix,
        unit: typePropertiesMap[type].unit,
        value: typePropertiesMap[type].value,
        type: typePropertiesMap[type].type,
        has_properties: typePropertiesMap[type].has_properties,
        isReferenceVisible: typePropertiesMap[type].isReferenceVisible,
        isValueVisible: typePropertiesMap[type].isValueVisible,
        connectedHandles: typePropertiesMap[type].connectedHandles,
        color: typePropertiesMap[type].color,
        size: typePropertiesMap[type].size,
        style: typePropertiesMap[type].style
    };
    return properties;
}
export function reorderComponentReferences(components: AnalogNode[]): AnalogNode[] {
    const typeCounters: Record<ComponentType | 'DiodeGroup' | 'CapacitorGroup' | 'VariableCapacitorGroup', number> = {
        [ComponentType.Resistor]: 0,
        [ComponentType.Rheostat]: 0,
        [ComponentType.Thermistor]: 0,
        [ComponentType.Photoresistance]: 0,
        [ComponentType.Capacitor]: 0,
        [ComponentType.PolarisedCapacitor]: 0,
        [ComponentType.VariableCapacitor]: 0,
        [ComponentType.TrimmerCapacitor]: 0,
        [ComponentType.Inductor]: 0,
        [ComponentType.Diode]: 0,
        [ComponentType.Led]: 0,
        [ComponentType.Zener]: 0,
        [ComponentType.Schottky]: 0,
        [ComponentType.Tunnel]: 0,
        [ComponentType.PhotoDiode]: 0,
        [ComponentType.TVSDiode]: 0,
        [ComponentType.Varactor]: 0,
        [ComponentType.Board]: 0,
        [ComponentType.Node]: 0,
        CapacitorGroup: 0, // Contador para todos los diodos excepto LED
        DiodeGroup: 0, // Contador para todos los diodos excepto LED 
        VariableCapacitorGroup: 0, // Contador para todos los diodos excepto LED 
    };




    return components.map((component) => {
        const { type } = component.data;
        const isCapacitorGroup = typeGroupCapacitor.has(type);
        const isVariableCapacitorGroup = typeGroupVariableCapacitor.has(type);
        const isDiodeGroup = typeGroupDiode.has(type) && type !== ComponentType.Led;


        // Incrementar el contador correspondiente
        if (isDiodeGroup) {
            typeCounters.DiodeGroup += 1;
        } else if (isCapacitorGroup) {
            typeCounters.CapacitorGroup += 1;
        } else if (isVariableCapacitorGroup) {
            typeCounters.VariableCapacitorGroup += 1;
        } else {
            typeCounters[type] += 1;
        }

        let newReference = "";

        if (isDiodeGroup) {
            newReference = `D${typeCounters.DiodeGroup}`;
        } else if (isCapacitorGroup) {
            newReference = `C${typeCounters.CapacitorGroup}`;
        } else if (isVariableCapacitorGroup) {
            newReference = `VC${typeCounters.VariableCapacitorGroup}`;
        } else {
            newReference = `${typePropertiesMap[type].reference.toUpperCase()}${typeCounters[type]}`;
        }


        return {
            ...component,
            data: {
                ...component.data,
                reference: newReference,
            },
        };
    });
}



export function getImageBackgroundDrag(type: ComponentType): HTMLDivElement {
    let currentComponent: GroupComponent | undefined = undefined;

    currentComponent = COMPONENTS[type];

    if (!currentComponent) currentComponent = STRUCTURE_COMPONENTS.find(component => component.type === type);

    const tempContainer = document.createElement('div');
    if (currentComponent) {
        tempContainer.className = "elementDrag";

        // Renderizar el ResistorIcon en el contenedor 
        const root = createRoot(tempContainer as HTMLElement);
        root.render(currentComponent.icon);
        document.body.appendChild(tempContainer);

        // Usar el contenedor como la imagen de arrastre
        setTimeout(() => {
            root.unmount(); // Desmontar el componente
            document.body.removeChild(tempContainer);
        }, 0);
    }
    return tempContainer;
}


export const getNewPositionByOverlapping = (dragNodePosition: XYPosition, overlappingNodePosition: XYPosition): XYPosition => {
    const widthNode = 60;
    const horizontalOverlapping: 'right' | 'left' | 'none' = overlappingNodePosition.x === dragNodePosition.x ? 'none' : overlappingNodePosition.x > dragNodePosition.x ? 'left' : 'right';
    const verticalOverlapping: 'top' | 'bottom' | 'none' = overlappingNodePosition.y === dragNodePosition.y ? 'none' : overlappingNodePosition.y > dragNodePosition.y ? 'top' : 'bottom';

    // Si no hay solapamiento en ninguna dirección, no mover el nodo
    if (horizontalOverlapping === 'none' && verticalOverlapping === 'none') {
        return {
            x: dragNodePosition.x + widthNode * 2, // Mover a la derecha
            y: dragNodePosition.y, // Mover hacia abajo
        };
    }
    // Desplazamientos predeterminados en caso de solapamiento
    let offsetX = verticalOverlapping === "none" ? 20 : 0;
    let offsetY = horizontalOverlapping === "none" ? 20 : 0;

    // Desplazar al lado más cercano en horizontal
    if (horizontalOverlapping !== 'none') {
        const distanceLeft = dragNodePosition.x - overlappingNodePosition.x;
        const distanceRight = overlappingNodePosition.x - dragNodePosition.x;
        if (distanceLeft < distanceRight) {
            offsetX = widthNode; // Mover a la derecha
        } else {
            offsetX = -widthNode; // Mover a la izquierda
        }
    }

    // Desplazar al lado más cercano en vertical
    if (verticalOverlapping !== 'none') {
        const distanceTop = dragNodePosition.y - overlappingNodePosition.y;
        const distanceBottom = overlappingNodePosition.y - dragNodePosition.y;

        if (distanceTop < distanceBottom) {
            offsetY = widthNode; // Mover hacia abajo
        } else {
            offsetY = -widthNode; // Mover hacia arriba
        }
    }

    return { x: dragNodePosition.x - offsetX, y: dragNodePosition.y - offsetY };
};