import { Edge, Node } from "@xyflow/react";
import { ColorPickerProps } from "antd";


export enum ComponentType {
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

export enum ComponentState {
    Add = 'add',
    NotAdd = 'NnotAdd',
    Undefined = 'undefined'

}

export type ComponentData = {
    name: string
    value: number
    type: ComponentType
    rotation: number
    flip: {
        x: number,
        y: number
    }
    state?: ComponentState
    isLock: boolean
    unit: UnitsType
    prefix: string
    has_properties?: boolean
    reference: string
    isValueVisible: boolean
    isReferenceVisible: boolean
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

/*
export type UnionData = {
    type: UnionType
    state?: ComponentState
    isLock: boolean
    has_properties?: boolean
    reference: string
}
*/
//export type UnionNode = Node<UnionData, string>;

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