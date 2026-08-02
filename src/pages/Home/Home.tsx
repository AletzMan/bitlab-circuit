"use client";

import {
	GithubOutlined,
	RightOutlined,
	ExperimentOutlined
} from "@ant-design/icons";
import styles from "./styles.module.css";
import { Link } from "react-router";
import { ConfigProvider, theme } from "antd";
import {
	ResistorIcon,
	CapacitorIcon,
	DiodeIcon,
	BJTNPNIcon,
	InductorIcon,
	LEDIcon,
	GroundIcon,
	PotentiometerIcon,
} from "@/icons";

export function Home() {
	const components = [
		{ name: "Resistores", icon: <ResistorIcon />, description: "Valores fijos y variables", index: "01" },
		{ name: "Capacitores", icon: <CapacitorIcon />, description: "Cerámicos y electrolíticos", index: "02" },
		{ name: "Diodos", icon: <DiodeIcon />, description: "Rectificación y Zener", index: "03" },
		{ name: "Transistores", icon: <BJTNPNIcon />, description: "BJT y semiconductores base", index: "04" },
		{ name: "Inductores", icon: <InductorIcon />, description: "Bobinas estándar", index: "05" },
		{ name: "Ópticos", icon: <LEDIcon />, description: "Emisión de luz y displays", index: "06" },
		{ name: "Potenciómetros", icon: <PotentiometerIcon />, description: "Control resistivo dinámico", index: "07" },
		{ name: "Suministro", icon: <GroundIcon />, description: "Fuentes de poder y tierras", index: "08" },
	];

	const roadmapCompleted = [
		{ title: "Motor Analógico Base", description: "Simulación DC funcional y motor de renderizado de componentes.", date: "2025.Q2" },
		{ title: "Enrutamiento dinámico", description: "Conexión fluida de nodos con trazado inteligente en el canvas.", date: "2025.Q3" },
	];

	const roadmapUpcoming = [
		{ title: "Almacenamiento persistente", description: "Guardado local de proyectos y exportación de archivos.", date: "2026.Q3" },
		{ title: "Osciloscopio virtual", description: "Análisis gráfico para circuitos en corriente alterna.", date: "2026.Q4" },
	];

	return (
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<div className={styles.layout}>

				{/* Header */}
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<div className={styles.logo}>
							<ExperimentOutlined className={styles.logoIcon} style={{ fontSize: '20px' }} />
							<span className={styles.logoText}>BitLabCircuit</span>
						</div>
						<a href="https://github.com/AletzMan/bitlab-circuit" target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
							<GithubOutlined style={{ fontSize: '16px' }} />
							<span>GitHub</span>
						</a>
					</div>
				</header>

				<main>
					{/* Hero Directo y Honesto */}
					<section className={styles.heroSection}>
						<div className={styles.heroContainer}>
							<div className={styles.heroBadge}>
								Open Source Electronics Workbench
							</div>
							<h1 className={styles.heroTitle}>
								Diseño y simulación<br />de circuitos electrónicos.
							</h1>
							<p className={styles.heroDescription}>
								Herramienta web de código abierto para el prototipado visual de sistemas
								analógicos y digitales de forma limpia y directa.
							</p>
							<div className={styles.heroCta}>
								<Link to="/board" className={styles.primaryBtn}>
									Iniciar Entorno <RightOutlined />
								</Link>
								<div className={styles.heroStats}>
									<span className={styles.heroStat}><span className={styles.heroStatValue}>8</span> Tipos de componente</span>
									<span className={styles.heroStatDivider} />
									<span className={styles.heroStat}><span className={styles.heroStatValue}>DC</span> Solver activo</span>
									<span className={styles.heroStatDivider} />
									<span className={styles.heroStat}><span className={styles.heroStatValue}>v0.2</span> Alpha</span>
								</div>
							</div>
						</div>
					</section>

					{/* Vista Previa Principal del Canvas */}
					<section className={styles.previewSection}>
						<div className={styles.canvasPreview}>
							<div className={styles.canvasFrame}>
								<div className={styles.canvasHeaderBar}>
									<div className={styles.canvasDots}>
										<span className={styles.canvasDot} />
										<span className={styles.canvasDot} />
										<span className={styles.canvasDot} />
									</div>
									<span>workspace://bitlab-circuit/board</span>
									<span>[SIM_ACTIVE]</span>
								</div>
								<div className={styles.canvasBody}>
									{/* Schematic SVG */}
									<svg className={styles.schematicSvg} viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg">
										{/* Grid dots */}
										<defs>
											<pattern id="sgrid" width="24" height="24" patternUnits="userSpaceOnUse">
												<circle cx="12" cy="12" r="0.8" fill="rgba(56,189,248,0.12)" />
											</pattern>
										</defs>
										<rect width="800" height="360" fill="url(#sgrid)" />

										{/* Wire lines */}
										<g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.55">
											{/* Top rail */}
											<line x1="120" y1="100" x2="680" y2="100" />
											{/* Bottom rail */}
											<line x1="120" y1="260" x2="680" y2="260" />
											{/* Left vertical */}
											<line x1="120" y1="100" x2="120" y2="260" />
											{/* Right vertical */}
											<line x1="680" y1="100" x2="680" y2="260" />
											{/* Mid junction lines */}
											<line x1="280" y1="100" x2="280" y2="145" />
											<line x1="280" y1="215" x2="280" y2="260" />
											<line x1="480" y1="100" x2="480" y2="145" />
											<line x1="480" y1="215" x2="480" y2="260" />
										</g>

										{/* Resistor symbol at center-left */}
										<g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8">
											<rect x="240" y="148" width="80" height="24" rx="0" />
											<text x="280" y="143" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">R1</text>
											<text x="280" y="188" textAnchor="middle" fontSize="9" fill="rgba(56,189,248,0.7)" fontFamily="JetBrains Mono, monospace">10kΩ</text>
										</g>

										{/* Capacitor symbol at center-right */}
										<g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8">
											<line x1="480" y1="145" x2="480" y2="170" />
											<line x1="455" y1="170" x2="505" y2="170" />
											<line x1="455" y1="180" x2="505" y2="180" />
											<line x1="480" y1="180" x2="480" y2="215" />
											<text x="516" y="178" fontSize="9" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">C1</text>
											<text x="516" y="192" fontSize="9" fill="rgba(56,189,248,0.7)" fontFamily="JetBrains Mono, monospace">100μF</text>
										</g>

										{/* Voltage source left */}
										<g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8">
											<circle cx="120" cy="180" r="28" />
											<line x1="120" y1="157" x2="120" y2="168" />
											<line x1="114" y1="163" x2="126" y2="163" />
											<line x1="114" y1="197" x2="126" y2="197" />
											<text x="150" y="178" fontSize="9" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">Vs</text>
											<text x="150" y="192" fontSize="9" fill="rgba(56,189,248,0.7)" fontFamily="JetBrains Mono, monospace">5V DC</text>
										</g>

										{/* Node dots */}
										<g fill="#38bdf8" opacity="0.9">
											<circle cx="280" cy="100" r="3.5" />
											<circle cx="480" cy="100" r="3.5" />
											<circle cx="280" cy="260" r="3.5" />
											<circle cx="480" cy="260" r="3.5" />
										</g>

										{/* Voltage annotation */}
										<g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(56,189,248,0.5)">
											<text x="590" y="96">+5.00V</text>
											<text x="590" y="264">GND</text>
										</g>

										{/* Status label */}
										<text x="400" y="330" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(148,163,184,0.4)">// LIENZO DE TRABAJO ACTIVO — entorno interactivo de esquemáticos</text>
									</svg>
								</div>
							</div>
						</div>
					</section>

					{/* Sección 1: Prototipado Visual (Texto + Mockup de Producto) */}
					<section className={styles.splitSection}>
						<div className={styles.splitContent}>
							<span className={styles.sectionLabel}>// ENTORNO DE TRABAJO</span>
							<h2 className={styles.sectionTitle}>Diseño sin fricción en el canvas</h2>
							<p className={styles.heroDescription} style={{ fontSize: '16px', margin: '16px 0 24px 0' }}>
								Un lienzo de trabajo limpio diseñado específicamente para poner tus esquemáticos en el centro,
								eliminando barras de herramientas saturadas e interfaces invasivas.
							</p>
						</div>
						<div>
							<div className={styles.featureMockup}>
								<div className={styles.mockupHeader}>
									<span>canvas_interaction.tsx</span>
									<span>[DRAG & DROP]</span>
								</div>
								<div className={styles.mockupBody}>
									[Representación visual de nodos y terminales conectándose dinámicamente]
								</div>
							</div>
						</div>
					</section>

					{/* Sección 2: Simulación en Tiempo Real (Mockup de Producto + Texto) */}
					<section className={styles.splitSection}>
						<div>
							<div className={styles.featureMockup}>
								<div className={styles.mockupHeader}>
									<span>dc_solver_engine.js</span>
									<span>[STATUS: RUNNING]</span>
								</div>
								<div className={styles.mockupBody}>
									[Gráfica de validación de voltajes y corrientes instantáneas]
								</div>
							</div>
						</div>
						<div className={styles.splitContent}>
							<span className={styles.sectionLabel}>// MOTOR DE SIMULACIÓN</span>
							<h2 className={styles.sectionTitle}>Validación instantánea</h2>
							<p className={styles.heroDescription} style={{ fontSize: '16px', margin: '16px 0 24px 0' }}>
								Ejecuta análisis de corriente continua (DC) directamente en el navegador.
								Comprueba el comportamiento de los circuitos de forma inmediata al cambiar parámetros.
							</p>
						</div>
					</section>

					{/* Librería de Componentes */}
					<section className={styles.sectionWrapper}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionLabel}>// LIBRERÍA</span>
							<h2 className={styles.sectionTitle}>Componentes disponibles</h2>
						</div>

						<div className={styles.hybridGrid}>
							{components.map((component, index) => (
								<div key={index} className={styles.gridCell}>
									<span className={styles.cellIndex}>{component.index}</span>
									<div className={styles.cellIcon}>{component.icon}</div>
									<h5 className={styles.cellTitle}>{component.name}</h5>
									<p className={styles.cellDescription}>{component.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Roadmap / Estado del Proyecto */}
					<section className={styles.sectionWrapper}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionLabel}>// DESARROLLO</span>
							<h2 className={styles.sectionTitle}>Estado del proyecto</h2>
						</div>

						<div className={styles.roadmapGrid}>
							<div className={styles.roadmapColumn}>
								<h3 className={styles.cellTitle} style={{ marginBottom: '32px' }}>Implementado</h3>
								<div className={styles.roadmapList}>
									{roadmapCompleted.map((item, index) => (
										<div key={index} className={styles.roadmapItem} data-active="true">
											<div className={styles.roadmapItemHeader}>
												<h5 className={styles.roadmapItemTitle}>{item.title}</h5>
												<span className={styles.roadmapDate}>{item.date}</span>
											</div>
											<p className={styles.roadmapItemDesc}>{item.description}</p>
										</div>
									))}
								</div>
							</div>
							<div className={styles.roadmapColumn}>
								<h3 className={styles.cellTitle} style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Próximamente</h3>
								<div className={styles.roadmapList}>
									{roadmapUpcoming.map((item, index) => (
										<div key={index} className={styles.roadmapItem} data-active="false">
											<div className={styles.roadmapItemHeader}>
												<h5 className={styles.roadmapItemTitle}>{item.title}</h5>
												<span className={styles.roadmapDate}>{item.date}</span>
											</div>
											<p className={styles.roadmapItemDesc}>{item.description}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer className={styles.footer}>
					<div className={styles.footerContent}>
						<div className={styles.logo}>
							<span className={styles.logoText}>BitLabCircuit</span>
						</div>
						<div>
							Herramienta de simulación electrónica open source.
						</div>
					</div>
				</footer>
			</div>
		</ConfigProvider>
	);
}