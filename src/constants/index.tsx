import { BoardIcon, CapacitorElectrolyticIcon, CapacitorIcon, DiodeIcon, InductorIcon, LEDIcon, NodeIcon, PhotoDiodeIcon, ResistorIcon, RheostatIcon, SchottkyIcon, TVSDiodeIcon, ThermistorIcon, TunnelIcon, VaractorIcon, ZenerIcon } from "../icons";
import { ComponentType, GroupComponent } from "../types";

export const ANALOG_COMPONENTS: GroupComponent[] = [
    {
        icon: <ResistorIcon />,
        type: ComponentType.Resistor,
        label: "Resistor"
    },
    {
        icon: <RheostatIcon />,
        type: ComponentType.Rheostat,
        label: "Rheostat"
    },
    {
        icon: <ThermistorIcon />,
        type: ComponentType.Thermistor,
        label: "Thermistor"
    },
    {
        icon: <CapacitorIcon />,
        type: ComponentType.Capacitor,
        label: "Capacitor"
    },
    {
        icon: <CapacitorElectrolyticIcon />,
        type: ComponentType.CapacitorElectrolytic,
        label: "Capacitor Electrlytic"
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
        icon: <ZenerIcon />,
        type: ComponentType.Zener,
        label: "Zener"
    },
    {
        icon: <SchottkyIcon />,
        type: ComponentType.Schottky,
        label: "Schottky"
    },
    {
        icon: <TunnelIcon />,
        type: ComponentType.Tunnel,
        label: "Tunnel"
    },
    {
        icon: <PhotoDiodeIcon />,
        type: ComponentType.PhotoDiode,
        label: "Photo Diode"
    },
    {
        icon: <TVSDiodeIcon />,
        type: ComponentType.TVSDiode,
        label: "TVS Diode"
    },
    {
        icon: <VaractorIcon />,
        type: ComponentType.Varactor,
        label: "Varactor"
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
    ComponentType.CapacitorElectrolytic,
    ComponentType.Diode,
    ComponentType.Led,
    ComponentType.Zener,
    ComponentType.Schottky,
    ComponentType.Tunnel,
    ComponentType.PhotoDiode,
    ComponentType.TVSDiode,
    ComponentType.Varactor,
    ComponentType.Rheostat,
    ComponentType.Thermistor,
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
        '#337BFF', // Azul medio
        '#e91e0c', // Coral
        '#FF914D', // Naranja oscuro
        '#FFC300', // Oro
        '#B8E986', // Verde amarillento
        '#33FF88', // Verde lima
        '#33D1FF', // Azul acero
        '#A569BD', // Púrpura medio
        '#6C3483', // Púrpura oscuro 
    ],
};