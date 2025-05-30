import { Button, ConfigProvider, Divider, Switch, theme, Tooltip } from "antd";
import {
	DarkIcon,
	ExportIcon,
	FileIcon,
	FitZoomIcon,
	LightIcon,
	MenuIcon,
	MinusIcon,
	OpenFileIcon,
	PlusIcon,
	RedoIcon,
	ResetZoomIcon,
	SaveIcon,
	UndoIcon,
} from "@/icons";
import { useTheme } from "@/store";
import { useReactFlow } from "@xyflow/react";
import { useSettings } from "@/store";
import { KeyboardEvent } from "react";
import styles from "./styles.module.css";

interface MenubarProps {
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

export function MenuBar({ undo, redo, canUndo, canRedo }: MenubarProps) {
	const { currentTheme, setCurrentTheme } = useTheme();
	const viewPort = useSettings((state) => state.viewPort);
	const setViewPort = useSettings((state) => state.setViewPort);
	const setViewTools = useSettings((state) => state.setViewTools);
	const viewTools = useSettings((state) => state.viewTools);
	const { fitView } = useReactFlow();

	const handleZoom = (position: "in" | "out" | "reset" | "fit") => {
		const newZoom = viewPort.zoom;

		switch (position) {
			case "in":
				if (newZoom < 3) setViewPort({ x: 0, y: 0, zoom: newZoom + 0.1 });
				break;
			case "out":
				if (newZoom > 0.5)
					if (newZoom - 0.1 < 0.5) setViewPort({ x: 0, y: 0, zoom: 0.5 });
					else setViewPort({ x: 0, y: 0, zoom: newZoom - 0.1 });
				break;
			case "reset":
				setViewPort({ x: 0, y: 0, zoom: 1 });
				break;
			case "fit":
				fitView({ maxZoom: 2 });
				break;
			default:
				break;
		}
	};

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
		<div className={styles.menubar}>
			<ConfigProvider
				theme={{
					algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
				}}
			>
				<nav className={styles.menubarButtons}>
					<div className={styles.menubarButtonsGroup}>
						<Tooltip title="New File">
							<Button type="text" icon={<FileIcon />} onClick={() => console.log("New")} />
						</Tooltip>
						<Tooltip title="Open File">
							<Button type="text" icon={<OpenFileIcon />} onClick={() => console.log("Open")} />
						</Tooltip>
						<Tooltip title="Save File">
							<Button type="text" icon={<SaveIcon />} onClick={() => console.log("Save")} />
						</Tooltip>
						<Tooltip title="Export File">
							<Button type="text" icon={<ExportIcon />} onClick={() => console.log("Export")} />
						</Tooltip>
					</div>
					<Divider type="vertical" />
					<div className={styles.menubarButtonsGroup}>
						<Tooltip title="Undo">
							<Button type="text" icon={<UndoIcon />} disabled={!canUndo} onClick={undo} />
						</Tooltip>
						<Tooltip title="Redo">
							<Button type="text" icon={<RedoIcon />} disabled={!canRedo} onClick={redo} />
						</Tooltip>
					</div>
					<Divider type="vertical" />
					<div className={styles.menubarButtonsGroup}>
						<Tooltip title="Zoom In">
							<Button type="text" icon={<PlusIcon />} onClick={() => handleZoom("in")} />
						</Tooltip>
						<Tooltip title="Zoom Out">
							<Button type="text" icon={<MinusIcon />} onClick={() => handleZoom("out")} />
						</Tooltip>
						<Tooltip title="Reset Zoom">
							<Button type="text" icon={<ResetZoomIcon />} onClick={() => handleZoom("reset")} />
						</Tooltip>
						<Tooltip title="Fit View">
							<Button type="text" icon={<FitZoomIcon />} onClick={() => handleZoom("fit")} />
						</Tooltip>
					</div>
					<Divider type="vertical" />
					<div className={styles.switchContainer}>
						<Switch
							value={currentTheme === "light"}
							checkedChildren={<DarkIcon />}
							unCheckedChildren={<LightIcon />}
							onChange={handleChangeTheme}
						/>
						<Button type="text" icon={<MenuIcon />} onClick={() => setViewTools(!viewTools)} />
					</div>
				</nav>
			</ConfigProvider>
		</div>
	);
}
