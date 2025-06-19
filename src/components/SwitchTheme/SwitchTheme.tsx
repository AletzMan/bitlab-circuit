import { Switch } from "antd";
import { DarkIcon, LightIcon } from "@/icons";
import { useTheme } from "@/store";
import { KeyboardEvent, useLayoutEffect } from "react";

export function SwitchTheme() {
	const currentTheme = useTheme((state) => state.currentTheme);
	const setCurrentTheme = useTheme((state) => state.setCurrentTheme);

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", currentTheme);
	}, []);

	const handleChangeTheme = (
		checked: boolean,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		const newTheme = checked ? "light" : "dark";
		setCurrentTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	return (
		<Switch
			value={currentTheme === "light"}
			checkedChildren={<DarkIcon />}
			unCheckedChildren={<LightIcon />}
			onChange={handleChangeTheme}
		/>
	);
}
