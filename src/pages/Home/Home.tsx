"use client";

import {
	AppstoreOutlined,
	CheckOutlined,
	ClockCircleOutlined,
	CodeOutlined,
	CoffeeOutlined,
	FundOutlined,
	GithubOutlined,
	LayoutOutlined,
	LoadingOutlined,
	RightOutlined,
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
	PotentiometerIcon,
	BoardIcon,
	PowerSupplyIcon,
	SwitchSPDTCloseIcon,
	ANDIcon,
	AmmeterIcon,
	LogoBitlab,
} from "@/icons";
import { SwitchTheme } from "@/components/SwitchTheme/SwitchTheme";
import { useTheme } from "@/store";

export function Home() {
	const currentTheme = useTheme((state) => state.currentTheme);

	const components = [
		{ name: "Resistores", icon: <ResistorIcon />, description: "Valores fijos y variables", index: "01" },
		{ name: "Capacitores", icon: <CapacitorIcon />, description: "Cerámicos, poliéster y variables", index: "02" },
		{ name: "Diodos", icon: <DiodeIcon />, description: "Rectificación, Zener y TVS", index: "03" },
		{ name: "Transistores", icon: <BJTNPNIcon />, description: "BJT, FET y MOSFET", index: "04" },
		{ name: "Inductores", icon: <InductorIcon />, description: "Bobinas y componentes magnéticos", index: "05" },
		{ name: "Ópticos", icon: <LEDIcon />, description: "LED, foto-diodos y fototransistores", index: "06" },
		{ name: "Potenciómetros", icon: <PotentiometerIcon />, description: "Control resistivo intuitivo", index: "07" },
		{ name: "Conmutación", icon: <SwitchSPDTCloseIcon />, description: "Interruptores y relés", index: "08" },
		{ name: "Lógica", icon: <ANDIcon />, description: "Puertas digitales básicas", index: "09" },
		{ name: "Medición", icon: <AmmeterIcon />, description: "Instrumentos de lectura", index: "10" },
		{ name: "Suministro", icon: <PowerSupplyIcon />, description: "Fuentes DC/AC y baterías", index: "11" },
		{ name: "Estructura", icon: <BoardIcon />, description: "Nodo, tierra y placa base", index: "12" } 
	];

	const roadmapCompleted = [
		{ title: "Motor Analógico Base", description: "Simulación DC funcional y motor de renderizado de componentes.", date: "2025.Q2" },
		{ title: "Enrutamiento dinámico", description: "Conexión fluida de nodos con trazado inteligente en el canvas.", date: "2025.Q3" },
		{ title: "Cálculos de circuitos", description: "Simulación de corriente y voltaje en tiempo real para circuitos básicos.", date: "2025.Q4" },
	];

	const roadmapUpcoming = [
		{ title: "Simulación digital", description: "Compuertas lógicas y circuitos digitales básicos.", date: "2026.Q1" },
		{ title: "Simulación de potencia", description: "Transistores y análisis de componentes de potencia.", date: "2026.Q2" },
		{ title: "Exportación de esquemas", description: "Exportación a SVG, PNG y otros formatos de imagen.", date: "2026.Q3" },
		{ title: "Almacenamiento persistente", description: "Guardado local de proyectos en el navegador.", date: "2026.Q3" },
		{ title: "Sistema de autenticación", description: "Login y sincronización en la nube para guardar proyectos.", date: "2026.Q4" },
		{ title: "Osciloscopio virtual", description: "Análisis gráfico para circuitos en corriente alterna.", date: "2026.Q4" },
	];

	const roadmapStatus = [
		{
			title: "Listo",
			items: [
				"Lienzo con rejilla y arrastrar / soltar",
				"Biblioteca de 12 familias de componentes",
				"Conexiones, nodos y rutas de cables",
				"Simulación DC: voltaje, corriente y resistencia",
				"Sondas de medición en tiempo real",
				"Modo claro y oscuro",
			],
		},
		{
			title: "En progreso",
			items: [
				"Análisis en corriente alterna (AC)",
				"Osciloscopio virtual",
				"Deshacer / rehacer ilimitado",
				"Exportar esquemático a PNG y SVG",
			],
		}, 
		{
			title: "Próximamente",
			items: [
				"Importar y compartir proyectos",
				"Colaboración en tiempo real",
				"Diseño de PCB",
			],
		},
	];

	return (
		<ConfigProvider theme={{ algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
			<div className={styles.layout}>

				{/* Header */}
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<div className={styles.logo}>
							<LogoBitlab color="var(--primary-color)" width={40} height={40}/>
							<span className={styles.logoText}>BitLabCircuit</span>
						</div>
						<div className={styles.headerActions}>
							<div className={styles.themeSwitch}>
								<SwitchTheme />
							</div>
							<a href="https://github.com/AletzMan/bitlab-circuit" target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
								<GithubOutlined style={{ fontSize: '16px' }} />
								<span>GitHub</span>
							</a>
						</div>
					</div>
				</header>

				<main>
					{/* Hero Directo y Honesto */}
					<section className={styles.heroSection}>
						<div className={styles.heroContainer}>
							<div className={styles.heroSplit}>
								<div className={styles.heroCopy}>
									<div className={styles.heroBadge}>
										Editor + simulador · en desarrollo
									</div>
									<h1 className={styles.heroTitle}>
										Diseño y simulación de circuitos electrónicos.
									</h1>
									<p className={styles.heroDescription}>
										BitLab Circuit es un editor y simulador de circuitos electrónicos con un lienzo limpio y un motor de simulación que valida tu diseño al instante. Mide voltaje, corriente y resistencia sin salir del esquemático.
									</p>
									<div className={styles.heroCta}>
										<Link to="/board" className={styles.primaryBtn}>
											Explorar el editor <RightOutlined />
										</Link>
										<Link to="/board" className={styles.secondaryBtn}>
											Ver biblioteca <RightOutlined />
										</Link>
									</div>
									<div className={styles.heroStats}>
										<span className={styles.heroStat}><span className={styles.heroStatValue}>{components.length}</span> Tipos de componente</span>
										<span className={styles.heroStatDivider} />
										<span className={styles.heroStat}><span className={styles.heroStatValue}>DC</span> Solver activo</span>
										<span className={styles.heroStatDivider} />
										<span className={styles.heroStat}><span className={styles.heroStatValue}>v0.2</span> Alpha</span>
									</div>
								</div>
								<div className={styles.heroPreview}>
									<div className={styles.canvasFrame}>
										<header className={styles.canvasHeaderBar}>
											<div className={styles.canvasDots}>
												<span className={styles.canvasDot} />
												<span className={styles.canvasDot} />
												<span className={styles.canvasDot} />
											</div> 
											<span>[SIM_ACTIVE]</span>
										</header>
										<div className={styles.canvasBody}>
											<img className={styles.canvasImage} src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bitlab-circuit/example_light.webp" />
										</div>
									</div>
							</div>
						</div>
						</div>
					</section>

					{/* Sección 2: Simulación en Tiempo Real (Mockup de Producto + Texto) */} 
					<section className={styles.splitSection}>
						<div>
							<div className={styles.featureMockup}> 
								<div className={styles.mockupBody}>
									<img src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bitlab-circuit/board_light.webp"/>
								</div> 
							</div>
						</div>
						<div className={styles.splitContent}>
							<span className={styles.sectionLabel}><LayoutOutlined className={styles.icon_section}/> Lienzo</span>
							<h2 className={styles.sectionTitle}>Diseño sin fricción en el canvas</h2>
							<p className={styles.sectionSubtitle}>
								Un lienzo limpio pensado para poner tus esquemáticos en el centro. 
								Arrastra un componente desde la biblioteca y la rejilla magnética lo alinea al nodo más cercano, 
								sin barras de herramientas saturadas ni menús que estorban.
							</p>
						</div>
					</section>
					<section className={styles.splitSection}>
						<div>
							<div className={styles.featureMockup}> 
								<div className={styles.mockupBody}>
									<img src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bitlab-circuit/validation_light.webp"/>
								</div> 
							</div>
						</div>
						<div className={styles.splitContent}>
							<span className={styles.sectionLabel}><FundOutlined className={styles.icon_section}/> MOTOR DE SIMULACIÓN</span>
							<h2 className={styles.sectionTitle}>Validación instantánea</h2>
							<p className={styles.sectionSubtitle}>
								Coloca sondas sobre cualquier nodo y observa voltaje, corriente y resistencia en tiempo real.
								Observa los resultados al instante mientras ajustas el diseño.
							</p>
						</div>
					</section>

					{/* Librería de Componentes */}
					<section className={styles.sectionWrapper}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionLabel}><AppstoreOutlined className={styles.icon_section}/> LIBRERÍA</span>
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

					 
						<section className={styles.sectionWrapper}>
							<div className={styles.sectionHeader}>
								<span className={styles.sectionLabel}><CodeOutlined className={styles.icon_section}/> ESTADO DEL PROYECTO</span>
								<h2 className={styles.sectionTitle}>Qué funciona hoy y qué viene después</h2>
								<p className={styles.sectionSubtitle}>BitLab Circuit está en desarrollo activo. Esto es lo que ya puedes usar y lo que estamos construyendo a continuación.</p>
							</div>
							<div className={styles.statusGrid}>
								{roadmapStatus.map((column) => (
									<div key={column.title} className={styles.statusColumn}>
										<div className={`${styles.statusColumnHeader} ${column.title === "Listo" ? styles.statusColumnHeaderReady : column.title === "En progreso" ? styles.statusColumnHeaderInProgress : styles.statusColumnHeaderUpcoming}`}>
											<span className={styles.statusColumnIcon} />
											<h3 className={styles.statusColumnTitle}>{column.title}</h3>
										</div>
										<div className={styles.statusList}>
											{column.items.map((item, itemIndex) => (
												<div key={itemIndex} className={`${styles.statusItem} ${column.title === "Listo" ? styles.statusItemReady : column.title === "En progreso" ? styles.statusItemInProgress : styles.statusItemUpcoming}`}>
													{column.title === "Listo" && <CheckOutlined className={styles.statusItemIcon}  />}
													{column.title === "En progreso" && <CoffeeOutlined className={styles.statusItemIcon} />}
													{column.title === "Próximamente" && <ClockCircleOutlined className={styles.statusItemIcon} />}

													<p>{item}</p>
												</div>
											))}
										</div>
									</div>
								))}
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