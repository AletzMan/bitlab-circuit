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
    lightPalette: [
        '#000000', // Negro
        '#FF5733', // Rojo brillante
        '#FF8D33', // Naranja
        '#FFC300', // Amarillo
        '#DAF7A6', // Verde lima
        '#33FF57', // Verde
        '#33FFBD', // Cian
        '#33C4FF', // Azul claro
        '#337BFF', // Azul medio
        '#8C33FF', // Violeta 
    ],
    darkPalette: [
        '#FFFFFF', // Blanco
        '#FF6F61', // Coral
        '#FF914D', // Naranja oscuro
        '#FFC300', // Oro
        '#B8E986', // Verde amarillento
        '#33FF88', // Verde lima
        '#33D1FF', // Azul acero
        '#337BFF', // Azul medio
        '#A569BD', // Púrpura medio
        '#6C3483', // Púrpura oscuro 
    ],
};