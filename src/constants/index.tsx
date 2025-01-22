import { BoardIcon, PolarisedCapacitorIcon, CapacitorIcon, DiodeIcon, InductorIcon, LEDIcon, NodeIcon, PhotoDiodeIcon, ResistorIcon, RheostatIcon, SchottkyIcon, TVSDiodeIcon, ThermistorIcon, TunnelIcon, VaractorIcon, ZenerIcon, LDRIcon, VariableCapacitorIcon, TrimmerCapacitorIcon, PotentiometerIcon, BJTNPNIcon, BJTPNPIcon, JFETNIcon, JFETPIcon, NChainEnhMOSFETIcon, PChainEnhMOSFETIcon, NChainDepMOSFETIcon, PChainDepMOSFETIcon } from "../icons";
import { ComponentCategories, ComponentType, GroupComponent } from "../types";

export const ELECTRICAL_COMPONENTS: ComponentCategories[] = [
    {
        title: "Resisitors",
        components: [
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
                icon: <LDRIcon />,
                type: ComponentType.Photoresistance,
                label: "Photo Resistance"
            },
            {
                icon: <PotentiometerIcon />,
                type: ComponentType.Potentiometer,
                label: "Potentiometer "
            }
        ]
    },
    {
        title: "Capacitors",
        components: [
            {
                icon: <CapacitorIcon />,
                type: ComponentType.Capacitor,
                label: "Capacitor"
            },
            {
                icon: <PolarisedCapacitorIcon />,
                type: ComponentType.PolarisedCapacitor,
                label: "Polarised Capacitor"
            },
            {
                icon: <VariableCapacitorIcon />,
                type: ComponentType.VariableCapacitor,
                label: "Variable Capacitor"
            },
            {
                icon: <TrimmerCapacitorIcon />,
                type: ComponentType.TrimmerCapacitor,
                label: "Trimmer Capacitor"
            }
        ]
    },
    {
        title: "Diodes",
        components: [
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
        ]
    },
    {
        title: "Inductors",
        components: [
            {
                icon: <InductorIcon />,
                type: ComponentType.Inductor,
                label: "Inductor"
            }
        ]
    },
    {
        title: "Transistors",
        components: [
            {
                icon: <BJTNPNIcon />,
                type: ComponentType.TransistorBJT_NPN,
                label: "BJT NPN"
            },
            {
                icon: <BJTPNPIcon />,
                type: ComponentType.TransistorBJT_PNP,
                label: "BJT PNP"
            },
            {
                icon: <JFETNIcon />,
                type: ComponentType.TransistorJFET_N,
                label: "JFET N",
            },
            {
                icon: <JFETPIcon />,
                type: ComponentType.TransistorJFET_P,
                label: "JFET P",
            },
            {
                icon: <NChainEnhMOSFETIcon />,
                type: ComponentType.TransistorMOSFET_N_Enhanced,
                label: "MOSFET N-Enhanced"
            },
            {
                icon: <PChainEnhMOSFETIcon />,
                type: ComponentType.TransistorMOSFET_P_Enhanced,
                label: "MOSFET P-Enhanced"
            },
            {
                icon: <NChainDepMOSFETIcon />,
                type: ComponentType.TransistorMOSFET_N_Depletion,
                label: "MOSFET N-Depletion"
            },
            {
                icon: <PChainDepMOSFETIcon />,
                type: ComponentType.TransistorMOSFET_P_Depletion,
                label: "MOSFET P-Depletion"
            },
        ]
    }
];

