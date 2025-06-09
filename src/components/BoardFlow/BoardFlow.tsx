/* eslint-disable react-hooks/exhaustive-deps */

import {
	Background,
	Connection,
	Edge,
	ReactFlow,
	useEdgesState,
	useNodesState,
	ConnectionMode,
	useReactFlow,
	reconnectEdge,
	OnNodeDrag,
	Viewport,
	SelectionMode,
	OnSelectionChangeFunc,
	OnSelectionChangeParams,
	OnEdgesChange,
	XYPosition,
} from "@xyflow/react";
import { DragEvent, useCallback, useRef, KeyboardEvent, useEffect } from "react";
import {
	ComponentEdge,
	AnalogNode,
	ComponentCollapsed,
	ComponentType,
	Categories,
	UnitsType,
} from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { AnalogComponent } from "@/components/ElectronicComponents/AnalogComponent/AnalogComponent";
import { Board } from "@/components/ElectronicComponents/Board/Board";
import { NodeComponent } from "@/components/ElectronicComponents/NodeComponent/NodeComponent";
import { TransistorComponent } from "@/components/ElectronicComponents/TransistorComponent/TransistorComponent";
import { MechanicalComponent } from "@/components/ElectronicComponents/MechanicalComponent/MechanicalComponent";
import { getComponentProperties, getNewPositionByOverlapping, isPointInBox } from "@/helpers";
import { ConfigProvider, theme } from "antd";
import { useHistory } from "@/contexts/HistoryContext";
import { ComponentsMap } from "@/constants/components";
import { useSelectedItemsState } from "@/hooks/useSelectedItemsState";
import { useSettings, useTheme } from "@/store";
import { SwitchSPDT } from "../ElectronicComponents/SwitchSPDT/SwitchSPDT";
import { SwitchDPST } from "../ElectronicComponents/SwitchDPST/SwitchDPST";
import { SwitchDPDT } from "../ElectronicComponents/SwitchDPDT/SwitchDPDT";
import { RelayDPST } from "../ElectronicComponents/RelayDPST/RelayDPST";
import { RelaySPDT } from "../ElectronicComponents/RelaySPDT/RelaySPDT";
import { RelayDPDT } from "../ElectronicComponents/RelayDPDT/RelayDPDT";
import { RelaySPST } from "../ElectronicComponents/RelaySPST/RelaySPST";
import { LogicGate } from "../ElectronicComponents/LogicGate/LogicGate";
import { PowerSupply } from "../ElectronicComponents/PowerSupply/PowerSupply";
import { Battery } from "../ElectronicComponents/Battery/Battery";
import { MenuBar } from "../MenuBar/MenuBar";
import { SideTools } from "../SideTools/SideTools";

