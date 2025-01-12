import { Node } from "@xyflow/react";
export enum ComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
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
}

export type ComponentNode = Node<ComponentData, string>;


export enum HistoryAction {
    AddNode = "addNode",
    RemoveNode = "removeNode",
    AddEdge = "addEdge",
    RemoveEdge = "removeEdge",
}