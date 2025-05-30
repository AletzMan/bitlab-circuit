import { Button, Collapse, Divider, Flex, Tabs, Tooltip } from "antd";
import { DragEvent } from "react";
import { ComponentsMap } from "@/constants/components";
import { MiniMap, useEdgesState } from "@xyflow/react";
import styles from "./styles.module.css";
import { useSelectedItemsState } from "@/hooks/useSelectedItemsState";
import { ComponentProperties } from "../ComponentProperties/ComponentProperties";
import EdgeDetails from "../EdgeDetails/EdgeDetails";
import { ComponentEdge, ComponentType } from "@/types";
import { getImageBackgroundDrag } from "@/helpers";
import { groupByToArray } from "@/helpers";
import useHistoryManager from "@/hooks/useHistoryManager";
import { useSettings } from "@/store";

interface SideToolsProps {
	duplicateComponents: () => void;
	dragOutsideRef: React.MutableRefObject<ComponentType | null>;
}

export function SideTools({ duplicateComponents, dragOutsideRef }: SideToolsProps) {
	const { selectedNode, selectedNodes, selectedEdge, selectedEdges } = useSelectedItemsState();
	const [, setEdges] = useEdgesState<ComponentEdge>([]);
	const { removeEdge } = useHistoryManager();
	const activeTab = useSettings((state) => state.activeTab);
	const setActiveTab = useSettings((state) => state.setActiveTab);
	const viewTools = useSettings((state) => state.viewTools);

	const handleOnDragStart = (e: DragEvent<HTMLElement>, type: ComponentType) => {
		const imageBackgroundDrag = getImageBackgroundDrag(type);
		e.dataTransfer.setDragImage(imageBackgroundDrag, 30, 25);
		dragOutsideRef.current = type;
		e.dataTransfer.effectAllowed = "move";
	};

	const handleOnChangeTab = (activeKey: string) => {
		setActiveTab(activeKey);
	};

	return (
		<div className={styles.containerTabs}>
			<Tabs
				className={`${styles.tabs} ${viewTools ? styles["tabs_view"] : styles["tabs_hidden"]}`}
				type="card"
				size="small"
				items={[
					{
						label: "Design",
						key: "components",
						children: (
							<Collapse
								className={styles.divider}
								size="small"
								expandIconPosition="end"
								defaultActiveKey={["1"]}
								items={[
									{
										key: "1",
										label: "Components",
										showArrow: true,
										children: (
											<div className={styles.components}>
												{groupByToArray(Object.values(ComponentsMap), "category").map(
													(category) => (
														<div key={category.category} className={styles.components_container}>
															<label className={styles.label}>{category.category}</label>
															<Divider
																style={{
																	margin: "0",
																}}
																variant="dashed"
															/>
															<div className={styles.components_group}>
																{category.items.map((component) => (
																	<Tooltip
																		key={component.name}
																		placement="top"
																		title={component.name}
																		color="cyan"
																	>
																		<Button
																			className={styles.components_button}
																			color="default"
																			variant="filled"
																			draggable
																			onDragStart={(e) =>
																				handleOnDragStart(e, component.componentType)
																			}
																		>
																			{component.icon}
																		</Button>
																	</Tooltip>
																))}
															</div>
														</div>
													)
												)}
											</div>
										),
									},
									{
										key: "2",
										label: "Overview",
										showArrow: true,
										children: (
											<>
												<Flex className={styles.minimap} vertical>
													<MiniMap
														pannable
														style={{
															alignSelf: "center",
															justifySelf: "flex-end",
															position: "relative",
															bottom: 0,
														}}
													/>
												</Flex>
											</>
										),
									},
								]}
							></Collapse>
						),
					},
					{
						label: "Properties",
						key: "properties",
						children: (
							<div className={styles.details}>
								{selectedNode && selectedNodes!.length > 0 && (
									<ComponentProperties duplicateComponents={duplicateComponents} />
								)}
								{selectedEdge && selectedEdges?.length > 0 && (
									<EdgeDetails setEdges={setEdges} removeEdges={removeEdge} />
								)}
							</div>
						),
					},
				]}
				activeKey={activeTab}
				onChange={handleOnChangeTab}
			/>
		</div>
	);
}
