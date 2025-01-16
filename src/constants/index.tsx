import { BoardIcon, CapacitorElectrolyticIcon, CapacitorIcon, DiodeIcon, InductorIcon, LEDIcon, NodeIcon, ResistorIcon } from "../icons";
import { ComponentType, GroupComponent } from "../types";

export const ANALOG_COMPONENTS: GroupComponent[] = [
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
        icon: <CapacitorElectrolyticIcon />,
        type: ComponentType.CapacitorElectrlytic,
        label: "CapacitorE"
    },
    {
        icon: <DiodeIcon />,
        type: ComponentType.Diode,
        label: "Diode"
    },
    {
        icon: <LEDIcon />,
        type: ComponentType.Led,
        label: "LED"
    },
    {
        icon: <InductorIcon />,
        type: ComponentType.Inductor,
        label: "Inductor"
    }

];

export const STRUCTURE_COMPONENTS: GroupComponent[] = [
    {
        icon: <NodeIcon />,
        type: ComponentType.Node,
        label: "Node"
    },
    {
        icon: <BoardIcon />,
        type: ComponentType.Board,
        label: 'Board Group'
    }
];

export const ARRAY_COMPONENTS: ComponentType[] = [
    ComponentType.Resistor,
    ComponentType.Capacitor,
    ComponentType.CapacitorElectrlytic,
    ComponentType.Diode,
    ComponentType.Led,
    ComponentType.Inductor,
    ComponentType.Node,
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