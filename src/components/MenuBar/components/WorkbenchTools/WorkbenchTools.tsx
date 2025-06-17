import { CursorIcon, ProbeIcon } from "@/icons";
import { Button, Tooltip } from "antd";
import styles from "./styles.module.css";
import { useWorkbenchTools } from "@/store";

export function WorkbenchTools() {
	const workbenchTools = useWorkbenchTools((state) => state.workbenchTools);
	const setWorkbenchTools = useWorkbenchTools((state) => state.setWorkbenchTools);
	return (
		<div className={styles.workbenchTools}>
			<Tooltip title="Cursor">
				<Button
					type={workbenchTools === "cursor" ? "primary" : "text"}
					icon={<CursorIcon />}
					onClick={() => setWorkbenchTools("cursor")}
				/>
			</Tooltip>
			<Tooltip title="Probe">
				<Button
					type={workbenchTools === "probe" ? "primary" : "text"}
					icon={<ProbeIcon />}
					onClick={() => setWorkbenchTools("probe")}
				/>
			</Tooltip>
		</div>
	);
}
