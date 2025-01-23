import { ComponentType } from "../types";

export const ARRAY_COMPONENTS: ComponentType[] = [
    ComponentType.Resistor,
    ComponentType.Rheostat,
    ComponentType.Thermistor,
    ComponentType.Photoresistance,
    ComponentType.Potentiometer,
    ComponentType.Capacitor,
    ComponentType.PolarisedCapacitor,
    ComponentType.VariableCapacitor,
    ComponentType.TrimmerCapacitor,
    ComponentType.Diode,
    ComponentType.Led,
    ComponentType.Zener,
    ComponentType.Schottky,
    ComponentType.Tunnel,
    ComponentType.PhotoDiode,
    ComponentType.TVSDiode,
    ComponentType.Varactor,
    ComponentType.Inductor,
    ComponentType.TransistorBJT_NPN,
    ComponentType.TransistorBJT_PNP,
    ComponentType.TransistorJFET_N,
    ComponentType.TransistorJFET_P,
    ComponentType.TransistorMOSFET_N_Enhanced,
    ComponentType.TransistorMOSFET_P_Enhanced,
    ComponentType.TransistorMOSFET_N_Depletion,
    ComponentType.TransistorMOSFET_P_Depletion,
    ComponentType.Node,
    ComponentType.Board,
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

export const LedColors = {
    colors: [
        '#FFFFFF00',
        '#FF0000',
        '#1aff00',
        '#e5bc05',
        '#0d42ff',
    ]
};