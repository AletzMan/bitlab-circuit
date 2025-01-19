import { Edge, Node } from "@xyflow/react";
import { ColorPickerProps } from "antd";
export enum ComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
    CapacitorElectrlytic = 'capacitorelectrolytic',
    Inductor = 'inductor',
    Diode = 'diode',
    Led = "led",
    Zener = "zener",
    Schottky = "schottky",
    Battery = 'battery',
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
    color?: string;
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