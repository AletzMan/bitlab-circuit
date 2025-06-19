"use client";

import {
	SettingOutlined,
	PlayCircleOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	DownloadOutlined,
	GithubOutlined,
	BulbOutlined,
	ExperimentOutlined, // Represents CircuitBoard, or you can find a more suitable one
	ToolOutlined, // Represents Wrench
	DatabaseOutlined,
	CloudOutlined,
	FileTextOutlined,
	GatewayOutlined, // Represents Shapes, or find a more geometric one
	BarChartOutlined,
	DashboardOutlined, // Represents Cpu
	ThunderboltOutlined,
	PlayCircleFilled, // Represents Zap
} from "@ant-design/icons";
import styles from "./styles.module.css";
import { Link } from "react-router";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "@/store";
import { LogoBitlab } from "@/icons";

export function Home() {
	const currentTheme = useTheme((state) => state.currentTheme);

	const features = [
		{
			icon: <ToolOutlined className={styles.featureIcon} />,
			title: "Interfaz Intuitiva",
			description:
				"Diseña circuitos fácilmente con nuestra interfaz drag-and-drop optimizada para productividad.",
		},
		{
			icon: <DashboardOutlined className={styles.featureIcon} />,
			title: "Biblioteca Completa",
			description: "Amplia colección de componentes electrónicos listos para usar en tus diseños.",
		},
		{
			icon: <ThunderboltOutlined className={styles.featureIcon} />,
			title: "Simulación Analógica",
			description: "Simula el comportamiento de circuitos analógicos en tiempo real con precisión.",
		},
		{
			icon: <SettingOutlined className={styles.featureIcon} />,
			title: "Personalización",
			description:
				"Personaliza componentes y parámetros para adaptarse a tus necesidades específicas.",
		},
	];

	const components = [
		{ name: "Resistors", icon: "🔧", description: "Resistencias de diferentes valores" },
		{ name: "Capacitors", icon: "⚡", description: "Condensadores electrolíticos y cerámicos" },
		{ name: "Diodes", icon: "🔺", description: "Diodos rectificadores y LED" },
		{ name: "Transistors", icon: "📡", description: "BJT, MOSFET y otros transistores" },
		{ name: "Inductors", icon: "🌀", description: "Bobinas e inductores variables" },
		{ name: "Switches & Relays", icon: "🔘", description: "Interruptores y relés" },
		{ name: "Logic Gates", icon: "🚪", description: "Puertas lógicas básicas" },
		{ name: "Power & Supply", icon: "🔋", description: "Fuentes de alimentación" },
	];

	const completedFeatures = [
		"Creación de interfaz gráfica",
		"Implementación de componentes básicos",
		"Conexión de elementos",
		"Edición y modificación de componentes",
		"Simulación de circuitos analógicos",
	];

	const upcomingFeatures = [
		{
			icon: <DatabaseOutlined className={styles.upcomingIcon} />,
			title: "Local Storage",
			description: "Guardar diagramas en el navegador",
		},
		{
			icon: <CloudOutlined className={styles.upcomingIcon} />,
			title: "Autenticación y Sync",
			description: "Acceso desde cualquier dispositivo",
		},
	];

	const futureFeatures = [
		{ icon: <DashboardOutlined className={styles.futureIcon} />, text: "Más tipos de componentes" },
		{ icon: <GatewayOutlined className={styles.futureIcon} />, text: "Basic Shapes" },
		{ icon: <FileTextOutlined className={styles.futureIcon} />, text: "Text Fields y notas" },
		{
			icon: <DownloadOutlined className={styles.futureIcon} />,
			text: "Exportación en formatos estándar",
		},
		{
			icon: <ThunderboltOutlined className={styles.futureIcon} />,
			text: "Simulación de circuitos digitales",
		},
		{
			icon: <BarChartOutlined className={styles.futureIcon} />,
			text: "Análisis avanzado de circuitos",
		},
	];

	return (
		<ConfigProvider
			theme={{
				algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			<div className={styles.layout}>
				{/* Header */}
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<div className={styles.logo}>
							<LogoBitlab />
							<span className={styles.logoText}>BitLabCircuit</span>
						</div>
						<div className={styles.navigation}>
							<button className={styles.githubBtn}>
								<GithubOutlined className={styles.githubIcon} />
								GitHub
							</button>
						</div>
					</div>
				</header>

				<main>
					{/* Hero Section */}
					<section className={styles.heroSection}>
						<div className={styles.container}>
							<div className={styles.heroContent}>
								<div className={styles.heroBadge}>
									<BulbOutlined className={styles.badgeIcon} />
									<span>Simulación Analógica Disponible</span>
								</div>

								<h1 className={styles.heroTitle}>
									Diseña y Simula
									<span className={styles.gradientText}> Circuitos Electrónicos</span>
								</h1>

								<p className={styles.heroDescription}>
									BitLabCircuit es tu herramienta completa para el diseño y simulación de circuitos
									electrónicos. Construye, conecta y prueba circuitos de manera interactiva con
									nuestra interfaz intuitiva.
								</p>

								<div className={styles.heroButtons}>
									<Link to="/board" className={styles.primaryBtn}>
										<PlayCircleFilled className={styles.btnIcon} />
										Comenzar a Diseñar
									</Link>
								</div>
							</div>
						</div>
					</section>

					{/* Features Section */}
					<section className={styles.featuresSection}>
						<div className={styles.container}>
							<div className={styles.sectionHeader}>
								<h2 className={styles.sectionTitle}>Características Principales</h2>
								<p className={styles.sectionDescription}>
									Todo lo que necesitas para diseñar y simular circuitos electrónicos profesionales
								</p>
							</div>

							<div className={styles.featuresGrid}>
								{features.map((feature, index) => (
									<div key={index} className={styles.featureCard}>
										<div className={styles.featureCardContent}>
											<div className={styles.featureIconWrapper}>{feature.icon}</div>
											<h4 className={styles.featureTitle}>{feature.title}</h4>
											<p className={styles.featureDescription}>{feature.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Components Section */}
					<section className={styles.componentsSection}>
						<div className={styles.container}>
							<div className={styles.sectionHeader}>
								<h2 className={styles.sectionTitle}>Componentes Disponibles</h2>
								<p className={styles.sectionDescription}>
									Biblioteca completa de componentes electrónicos para todos tus proyectos
								</p>
							</div>

							<div className={styles.componentsGrid}>
								{components.map((component, index) => (
									<div key={index} className={styles.componentCard}>
										<div className={styles.componentContent}>
											<div className={styles.componentIcon}>{component.icon}</div>
											<h5 className={styles.componentTitle}>{component.name}</h5>
											<p className={styles.componentDescription}>{component.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Roadmap Section */}
					<section className={styles.roadmapSection}>
						<div className={styles.container}>
							<div className={styles.sectionHeader}>
								<h2 className={styles.sectionTitle}>Roadmap de Desarrollo</h2>
								<p className={styles.sectionDescription}>
									Conoce las próximas características y mejoras planificadas
								</p>
							</div>

							<div className={styles.roadmapGrid}>
								{/* Completed */}
								<div className={styles.roadmapColumn}>
									<div className={styles.roadmapHeader}>
										<CheckCircleOutlined className={styles.completedIcon} />
										<h3 className={styles.roadmapTitle}>Versión Inicial ✅</h3>
									</div>

									<div className={styles.featureList}>
										{completedFeatures.map((item, index) => (
											<div key={index} className={styles.featureItem}>
												<CheckCircleOutlined className={styles.checkIcon} />
												<span>{item}</span>
											</div>
										))}
									</div>
								</div>

								{/* Upcoming */}
								<div className={styles.roadmapColumn}>
									<div className={styles.roadmapHeader}>
										<ClockCircleOutlined className={styles.upcomingIconHeader} />
										<h3 className={styles.roadmapTitle}>Próximas Mejoras</h3>
									</div>

									<div className={styles.upcomingList}>
										{upcomingFeatures.map((item, index) => (
											<div key={index} className={styles.upcomingCard}>
												<div className={styles.upcomingContent}>
													<div>{item.icon}</div>
													<div>
														<h5 className={styles.upcomingTitle}>{item.title}</h5>
														<p className={styles.upcomingDescription}>{item.description}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Future Features */}
							<div className={styles.futureFeatures}>
								<div className={styles.roadmapHeader}>
									<BulbOutlined className={styles.futureIconHeader} />
									<h3 className={styles.roadmapTitle}>Futuras Mejoras</h3>
								</div>

								<div className={styles.futureGrid}>
									{futureFeatures.map((item, index) => (
										<div key={index} className={styles.futureFeatureItem}>
											<div className={styles.futureFeatureContent}>
												<div>{item.icon}</div>
												<span>{item.text}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					{/* CTA Section */}
					<section className={styles.ctaSection}>
						<div className={styles.container}>
							<div className={styles.ctaContent}>
								<h2 className={styles.ctaTitle}>¿Listo para Comenzar?</h2>
								<p className={styles.ctaDescription}>
									Únete a la comunidad de ingenieros y estudiantes que ya están usando BitLabCircuit
								</p>
								<div className={styles.ctaButtons}>
									<button className={styles.ctaPrimaryBtn}>
										<PlayCircleOutlined className={styles.btnIcon} />
										Probar Ahora
									</button>
								</div>
							</div>
						</div>
					</section>
				</main>

				{/* Footer */}
				<footer className={styles.footer}>
					<div className={styles.container}>
						<div className={styles.footerContent}>
							<div className={styles.footerLogo}>
								<ExperimentOutlined className={styles.footerLogoIcon} />
								<span className={styles.footerLogoText}>BitLabCircuit</span>
							</div>
							<div className={styles.footerLinks}>
								<a href="#" className={styles.footerLink}>
									Documentación
								</a>
								<a href="#" className={styles.footerLink}>
									Soporte
								</a>
								<a href="#" className={styles.footerLink}>
									GitHub
								</a>
							</div>
						</div>
						<div className={styles.footerDivider}></div>
						<div className={styles.footerBottom}>
							<span className={styles.footerCopyright}>
								© 2024 BitLabCircuit. Diseñado para ingenieros y estudiantes apasionados por la
								electrónica.
							</span>
						</div>
					</div>
				</footer>
			</div>
		</ConfigProvider>
	);
}
