import { BoardIcon, CapacitorIcon, ResistorIcon } from "../icons";
import { ComponentType } from "../types";

export const COMPONENTS = [
    {
        icon: <ResistorIcon />,
        type: ComponentType.Resistor,
        label: "Resistor"
    },
    {
        icon: <CapacitorIcon />,
        type: ComponentType.Capacitor,
        label: "Capacitor"
    },
    {
        icon: <BoardIcon />,
        type: ComponentType.Board,
        label: 'Board'
    }
];

export const ARRAY_COMPONENTS: ComponentType[] = [
    ComponentType.Resistor,
    ComponentType.Capacitor,
];

export const CustomColorsWire = {
    customPalette: [
        '#FF5733', // Rojo brillante
        '#FFC300', // Amarillo
        '#DAF7A6', // Verde claro
        '#33FF57', // Verde
        '#33FFBD', // Verde azulado
        '#33C4FF', // Azul claro
        '#337BFF', // Azul oscuro
        '#8C33FF', // Morado
        '#FF33A1', // Rosa
        '#FF3358', // Rojo intenso
    ],
};