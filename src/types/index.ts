import { Edge, Node, Position } from "@xyflow/react";
import { ColorPickerProps } from "antd";
import { CSSProperties } from "react";


export enum ComponentType {
    Battery = 'battery',
    PowerSupply = 'powersupply',
    Resistor = 'resistor',
    Rheostat = "rheostat",
    Thermistor = "thermistor",
    Photoresistance = "photoresistance ",
    Potentiometer = "potentiometer",
    Capacitor = 'capacitor',
    PolarisedCapacitor = 'polarisedcapacitor',
    VariableCapacitor = 'variablecapacitor',
    TrimmerCapacitor = 'trimmercapacitor',
    Inductor = 'inductor',
    FerriteCoreInductor = 'ferritecoreinductor',
    IronCoreInductor = 'ironcoreinductor',
    PresetFerriteCoreInductor = 'presetferritecoreinductor',
    PresetIronCoreInductor = 'presetironcoreinductor',
    VariableFerriteCoreInductor = 'Variableferritecoreinductor',
    VariableIronCoreInductor = 'Variableironcoreinductor',
    Diode = 'diode',
    Led = "led",
    Zener = "zener",
    Schottky = "schottky",
    Tunnel = "tunnel",
    PhotoDiode = "photodiode",
    TVSDiode = "tvsdiode",
    Varactor = "varactor",
    TransistorBJT_NPN = "transistorbjt_npn",
    TransistorBJT_PNP = "transistorbjt_pnp",
    TransistorJFET_N = "transistorjfet_n",
    TransistorJFET_P = "transistorjfet_p",
    TransistorMOSFET_N_Enhanced = "transistormosfet_n_enhanced",
    TransistorMOSFET_P_Enhanced = "transistormosfet_p_enhanced",
    TransistorMOSFET_N_Depletion = "transistormosfet_n_depletion",
    TransistorMOSFET_P_Depletion = "transistormosfet_p_depletion",
    PhotoTransistorNPN = "phototransistornpn",
    PhotoTransistorPNP = "phototransistorpnp",
    PhotoTransistorNPN3Pins = "phototransistornpn3pins",
    PhotoTransistorPNP3Pins = "phototransistorpnp3pins",
    SwitchSPST = "switchspst",
    SwitchDPST = "switchdpst",
    PusuhButtonOpen = "pushbuttonopen",
    PusuhButtonClose = "pushbuttonclose",
    SwitchSPDT = "switchspdt",
    SwitchDPDT = "switchdpdt",
    RelaySPST = 'relayspst',
    RelayDPST = 'relaydpst',
    RelaySPDT = 'relayspdt',
    RelayDPDT = 'relaydpdt',
    ANDGate = 'andgate',
    ORGate = 'orgate',
    NANDGate = 'nandgate',
    NORGate = 'norgate',
    XORGate = 'xorgate',
    XNORGate = 'xnorgate',
    NOTGate = 'notgate',
    BUFFERGate = 'buffergate',
    Board = 'board',
    Node = 'node',
}

export enum OhmType {
    Ohm = 'Ω',
    kiloOhm = 'KΩ',
    MegaOhm = 'MΩ'
}

export enum UnitsType {
    Ohm = 'ohm',
    Voltage = 'volt',
    Current = 'ampere',
    Capacitance = 'farad',
    Inductance = 'henry',
    Undefined = "undefined"
}

export const UNITS = {
    ohm: ['Ω', 'KΩ', 'MΩ'],
    volt: ['mV', 'V'],
    farad: ['pF', 'nF', 'µF'],
    ampere: ['μA', 'mA', 'A'],
    henry: ['μH', 'mH', 'H'],
    undefined: [],
};

export enum ComponentCollapsed {
    Add = 'add',
    NotAdd = 'NnotAdd',
    Undefined = 'undefined'

}

export type ComponentData = {
    name: string
    value: number | string
    value_optional?: number | string
    type: ComponentType
    category: Categories
    rotation: number
    flip: {
        x: number,
        y: number
    }
    collapsed?: ComponentCollapsed
    state?: {
        on: boolean,
        iconON?: JSX.Element | undefined
        iconOFF?: JSX.Element | undefined
    }
    isLock: boolean
    unit: UnitsType
    unit_optional?: UnitsType
    prefix: string
    prefix_optional?: string
    has_properties?: boolean
    designator: string
    isValueVisible: boolean
    isDesignatorVisible: boolean
    connectedHandles: boolean[]
    color?: string
    size: 'small' | 'medium' | 'large'
}

export type ComponentCategories = {
    title: string,
    components: GroupComponent[]
}

export type GroupComponent = {
    icon: JSX.Element,
    type: ComponentType,
    label: string
}

export enum Categories {
    Structure = 'Structure',
    Resistors = 'Resistors',
    Capacitors = 'Capacitors',
    Diodes = 'Diodes',
    Transistors = 'Transistors',
    Inductors = 'Inductors',
    'Switches & Relays' = 'Switches & Relays',
    "Logic Gates" = 'Logic Gates',
    "Power & Supply" = 'Power & Supply',
}

export type ComponentProperties = {
    name: string
    value: number | string,
    value_optional?: number | string,
    category: Categories,
    componentType: ComponentType,
    state?: {
        on: boolean,
        iconON?: JSX.Element | undefined
        iconOFF?: JSX.Element | undefined
    }
    icon: JSX.Element,
    prefix: string,
    collapsed?: ComponentCollapsed
    unit: UnitsType,
    unit_optional?: UnitsType
    prefix_optional?: string
    designator: string
    type: 'analogComponent' | 'nodeComponent' | 'transistorComponent' | 'mechanicalComponent' | 'switchSPDT' | 'board' | 'switchDPST' | 'switchDPDT' | 'relaySPST' | 'relayDPST' | 'relaySPDT' | 'relayDPDT' | 'logicGate' | 'powerSupply' | 'battery',
    has_properties: boolean
    isValueVisible: boolean,
    isDesignatorVisible: boolean
    connectedHandles: boolean[],
    color?: string,
    size: 'small' | 'medium' | 'large',
    style: CSSProperties | undefined,
}



export type AnalogNode = Node<ComponentData, string>;

export type EdgeData = {
    color: string,
    path: string,
};

export type ComponentEdge = Edge<EdgeData, string>

export enum HistoryAction {
    AddNode = "addNode",
    RemoveNode = "removeNode",
    AddEdge = "addEdge",
    RemoveEdge = "removeEdge",
}
export type Presets = Required<ColorPickerProps>['presets'][number];

export interface ITerminalSetting {
    position: Position[],
    adjustment: CSSProperties[]
}

