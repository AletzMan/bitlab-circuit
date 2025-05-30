import { AnalogNode, ComponentEdge } from "@/types";
import { BackgroundVariant, Viewport } from "@xyflow/react";
import { theme } from "antd";
import {} from "antd/lib/theme/interface/maps";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const themeApp = (s: boolean) => (s ? theme.darkAlgorithm : theme.defaultAlgorithm);

interface IThemeApp {
	currentTheme: "dark" | "light";
	setCurrentTheme: (value: "dark" | "light") => void;
}

export const useTheme = create(
	persist<IThemeApp>(
		(set) => ({
			currentTheme: "dark",
			setCurrentTheme: (value: "dark" | "light") =>
				set(() => ({
					currentTheme: value,
				})),
		}),
		{ name: "themeBitLabCircuit" }
	)
);

interface INodeSelected {
	selectedNode: AnalogNode | undefined;
	setSelectedNode: (value: AnalogNode | undefined) => void;
	selectedNodes: AnalogNode[] | undefined;
	setSelectedNodes: (value: AnalogNode[] | undefined) => void;
	selectedEdge: ComponentEdge | undefined;
	setSelectedEdge: (value: ComponentEdge | undefined) => void;
	selectedEdges: ComponentEdge[];
	setSelectedEdges: (value: ComponentEdge[]) => void;
	isSingleNodeSelection: boolean;
	setIsSingleNodeSelection: (value: boolean) => void;
	isSingleEdgeSelection: boolean;
	setIsSingleEdgeSelection: (value: boolean) => void;
}

export const useSelectedItems = create<INodeSelected>((set) => ({
	selectedNode: undefined,
	setSelectedNode: (value: AnalogNode | undefined) =>
		set(() => ({
			selectedNode: value,
		})),
	selectedNodes: undefined,
	setSelectedNodes: (value: AnalogNode[] | undefined) =>
		set(() => ({
			selectedNodes: value,
		})),
	selectedEdge: undefined,
	setSelectedEdge: (value: ComponentEdge | undefined) =>
		set(() => ({
			selectedEdge: value,
		})),
	selectedEdges: [],
	setSelectedEdges: (value: ComponentEdge[]) =>
		set(() => ({
			selectedEdges: value,
		})),
	isSingleNodeSelection: false,
	setIsSingleNodeSelection: (value: boolean) =>
		set(() => ({
			isSingleNodeSelection: value,
		})),
	isSingleEdgeSelection: false,
	setIsSingleEdgeSelection: (value: boolean) =>
		set(() => ({
			isSingleEdgeSelection: value,
		})),
}));

interface ISettings {
	currentGridType: BackgroundVariant;
	setCurrentGridType: (value: BackgroundVariant) => void;
	viewPort: Viewport;
	setViewPort: (value: Viewport) => void;
	activeTab: string;
	setActiveTab: (value: string) => void;
	viewTools: boolean;
	setViewTools: (value: boolean) => void;
}

export const useSettings = create<ISettings>((set) => ({
	currentGridType: BackgroundVariant.Lines,
	setCurrentGridType: (value: BackgroundVariant) =>
		set(() => ({
			currentGridType: value,
		})),
	viewPort: { x: 0, y: 0, zoom: 1 },
	setViewPort: (value: Viewport) =>
		set(() => ({
			viewPort: value,
		})),
	activeTab: "components",
	setActiveTab: (value: string) =>
		set(() => ({
			activeTab: value,
		})),
	viewTools: true,
	setViewTools: (value: boolean) =>
		set(() => ({
			viewTools: value,
		})),
}));
