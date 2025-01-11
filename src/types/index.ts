import { Node } from "@xyflow/react";
export enum ElectricalComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
    Led = "led",
    Battery = 'battery',
    Board = 'board'
}

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
}

export type ElectricalComponentNode = Node<ElectricalComponentData, string>;