export const COMPONENTS: Record<ComponentType, GroupComponent> = {
    [ComponentType.Resistor]: {
        icon: <ResistorIcon />,
        type: ComponentType.Resistor,
        label: "Resistor"
    },
    [ComponentType.Rheostat]: {
        icon: <RheostatIcon />,
        type: ComponentType.Rheostat,
        label: "Rheostat"
    },
    [ComponentType.Thermistor]: {
        icon: <ThermistorIcon />,
        type: ComponentType.Thermistor,
        label: "Thermistor"
    },
    [ComponentType.Photoresistance]: {
        icon: <LDRIcon />,
        type: ComponentType.Photoresistance,
        label: "Photoresistance "
    },
    [ComponentType.Potentiometer]: {
        icon: <PotentiometerIcon />,
        type: ComponentType.Potentiometer,
        label: "Potentiometer "
    },
    [ComponentType.Capacitor]: {
        icon: <CapacitorIcon />,
        type: ComponentType.Capacitor,
        label: "Capacitor"
    },
    [ComponentType.PolarisedCapacitor]: {
        icon: <PolarisedCapacitorIcon />,
        type: ComponentType.PolarisedCapacitor,
        label: "Polarised Capacitor"
    },
    [ComponentType.VariableCapacitor]: {
        icon: <VariableCapacitorIcon />,
        type: ComponentType.VariableCapacitor,
        label: "Variable Capacitor"
    },
    [ComponentType.TrimmerCapacitor]: {
        icon: <TrimmerCapacitorIcon />,
        type: ComponentType.TrimmerCapacitor,
        label: "Trimmer Capacitor"
    },
    [ComponentType.Diode]: {
        icon: <DiodeIcon />,
        type: ComponentType.Diode,
        label: "Diode"
    },
    [ComponentType.Led]: {
        icon: <LEDIcon />,
        type: ComponentType.Led,
        label: "LED"
    },
    [ComponentType.Zener]: {
        icon: <ZenerIcon />,
        type: ComponentType.Zener,
        label: "Zener"
    },
    [ComponentType.Schottky]: {
        icon: <SchottkyIcon />,
        type: ComponentType.Schottky,
        label: "Schottky"
    },
    [ComponentType.Tunnel]: {
        icon: <TunnelIcon />,
        type: ComponentType.Tunnel,
        label: "Tunnel"
    },
    [ComponentType.PhotoDiode]: {
        icon: <PhotoDiodeIcon />,
        type: ComponentType.PhotoDiode,
        label: "Photo Diode"
    },
    [ComponentType.TVSDiode]: {
        icon: <TVSDiodeIcon />,
        type: ComponentType.TVSDiode,
        label: "TVS Diode"
    },
    [ComponentType.Varactor]: {
        icon: <VaractorIcon />,
        type: ComponentType.Varactor,
        label: "Varactor"
    },
    [ComponentType.Inductor]: {
        icon: <InductorIcon />,
        type: ComponentType.Inductor,
        label: "Inductor"
    },
    [ComponentType.TransistorBJT_NPN]: {
        icon: <BJTNPNIcon />,
        type: ComponentType.TransistorBJT_NPN,
        label: "BJT NPN"
    },
    [ComponentType.TransistorBJT_PNP]: {
        icon: <BJTPNPIcon />,
        type: ComponentType.TransistorBJT_PNP,
        label: "BJT PNP"
    },
    [ComponentType.TransistorJFET_N]: {
        icon: <JFETNIcon />,
        type: ComponentType.TransistorJFET_N,
        label: "JFET N-Chain"
    },
    [ComponentType.TransistorJFET_P]: {
        icon: <JFETPIcon />,
        type: ComponentType.TransistorJFET_P,
        label: "JFET N-Chain"
    },
    [ComponentType.TransistorMOSFET_N_Enhanced]: {
        icon: <NChainEnhMOSFETIcon />,
        type: ComponentType.TransistorMOSFET_N_Enhanced,
        label: "MOSFET N-Enhanced"
    },
    [ComponentType.TransistorMOSFET_P_Enhanced]: {
        icon: <PChainEnhMOSFETIcon />,
        type: ComponentType.TransistorMOSFET_P_Enhanced,
        label: "MOSFET P-Enhanced"
    },
    [ComponentType.TransistorMOSFET_N_Depletion]: {
        icon: <NChainDepMOSFETIcon />,
        type: ComponentType.TransistorMOSFET_N_Depletion,
        label: "MOSFET N-Depletion"
    },
    [ComponentType.TransistorMOSFET_P_Depletion]: {
        icon: <PChainDepMOSFETIcon />,
        type: ComponentType.TransistorMOSFET_P_Depletion,
        label: "MOSFET P-Depletion"
    },
    [ComponentType.Board]: {
        icon: <BoardIcon />,
        type: ComponentType.Board,
        label: "Board"
    },
    [ComponentType.Node]: {
        icon: <NodeIcon />,
        type: ComponentType.Node,
        label: "Node"
    },
};


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