import { Edge, Node } from "@xyflow/react";
import { ColorPickerProps } from "antd";
export enum ComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
    Diode = 'diode',
    Led = "led",
    Battery = 'battery',
    Board = 'board',
}

export enum OhmType {
    Ohm = 'Ω',
    kiloOhm = 'KΩ',
    MegaOhm = 'MΩ'
}

export enum UnitsType {
    Ohm = 'ohm',
    Voltage = 'volt',
    Current = 'amper',
    Henrio = 'henrio'
}

export const UNITS = {
    ohm: ['Ω', 'KΩ', 'MΩ'],
    volt: ['mV', 'V'],
    amper: ['μA', 'mA', 'A'],
    henrio: ['μH', 'mH', 'H']
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
    state?: ComponentState
    isLock: boolean
    unit: UnitsType
    prefix: string
    has_properties?: boolean
    reference: string
}

export type ComponentNode = Node<ComponentData, string>;

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