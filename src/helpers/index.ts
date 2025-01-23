

import { ComponentsMap } from "@/constants/components";
import { AnalogNode, ComponentProperties, ComponentType, Presets } from "../types";
import { XYPosition } from "@xyflow/react";
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




const typeGroupDiode = new Set<ComponentType>([
    ComponentType.Diode,
    ComponentType.Zener,
    ComponentType.Schottky,
    ComponentType.Tunnel,
    ComponentType.PhotoDiode,
    ComponentType.TVSDiode,
    ComponentType.Varactor,
]);


const typeGroupResistor = new Set<ComponentType>([
    ComponentType.Resistor,
    ComponentType.Potentiometer,
]);

const typeGroupCapacitor = new Set<ComponentType>([
    ComponentType.Capacitor,
    ComponentType.PolarisedCapacitor,
]);


const typeGroupVariableCapacitor = new Set<ComponentType>([
    ComponentType.VariableCapacitor,
    ComponentType.TrimmerCapacitor,
]);

export const typeGroupTransistor = new Set<ComponentType>(
    [
        ComponentType.TransistorBJT_NPN,
        ComponentType.TransistorBJT_PNP,
        ComponentType.TransistorJFET_N,
        ComponentType.TransistorJFET_P,
        ComponentType.TransistorMOSFET_N_Enhanced,
        ComponentType.TransistorMOSFET_P_Enhanced,
        ComponentType.TransistorMOSFET_N_Depletion,
        ComponentType.TransistorMOSFET_P_Depletion,
    ]
);


export function getComponentProperties(type: ComponentType, components: AnalogNode[]): ComponentProperties {

    const reference = ComponentsMap[type].reference;
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
    } else if (typeGroupResistor.has(type)) {
        matchingComponents = components.filter(component => typeGroupResistor.has(component.data.type));
    } else if (typeGroupTransistor.has(type)) {
        matchingComponents = components.filter(component => typeGroupTransistor.has(component.data.type));
    } else {
        matchingComponents = components.filter(component => component.data.type === type);
    }

    const properties: ComponentProperties = {
        reference: `${reference}${matchingComponents.length + 1}`,
        prefix: ComponentsMap[type].prefix,
        unit: ComponentsMap[type].unit,
        value: ComponentsMap[type].value,
        icon: ComponentsMap[type].icon,
        category: ComponentsMap[type].category,
        componentType: ComponentsMap[type].componentType,
        type: ComponentsMap[type].type,
        has_properties: ComponentsMap[type].has_properties,
        isReferenceVisible: ComponentsMap[type].isReferenceVisible,
        isValueVisible: ComponentsMap[type].isValueVisible,
        connectedHandles: ComponentsMap[type].connectedHandles,
        color: ComponentsMap[type].color,
        size: ComponentsMap[type].size,
        style: ComponentsMap[type].style,
        name: ComponentsMap[type].name
    };
    return properties;
}
export function reorderComponentReferences(components: AnalogNode[]): AnalogNode[] {
    const typeCounters: Record<ComponentType | 'DiodeGroup' | 'CapacitorGroup' | 'VariableCapacitorGroup' | 'ResistorGroup' | 'TransistorGroup', number> = {
        [ComponentType.Resistor]: 0,
        [ComponentType.Rheostat]: 0,
        [ComponentType.Thermistor]: 0,
        [ComponentType.Photoresistance]: 0,
        [ComponentType.Potentiometer]: 0,
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
        [ComponentType.TransistorBJT_NPN]: 0,
        [ComponentType.TransistorBJT_PNP]: 0,
        [ComponentType.TransistorJFET_N]: 0,
        [ComponentType.TransistorJFET_P]: 0,
        [ComponentType.TransistorMOSFET_N_Enhanced]: 0,
        [ComponentType.TransistorMOSFET_P_Enhanced]: 0,
        [ComponentType.TransistorMOSFET_N_Depletion]: 0,
        [ComponentType.TransistorMOSFET_P_Depletion]: 0,
        [ComponentType.Board]: 0,
        [ComponentType.Node]: 0,
        CapacitorGroup: 0,
        DiodeGroup: 0,
        VariableCapacitorGroup: 0,
        ResistorGroup: 0,
        TransistorGroup: 0,
    };




    return components.map((component) => {
        const { type } = component.data;
        const isResistorGroup = typeGroupResistor.has(type);
        const isCapacitorGroup = typeGroupCapacitor.has(type);
        const isVariableCapacitorGroup = typeGroupVariableCapacitor.has(type);
        const isDiodeGroup = typeGroupDiode.has(type) && type !== ComponentType.Led;
        const isTransistorGroup = typeGroupTransistor.has(type);


        // Incrementar el contador correspondiente
        if (isDiodeGroup) {
            typeCounters.DiodeGroup += 1;
        } else if (isCapacitorGroup) {
            typeCounters.CapacitorGroup += 1;
        } else if (isVariableCapacitorGroup) {
            typeCounters.VariableCapacitorGroup += 1;
        } else if (isResistorGroup) {
            typeCounters.ResistorGroup += 1;
        } else if (isTransistorGroup) {
            typeCounters.TransistorGroup += 1;
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
        } else if (isResistorGroup) {
            newReference = `R${typeCounters.ResistorGroup}`;
        } else if (isTransistorGroup) {
            newReference = `Q${typeCounters.TransistorGroup}`;
        } else {
            newReference = `${ComponentsMap[type].reference.toUpperCase()}${typeCounters[type]}`;
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
    let currentComponent: ComponentProperties | undefined = undefined;

    currentComponent = ComponentsMap[type];

    if (!currentComponent) currentComponent = ComponentsMap[type];

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

export function groupBy<T, K extends keyof T>(
    items: T[],
    key: K
): Record<string, T[]> {
    return items.reduce((acc, item) => {
        const groupKey = String(item[key]); // Convertimos la clave a string
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}


export function groupByToArray<T, K extends keyof T>(
    items: T[],
    key: K
): Array<{ category: T[K]; items: T[] }> {
    const grouped = items.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc.has(groupKey)) {
            acc.set(groupKey, []);
        }
        acc.get(groupKey)!.push(item);
        return acc;
    }, new Map<T[K], T[]>());

    // Convertimos el Map a un array de objetos con categoría e ítems
    return Array.from(grouped, ([category, items]) => ({
        category,
        items,
    }));
}
