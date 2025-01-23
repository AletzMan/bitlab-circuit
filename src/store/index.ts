

import { AnalogNode, ComponentEdge } from "@/types";
import { theme } from "antd";
import { } from "antd/lib/theme/interface/maps";
import { create, } from "zustand";
import { persist } from "zustand/middleware";

export const themeApp = (s: boolean) => s ? theme.darkAlgorithm : theme.defaultAlgorithm;



interface IThemeApp {
    currentTheme: 'dark' | 'light'
    setCurrentTheme: (value: 'dark' | 'light') => void
}

export const useTheme = create(
    persist<IThemeApp>(
        (set) => ({
            currentTheme: 'dark',
            setCurrentTheme: (value: 'dark' | 'light') =>
                set(() => ({
                    currentTheme: value,
                })),
        }),
        { name: "themeBitLabCircuit" }
    )
);


interface INodeSelected {
    selectedNode: AnalogNode | undefined
    setSelectedNode: (value: AnalogNode | undefined) => void
    selectedNodes: AnalogNode[] | undefined
    setSelectedNodes: (value: AnalogNode[] | undefined) => void
    selectedEdge: ComponentEdge | undefined
    setSelectedEdge: (value: ComponentEdge | undefined) => void
    selectedEdges: ComponentEdge[]
    setSelectedEdges: (value: ComponentEdge[]) => void
    isSingleNodeSelection: boolean
    setIsSingleNodeSelection: (value: boolean) => void
    isSingleEdgeSelection: boolean
    setIsSingleEdgeSelection: (value: boolean) => void
}

export const useSelectedItems = create<INodeSelected>(
    (set) => ({
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
    })
);
