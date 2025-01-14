

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


