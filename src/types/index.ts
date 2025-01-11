import { Node } from "@xyflow/react";
export enum ElectricalComponentType {
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

export enum ElectricalComponentState {
    Add = 'add',
    NotAdd = 'NnotAdd',
    Undefined = 'undefined'

}

export type ElectricalComponentData = {
    value: number
    type: ElectricalComponentType
    rotation: number
    state?: ElectricalComponentState
    isLock: boolean
    unit: UnitsType
    prefix: string
}

export type ElectricalComponentNode = Node<ElectricalComponentData, string>;
