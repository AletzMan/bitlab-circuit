export enum ElectricalComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
    Led = "led",
    Battery = 'battery',
    Board = 'board'
}

export enum ElectricalComponentState {
    Add = 'add',
    NotAdd = 'NnotAdd'

}

export type ElectricalComponentData = {
    value?: number
    type?: ElectricalComponentType
    rotation?: number
    state?: ElectricalComponentState
    isLock?: boolean
}