const initialNodes: AnalogNode[] = [
	{
		id: "BAT-9510b9ee-e78f-42fc-8831-f4fd47fedb27",
		type: "battery",
		position: {
			x: 70,
			y: 370,
		},
		data: {
			name: "Battery",
			type: ComponentType.Battery,
			category: Categories["Power & Supply"],
			value: 12,
			isLock: false,
			rotation: 270,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.VoltageDC,
			prefix: "V",
			has_properties: true,
			designator: "BAT1",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "negative",
				},
				{
					isConnected: true,
					type: "positive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
	},
	{
		id: "R-60595347-b9ad-4e1d-b94b-cbd6b17907cd",
		type: "analogComponent",
		position: {
			x: 170,
			y: 570,
		},
		data: {
			name: "Resistor",
			type: ComponentType.Resistor,
			category: Categories.Resistors,
			value: 330,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Ohm,
			prefix: "Ω",
			has_properties: true,
			designator: "R1",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "LED-bf62c0de-11a2-4a57-839f-1a6c6772b176",
		type: "analogComponent",
		position: {
			x: 270,
			y: 370,
		},
		data: {
			name: "LED",
			type: ComponentType.Led,
			category: Categories.Diodes,
			value: 30,
			isLock: false,
			rotation: 90,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Current,
			prefix: "µA",
			has_properties: true,
			designator: "LED1",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "positive",
				},
				{
					isConnected: true,
					type: "negative",
				},
			],
			color: "#FF0000",
			size: "small",
			value_optional: 1.7,
			unit_optional: UnitsType.VoltageDC,
			prefix_optional: "V",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
	},
	{
		id: "LED-d7c5c05e-d39b-4ba8-a4f2-80002718d0fe",
		type: "analogComponent",
		position: {
			x: 470,
			y: 370,
		},
		data: {
			name: "LED",
			type: ComponentType.Led,
			category: Categories.Diodes,
			value: 30,
			isLock: false,
			rotation: 90,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Current,
			prefix: "µA",
			has_properties: true,
			designator: "LED2",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "positive",
				},
				{
					isConnected: true,
					type: "negative",
				},
			],
			color: "#FF0000",
			size: "small",
			value_optional: 1.7,
			unit_optional: UnitsType.VoltageDC,
			prefix_optional: "V",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "LED-8e26a852-e938-4b11-a90d-33f91399e55e",
		type: "analogComponent",
		position: {
			x: 670,
			y: 370,
		},
		data: {
			name: "LED",
			type: ComponentType.Led,
			category: Categories.Diodes,
			value: 30,
			isLock: false,
			rotation: 90,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Current,
			prefix: "µA",
			has_properties: true,
			designator: "LED3",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "positive",
				},
				{
					isConnected: true,
					type: "negative",
				},
			],
			color: "#FF0000",
			size: "small",
			value_optional: 1.7,
			unit_optional: UnitsType.VoltageDC,
			prefix_optional: "V",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
	},
	{
		id: "LED-9e93506b-54cc-4f96-a77b-a0503de49e4d",
		type: "analogComponent",
		position: {
			x: 870,
			y: 370,
		},
		data: {
			name: "LED",
			type: ComponentType.Led,
			category: Categories.Diodes,
			value: 30,
			isLock: false,
			rotation: 90,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Current,
			prefix: "µA",
			has_properties: true,
			designator: "LED4",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "positive",
				},
				{
					isConnected: true,
					type: "negative",
				},
			],
			color: "#FF0000",
			size: "small",
			value_optional: 1.7,
			unit_optional: UnitsType.VoltageDC,
			prefix_optional: "V",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "SW-70c15e67-4a12-4c8a-8d9d-41dae008a19b",
		type: "mechanicalComponent",
		position: {
			x: 170,
			y: 170,
		},
		data: {
			name: "SPST Switch",
			type: ComponentType.SwitchSPST,
			category: Categories["Switches & Relays"],
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			state: {
				on: false,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: true,
			designator: "SW1",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: true,
		dragging: false,
	},
	{
		id: "SW-7acf74e7-1035-4341-8e73-70f12995e299",
		type: "mechanicalComponent",
		position: {
			x: 370,
			y: 170,
		},
		data: {
			name: "SPST Switch",
			type: ComponentType.SwitchSPST,
			category: Categories["Switches & Relays"],
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			state: {
				on: false,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: true,
			designator: "SW2",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "SW-af0e8d6f-496b-4394-ab78-8d5ddb585345",
		type: "mechanicalComponent",
		position: {
			x: 570,
			y: 170,
		},
		data: {
			name: "SPST Switch",
			type: ComponentType.SwitchSPST,
			category: Categories["Switches & Relays"],
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			state: {
				on: false,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: true,
			designator: "SW3",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
	},
	{
		id: "SW-983cd6bf-fd4d-471c-b22f-a83953de263e",
		type: "mechanicalComponent",
		position: {
			x: 770,
			y: 170,
		},
		data: {
			name: "SPST Switch",
			type: ComponentType.SwitchSPST,
			category: Categories["Switches & Relays"],
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			state: {
				on: false,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: true,
			designator: "SW4",
			isDesignatorVisible: true,
			isValueVisible: true,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 60,
			height: 60,
		},
	},
	{
		id: "N-5aef6841-855f-42af-8361-3567b4b9115e",
		type: "nodeComponent",
		position: {
			x: 290,
			y: 190,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N1",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "N-652b8b06-64bd-4340-9539-5a6e55981900",
		type: "nodeComponent",
		position: {
			x: 490,
			y: 190,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N2",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "N-706583e1-31bf-4fc4-8d16-c3b042008440",
		type: "nodeComponent",
		position: {
			x: 690,
			y: 190,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N3",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
	},
	{
		id: "N-493d2b5b-2134-4cc1-959f-7184c322a6a0",
		type: "nodeComponent",
		position: {
			x: 690,
			y: 590,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N4",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
	},
	{
		id: "N-041818b0-14db-4ca5-8576-90fbf7996b4d",
		type: "nodeComponent",
		position: {
			x: 490,
			y: 590,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N5",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
		selected: false,
		dragging: false,
	},
	{
		id: "N-6fdb5d00-d704-4aba-9be5-77ee35705c2b",
		type: "nodeComponent",
		position: {
			x: 290,
			y: 590,
		},
		data: {
			name: "Node",
			type: ComponentType.Node,
			category: Categories.Structure,
			value: 0,
			isLock: false,
			rotation: 0,
			flip: {
				x: 1,
				y: 1,
			},
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N6",
			isDesignatorVisible: false,
			isValueVisible: false,
			connectedHandles: [
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
				{
					isConnected: false,
					type: "passive",
				},
				{
					isConnected: true,
					type: "passive",
				},
			],
			color: "var(--foreground-color)",
			size: "small",
			collapsed: ComponentCollapsed.Undefined,
		},
		measured: {
			width: 20,
			height: 20,
		},
	},
];

export const initialEdges: ComponentEdge[] = [
	{
		type: "wire",
		source: "SW-983cd6bf-fd4d-471c-b22f-a83953de263e",
		sourceHandle: "2",
		target: "LED-9e93506b-54cc-4f96-a77b-a0503de49e4d",
		targetHandle: "1",
		id: "8d3e7dc1-58ce-4678-af48-efca9410893d",
		data: {
			color: "var(--foreground-color)",
			path: "", // React Flow calcula esto
			flowDirection: undefined, // Valor predeterminado a 'forward'
			voltage: 0, // Valor predeterminado a 0
			current: 0, // Valor predeterminado a 0
		},
	},
	{
		type: "wire",
		source: "BAT-9510b9ee-e78f-42fc-8831-f4fd47fedb27",
		sourceHandle: "2",
		target: "SW-70c15e67-4a12-4c8a-8d9d-41dae008a19b",
		targetHandle: "1",
		id: "62887ee1-5782-414d-9653-b1d5b8ff1bb2",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "R-60595347-b9ad-4e1d-b94b-cbd6b17907cd",
		sourceHandle: "1",
		target: "BAT-9510b9ee-e78f-42fc-8831-f4fd47fedb27",
		targetHandle: "1",
		id: "064bafac-9154-452c-b03b-e4aa5e73414d",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "SW-70c15e67-4a12-4c8a-8d9d-41dae008a19b",
		sourceHandle: "2",
		target: "N-5aef6841-855f-42af-8361-3567b4b9115e",
		targetHandle: "4",
		id: "8a1ec57e-06f3-4b0a-8588-fd8667ddcb37",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "LED-bf62c0de-11a2-4a57-839f-1a6c6772b176",
		sourceHandle: "1",
		target: "N-5aef6841-855f-42af-8361-3567b4b9115e",
		targetHandle: "3",
		id: "7500cfb8-766a-44ed-a4ce-5fb88abcea9d",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "LED-bf62c0de-11a2-4a57-839f-1a6c6772b176",
		sourceHandle: "2",
		target: "N-6fdb5d00-d704-4aba-9be5-77ee35705c2b",
		targetHandle: "1",
		id: "594c5efd-c385-433f-b850-e6e0531b7019",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-6fdb5d00-d704-4aba-9be5-77ee35705c2b",
		sourceHandle: "4",
		target: "R-60595347-b9ad-4e1d-b94b-cbd6b17907cd",
		targetHandle: "2",
		id: "a702272f-2a8e-4077-8bb4-67b48c311afb",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "SW-7acf74e7-1035-4341-8e73-70f12995e299",
		sourceHandle: "2",
		target: "N-652b8b06-64bd-4340-9539-5a6e55981900",
		targetHandle: "4",
		id: "75671c71-c110-4b23-84b3-11a99f0a1f4e",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-652b8b06-64bd-4340-9539-5a6e55981900",
		sourceHandle: "2",
		target: "SW-af0e8d6f-496b-4394-ab78-8d5ddb585345",
		targetHandle: "1",
		id: "ad96916f-b913-438b-a163-262ed0b6980b",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "SW-af0e8d6f-496b-4394-ab78-8d5ddb585345",
		sourceHandle: "2",
		target: "N-706583e1-31bf-4fc4-8d16-c3b042008440",
		targetHandle: "4",
		id: "83c3118c-c181-4941-a244-505cd4fca85b",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-706583e1-31bf-4fc4-8d16-c3b042008440",
		sourceHandle: "2",
		target: "SW-983cd6bf-fd4d-471c-b22f-a83953de263e",
		targetHandle: "1",
		id: "d23118ab-beb1-4e0e-9cfe-df2372856118",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "SW-7acf74e7-1035-4341-8e73-70f12995e299",
		sourceHandle: "1",
		target: "N-5aef6841-855f-42af-8361-3567b4b9115e",
		targetHandle: "2",
		id: "060bb9f9-7c47-4bcb-92e4-1b2adc03a4fb",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-041818b0-14db-4ca5-8576-90fbf7996b4d",
		sourceHandle: "4",
		target: "N-6fdb5d00-d704-4aba-9be5-77ee35705c2b",
		targetHandle: "2",
		id: "644d7f26-8893-4e95-91a0-a308652baaa9",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-041818b0-14db-4ca5-8576-90fbf7996b4d",
		sourceHandle: "2",
		target: "N-493d2b5b-2134-4cc1-959f-7184c322a6a0",
		targetHandle: "4",
		id: "9e6cf560-81b8-4ef9-a25a-8528afff4c33",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-493d2b5b-2134-4cc1-959f-7184c322a6a0",
		sourceHandle: "1",
		target: "LED-8e26a852-e938-4b11-a90d-33f91399e55e",
		targetHandle: "2",
		id: "acb851ac-fe2f-4934-96b8-4934bae8912a",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "LED-d7c5c05e-d39b-4ba8-a4f2-80002718d0fe",
		sourceHandle: "2",
		target: "N-041818b0-14db-4ca5-8576-90fbf7996b4d",
		targetHandle: "1",
		id: "f928995a-2920-4bf4-b2d7-574eefbc9185",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-652b8b06-64bd-4340-9539-5a6e55981900",
		sourceHandle: "3",
		target: "LED-d7c5c05e-d39b-4ba8-a4f2-80002718d0fe",
		targetHandle: "1",
		id: "a02f6192-e419-4eec-a5af-7bada7716c44",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "N-706583e1-31bf-4fc4-8d16-c3b042008440",
		sourceHandle: "3",
		target: "LED-8e26a852-e938-4b11-a90d-33f91399e55e",
		targetHandle: "1",
		id: "683232e2-e0b6-43c8-9b57-f8276c820ed8",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
	{
		type: "wire",
		source: "LED-9e93506b-54cc-4f96-a77b-a0503de49e4d",
		sourceHandle: "2",
		target: "N-493d2b5b-2134-4cc1-959f-7184c322a6a0",
		targetHandle: "2",
		id: "8e625983-c9ec-4b1c-847e-a836e9d9463d",
		data: {
			color: "var(--foreground-color)",
			path: "",
			flowDirection: undefined,
			voltage: 0,
			current: 0,
		},
	},
];

const nodeTypes = {
	analogComponent: AnalogComponent,
	nodeComponent: NodeComponent,
	transistorComponent: TransistorComponent,
	mechanicalComponent: MechanicalComponent,
	board: Board,
	switchSPDT: SwitchSPDT,
	switchDPST: SwitchDPST,
	switchDPDT: SwitchDPDT,
	relaySPST: RelaySPST,
	relayDPST: RelayDPST,
	relaySPDT: RelaySPDT,
	relayDPDT: RelayDPDT,
	logicGate: LogicGate,
	powerSupply: PowerSupply,
	battery: Battery,
};

const edgeTypes = {
	wire: Wire,
	custom: Wire,
};

const GRID_SIZE = 10;
export function BoardFlow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<ComponentEdge>(initialEdges);
	const currentGridType = useSettings((state) => state.currentGridType);
	const setActiveTab = useSettings((state) => state.setActiveTab);
	const setViewPort = useSettings((state) => state.setViewPort);
	const viewPort = useSettings((state) => state.viewPort);
	const viewTools = useSettings((state) => state.viewTools);
	const dragOutsideRef = useRef<ComponentType | null>(null);
	const edgeReconnectSuccessful = useRef(false);
	const overlappingNodeRef = useRef<AnalogNode | null>(null);
	const { screenToFlowPosition, getIntersectingNodes, updateNode } = useReactFlow();
	const { addNode, addEdge, removeEdge, recordNodeMove } = useHistory();
	const nodeSelection = useRef<AnalogNode | null>(null);
	const nodeBeingDragged = useRef<AnalogNode | null>(null);
	const { currentTheme } = useTheme();
	const {
		selectedNode,
		setSelectedNode,
		setSelectedNodes,
		selectedEdge,
		setSelectedEdge,
		setSelectedEdges,
		setIsSingleNodeSelection,
		setIsSingleEdgeSelection,
	} = useSelectedItemsState();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", currentTheme);
	}, []);

	const onConnect = useCallback(
		(connection: Connection) => {
			const edge = {
				...connection,
				id: uuid(),
				data: {
					color:
						nodes.find((node) => node.id === connection.target)?.data.color ||
						nodes.find((node) => node.id === connection.source)?.data.color ||
						"var(--foreground-color)",
				},
			};
			addEdge(edge);
		},
		[addEdge]
	);

	const isConnectionValid = (connection: Edge | Connection) => {
		const { source, target } = connection;
		if (source === target) return false;
		return true;
	};

	const handleOnDragover = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const type = dragOutsideRef.current;
		if (!type) return;
		let position = screenToFlowPosition({
			x: e.clientX - 30,
			y: e.clientY - 30,
		});

		const boards = nodes?.filter((node) => node.type === ComponentType.Board);
		const board = boards.find((board) => {
			return isPointInBox(
				{ x: position.x, y: position.y },
				{
					x: board.position?.x || 0,
					y: board?.position?.y || 0,
					height: board?.measured?.height || 0,
					width: board?.measured?.width || 0,
				}
			);
		});

		if (board) {
			const { x, y } = board?.position || {
				x: 0,
				y: 0,
			};
			const { x: dragX, y: dragY } = position || {
				x: 0,
				y: 0,
			};
			position = { x: dragX - x, y: dragY - y };
		}

		let node: AnalogNode | undefined;

		const {
			value,
			unit,
			prefix,
			designator,
			type: typeComponent,
			has_properties,
			isDesignatorVisible,
			isValueVisible,
			connectedHandles,
			color,
			style,
			size,
			name,
			category,
			collapsed,
			state,
			value_optional,
			unit_optional,
			prefix_optional,
			isValueOptionalVisible,
		} = getComponentProperties(type, nodes);
		if ((type as ComponentType) && Object.keys(ComponentsMap).includes(type)) {
			node = {
				id: `${designator.replace(/\d+/g, "")}-${uuid()}`,
				type: typeComponent,
				position,
				data: {
					name,
					type,
					category,
					value,
					isLock: false,
					rotation: 0,
					flip: { x: 1, y: 1 },
					collapsed,
					state,
					unit,
					prefix,
					has_properties,
					designator,
					isDesignatorVisible,
					isValueVisible,
					connectedHandles: connectedHandles.map((handles) => ({ ...handles })),
					color,
					size,
					value_optional,
					unit_optional,
					prefix_optional,
					isValueOptionalVisible,
				},
				parentId: board?.id,
				style,
			};
		}
		if (node) {
			addNode(node);
		}
	};

	const handleOnNodeDragStart = (_e: React.MouseEvent<Element>, node: AnalogNode) => {
		setActiveTab("properties");
		nodeBeingDragged.current = JSON.parse(JSON.stringify(node));
		setSelectedNode(node);
	};

	const handleNodeClick = (_e: React.MouseEvent<Element>, node: AnalogNode) => {
		nodeSelection.current = node;
		setSelectedNode(node);
		setSelectedEdge(undefined);
		setActiveTab("properties");
		console.log(node.id);
	};

	const handlePaneClick = () => {
		setSelectedNode(undefined);
		setSelectedEdge(undefined);
		setActiveTab("components");
	};

	const handleOnEdgeClick = (e: React.MouseEvent<Element, MouseEvent>, edge: ComponentEdge) => {
		e.preventDefault();
		console.log(edge.id);
		setSelectedEdge(edge);
		setSelectedNode(undefined);
		setActiveTab("properties");
	};

	const handleReconnectStart = () => {
		edgeReconnectSuccessful.current = false;
	};

	const handleReconnect = (oldEdge: ComponentEdge, newConnection: Connection) => {
		edgeReconnectSuccessful.current = true;
		const oldNode = nodes.find((node) => node.id === oldEdge.target);
		const newNode = nodes.find((node) => node.id === newConnection.target);
		if (oldNode && newNode) {
			const newHandlesStateOldNode = [...oldNode?.data.connectedHandles];
			const newHandlesStateNewNode = [...newNode?.data.connectedHandles];
			newHandlesStateOldNode[Number(oldEdge.targetHandle) - 1].isConnected = false;
			newHandlesStateNewNode[Number(newConnection.targetHandle) - 1].isConnected = true;

			updateNode(oldNode?.id, (prevNode) => ({
				data: {
					...prevNode.data,
					connectedHandles: [...newHandlesStateOldNode],
				},
			}));
			updateNode(newConnection.target, (prevNode) => ({
				data: {
					...prevNode.data,
					connectedHandles: [...newHandlesStateNewNode],
				},
			}));
		}
		setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
	};

	const handleReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
		if (!edgeReconnectSuccessful.current) {
			removeEdge([edge]);
		}
	};

	const handleOnEdgesChanges: OnEdgesChange<ComponentEdge> = (changes) => {
		onEdgesChange(changes);
	};

	const handleOnNodeDrag: OnNodeDrag<AnalogNode> = (e, dragNode) => {
		e.preventDefault();
		// Encontrar nodos superpuestos
		const overlappingNode = getIntersectingNodes(dragNode)?.[0];
		overlappingNodeRef.current = overlappingNode as AnalogNode;

		// Actualizar nodos y su posición ajustada

		setNodes((prevNodes) =>
			prevNodes.map((node) => {
				if (node.id === dragNode.id) {
					return {
						...node,
						position: {
							x: dragNode.position.x,
							y: dragNode.position.y,
						},
						data: {
							...node.data,
							collapsed:
								overlappingNode &&
								Object.keys(ComponentsMap).includes(overlappingNode?.data?.type as ComponentType)
									? overlappingNode.data.type !== ComponentType.Board
										? ComponentCollapsed.NotAdd
										: undefined
									: undefined,
						},
					};
				}
				return node;
			})
		);
	};

	const handleNodeDragStop: OnNodeDrag<AnalogNode> = (_e, dragNode) => {
		if (nodeBeingDragged.current) {
			const oldNode = nodeBeingDragged.current;
			// ¡CRÍTICO! Obtén una COPIA PROFUNDA del nodo con su posición final.
			const updatedNode = JSON.parse(JSON.stringify(dragNode));

			// Llama a recordNodeMove para registrar el cambio en el historial
			// Solo si la posición realmente cambió
			if (
				oldNode.position.x !== updatedNode.position.x ||
				oldNode.position.y !== updatedNode.position.y
			) {
				recordNodeMove(oldNode, updatedNode);
			}
			nodeBeingDragged.current = null; // Limpia la referencia
		}
		if (
			!overlappingNodeRef.current ||
			(overlappingNodeRef?.current?.type !== ComponentType.Board && dragNode?.parentId)
		) {
			setNodes((prevNodes) => {
				const board = prevNodes?.find((prevNode) => prevNode.id === dragNode?.parentId);

				return prevNodes.map((node) => {
					if (node.id === dragNode.id) {
						const { x, y } = board?.position || { x: 0, y: 0 };
						const { x: dragX, y: dragY } = dragNode?.position || {
							x: 0,
							y: 0,
						};

						return {
							...node,
							position: { x: dragX + x, y: dragY + y },
							parentId: undefined,
						};
					}
					return node;
				});
			});
		}
		const typeComponent = overlappingNodeRef?.current?.data?.type as ComponentType;

		if (
			Object.keys(ComponentsMap).includes(typeComponent) &&
			selectedNode?.data.type !== ComponentType.Board &&
			typeComponent !== ComponentType.Board
		) {
			const newPosition = getNewPositionByOverlapping(
				dragNode.position,
				overlappingNodeRef?.current?.position as XYPosition
			);
			setNodes((prevNodes) =>
				prevNodes.map((node) => {
					if (node.id === dragNode?.id) {
						return {
							...node,
							position: newPosition,
							data: {
								...node?.data,
								collapsed: ComponentCollapsed.Undefined,
							},
						};
					}
					return node;
				})
			);
		}

		if (
			overlappingNodeRef?.current?.type === ComponentType.Board &&
			selectedNode?.data.type !== ComponentType.Board
		) {
			setNodes((prevNodes) => [
				overlappingNodeRef?.current as AnalogNode,
				...prevNodes
					.filter((node) => node.id !== overlappingNodeRef?.current?.id)
					.map((node) => {
						if (node.id === dragNode?.id) {
							const { x, y } = overlappingNodeRef?.current?.position || {
								x: 0,
								y: 0,
							};
							const { x: dragX, y: dragY } = dragNode?.position || {
								x: 0,
								y: 0,
							};

							let position;
							if (!node.parentId) {
								position = { x: dragX - x, y: dragY - y };
							} else if (node.parentId && node?.parentId !== overlappingNodeRef?.current?.id) {
								const prevBoard = prevNodes?.find((node) => node?.id === dragNode?.parentId);
								const { x: prevBoardX, y: prevBoardY } = prevBoard?.position || {
									x: 0,
									y: 0,
								};
								position = {
									x: dragX + prevBoardX - x,
									y: dragY + prevBoardY - y,
								};
							}

							return {
								...node,
								parentId: overlappingNodeRef?.current?.id,
								...((!dragNode?.parentId ||
									dragNode?.parentId !== overlappingNodeRef?.current?.id) && {
									position,
								}),
							};
						}
						return node;
					}),
			]);
		}
	};

	const handleOnSelectionChange: OnSelectionChangeFunc = (params: OnSelectionChangeParams) => {
		const numberNodes = params.nodes.length;
		const numberEdges = params.edges.length;
		const isUniqueNode = numberNodes === 1;
		const isUniqueEdge = numberEdges === 1;
		setIsSingleNodeSelection(isUniqueNode);
		setIsSingleEdgeSelection(isUniqueEdge);
		if (isUniqueNode) setSelectedNode(params.nodes[0] as AnalogNode);
		if (isUniqueEdge) setSelectedEdge(params.edges[0] as ComponentEdge);
		setSelectedNodes(params.nodes as AnalogNode[]);
		setSelectedEdges(params.edges as ComponentEdge[]);
	};

	const handleChangeViewPort = (viewport: Viewport) => {
		setViewPort(viewport);
	};

	const handleSelectionEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
		e.preventDefault();
		if (selectedNode || selectedEdge) {
			setActiveTab("properties");
		} else {
			setActiveTab("components");
		}
	};

	const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const movement = {
			ArrowUp: { dx: 0, dy: -GRID_SIZE / 2 + 5 },
			ArrowDown: { dx: 0, dy: GRID_SIZE / 2 - 5 },
			ArrowLeft: { dx: -GRID_SIZE / 2 + 5, dy: 0 },
			ArrowRight: { dx: GRID_SIZE / 2 - 5, dy: 0 },
		}[e.key];

		if (movement) {
			setNodes((currentNodes) =>
				currentNodes.map((node) => {
					if (node.selected) {
						return {
							...node,
							position: {
								x: node.position.x + movement.dx,
								y: node.position.y + movement.dy,
							},
						};
					}
					return node;
				})
			);
		}
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			<div className={styles.board}>
				<MenuBar />
				<div className={`${styles.flow} ${viewTools ? "" : styles.flow_hidden}`}>
					<ReactFlow
						defaultEdgeOptions={{ type: "wire" }}
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={handleOnEdgesChanges}
						onConnect={onConnect}
						connectionMode={ConnectionMode.Loose}
						nodeTypes={nodeTypes}
						edgeTypes={edgeTypes}
						connectionLineComponent={ConnectionLine}
						isValidConnection={isConnectionValid}
						onDragOver={handleOnDragover}
						onDrop={handleOnDrop}
						onNodeDragStart={handleOnNodeDragStart}
						onEdgeClick={handleOnEdgeClick}
						onNodeClick={handleNodeClick}
						onPaneClick={handlePaneClick}
						onReconnectStart={handleReconnectStart}
						onReconnect={handleReconnect}
						onReconnectEnd={handleReconnectEnd}
						onNodeDrag={handleOnNodeDrag}
						onNodeDragStop={handleNodeDragStop}
						viewport={viewPort}
						onViewportChange={handleChangeViewPort}
						panOnScroll
						maxZoom={25}
						minZoom={0.5}
						zoomOnPinch
						selectionOnDrag
						onSelectionChange={handleOnSelectionChange}
						onSelectionEnd={handleSelectionEnd}
						snapGrid={[GRID_SIZE, GRID_SIZE]}
						snapToGrid
						panOnDrag={[1, 2]}
						selectNodesOnDrag
						selectionMode={SelectionMode.Partial}
						onKeyDown={handleOnKeyDown}
					>
						<Background
							color={"var(--grid-small-color)"}
							gap={GRID_SIZE}
							variant={currentGridType}
							id="1"
							size={1.5}
						/>
						<Background
							color={"var(--grid-large-color)"}
							gap={GRID_SIZE * 10}
							variant={currentGridType}
							id="2"
						/>
						<svg>
							<defs>
								<marker
									id="head"
									orient="auto"
									markerWidth="5"
									markerHeight="3"
									refX="0.1"
									refY="1.5"
								>
									<path d="M 0 0 V 3 L 5 1.5 Z" fill="var(--foreground-color)" />
								</marker>
							</defs>
							<defs>
								<marker
									id="headTwo"
									orient="auto"
									markerWidth="3.5"
									markerHeight="5"
									refX="0"
									refY="2.5"
								>
									<path d="M 0 0 V 5 L 3.5 2.5 Z" fill="var(--foreground-color)" />
								</marker>
							</defs>
						</svg>
					</ReactFlow>
				</div>
				<SideTools dragOutsideRef={dragOutsideRef} />
			</div>
		</ConfigProvider>
	);
}
