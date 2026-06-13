import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["about", "skills", "projects", "contact"];
const steps = portfolio.project.steps;

function App() {
	return (
		<main className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A]">
			<Navbar />
			<Hero />
			<About />
			<Skills />
			<ProjectsPin />
			<Contact />
		</main>
	);
}

function Navbar() {
	const [solid, setSolid] = useState(false);

	useEffect(() => {
		const onScroll = () => setSolid(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className={`navbar ${solid ? "is-sticky" : ""}`}>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a href="#hero" className="font-semibold tracking-tight">
					{portfolio.profile.name}
				</a>
				<div className="hidden gap-6 text-sm text-[#6B7280] sm:flex">
					{navItems.map((item) => (
						<a key={item} href={`#${item}`} className="capitalize transition hover:text-[#6366F1]">
							{item}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}

function Hero() {
	return (
		<section id="hero" className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">
			<div>
				<p className="section-label">{portfolio.profile.role}</p>
				<h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
					{portfolio.profile.tagline}
				</h1>
				<p className="case-body mt-6 max-w-2xl text-[#6B7280]">{portfolio.profile.description}</p>
				<div className="mt-8 flex flex-wrap gap-4">
					<a className="rounded-full bg-[#6366F1] px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5" href="#projects">
						Lihat Case Study
					</a>
					<a className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3 font-semibold transition hover:border-[#6366F1] hover:text-[#6366F1]" href={portfolio.profile.resumeUrl}>
						Download CV
					</a>
				</div>
			</div>
			<div className="rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
				<p className="font-mono text-sm text-[#6366F1]">Fixed Context, Changing Content</p>
				<h2 className="mt-4 text-3xl font-bold leading-tight">Portfolio fresh graduate dengan project section yang di-pin.</h2>
				<p className="mt-5 leading-7 text-[#6B7280]">HRD bisa membaca problem, research, solution, dan result tanpa kehilangan konteks project utama.</p>
				<div className="mt-8 grid gap-3 text-sm text-[#6B7280]">
					<p>{portfolio.profile.location}</p>
					{portfolio.socials.map((social) => (
						<a key={social.label} href={social.href} className="transition hover:text-[#6366F1]">
							{social.label} →
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function About() {
	return (
		<section id="about" className="mx-auto max-w-6xl px-6 py-24">
			<p className="section-label">About</p>
			<div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
				<h2 className="section-title">Saya fokus mengubah kebutuhan user menjadi antarmuka yang rapi dan fungsional.</h2>
				<div className="space-y-5 text-lg leading-8 text-[#6B7280]">
					<p>Bagian ini dirancang singkat untuk HRD: siapa kandidatnya, cara berpikirnya, dan value yang bisa dibawa ke tim.</p>
					<p>Saya tertarik pada frontend engineering, UI implementation, dan produk yang menyelesaikan masalah nyata dengan pengalaman pengguna yang jelas.</p>
				</div>
			</div>
		</section>
	);
}

function Skills() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".skill-fill",
				{ width: "0%" },
				{
					width: (_, el: HTMLElement) => el.style.getPropertyValue("--skill"),
					duration: 1,
					ease: "power2.out",
					scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
				},
			);
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="skills" className="skills-section mx-auto max-w-6xl px-6 py-24">
			<p className="section-label">Skills</p>
			<h2 className="section-title mt-6">Skill utama untuk membangun UI portfolio dan aplikasi web.</h2>
			<div className="mt-10 grid gap-5 md:grid-cols-2">
				{portfolio.skills.map((skill) => (
					<div key={skill.name} className="rounded-3xl border border-[#E5E7EB] bg-white p-6">
						<div className="flex items-center justify-between gap-4">
							<h3 className="font-semibold">{skill.name}</h3>
							<span className="font-mono text-sm text-[#6366F1]">{skill.level}</span>
						</div>
						<div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
							<div className="skill-fill h-full rounded-full bg-[#6366F1]" style={{ "--skill": skill.level } as React.CSSProperties} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function ProjectsPin() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const progressRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLElement | null>(null);
	const activeStepRef = useRef(0);
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		const mm = gsap.matchMedia();

		mm.add("(min-width: 768px)", () => {
			const trigger = ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top top",
				end: "+=400%",
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				markers: import.meta.env.DEV,
				onUpdate: (self) => {
					const nextStep = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));

					if (nextStep !== activeStepRef.current) {
						activeStepRef.current = nextStep;
						gsap.to(contentRef.current, {
							opacity: 0,
							y: -20,
							duration: 0.18,
							ease: "power2.inOut",
							onComplete: () => {
								setActiveStep(nextStep);
								gsap.fromTo(contentRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.inOut" });
							},
						});
					}

					gsap.to(progressRef.current, { scaleY: self.progress, duration: 0.2, ease: "power2.out" });
				},
			});

			return () => trigger.kill();
		});

		return () => mm.revert();
	}, []);

	return (
		<section ref={sectionRef} id="projects" className="projects-pin bg-[#F8F9FA]">
			<div className="mx-auto grid min-h-screen max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:py-0">
				<ProjectSidebar activeStep={activeStep} progressRef={progressRef} />

				<main className="hidden items-center md:col-span-8 md:flex">
					<article ref={contentRef} className="case-content max-w-2xl will-change-transform">
						<CaseContent step={steps[activeStep]} index={activeStep} />
					</article>
				</main>

				<div className="grid gap-6 md:hidden">
					{steps.map((step, index) => (
						<article key={step.label} className="rounded-3xl border border-[#E5E7EB] bg-white p-6">
							<CaseContent step={step} index={index} />
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function ProjectSidebar({ activeStep, progressRef }: { activeStep: number; progressRef: React.RefObject<HTMLDivElement | null> }) {
	return (
		<aside className="flex flex-col justify-center md:col-span-4">
			<p className="font-mono text-sm text-[#6366F1]">{portfolio.project.year}</p>
			<h2 className="project-title mt-4">{portfolio.project.title}</h2>
			<p className="mt-5 leading-7 text-[#6B7280]">{portfolio.project.description}</p>

			<div className="mt-6 flex flex-wrap gap-2">
				{portfolio.project.tags.map((tag) => (
					<span key={tag} className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 font-mono text-[13px] text-[#1A1A1A]">
						{tag}
					</span>
				))}
			</div>

			<div className="mt-10 grid grid-cols-[1px_1fr] gap-5">
				<div className="relative h-48 bg-[#E5E7EB]">
					<div ref={progressRef} className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#6366F1]" />
				</div>
				<ol className="grid content-between py-0.5">
					{steps.map((step, index) => {
						const active = index === activeStep;
						const completed = index < activeStep;
						return (
							<li key={step.label} className={`text-sm transition ${active ? "font-bold text-[#6366F1]" : completed ? "text-[#6366F1]" : "text-[#6B7280]"}`}>
								<span className="mr-2">●</span>
								{step.label}
							</li>
						);
					})}
				</ol>
			</div>
		</aside>
	);
}

function CaseContent({ step, index }: { step: (typeof steps)[number]; index: number }) {
	return (
		<>
			<p className="font-mono text-sm text-[#6366F1]">Step {index + 1}/4 · {step.label}</p>
			<h3 className="mt-3 text-4xl font-bold leading-[1.15] md:text-5xl">{step.title}</h3>
			<p className="case-body mt-6 text-[#6B7280]">{step.body}</p>
			<ul className="mt-8 grid gap-3">
				{step.points.map((point) => (
					<li key={point} className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-[#1A1A1A]">
						{point}
					</li>
				))}
			</ul>
		</>
	);
}

function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-6xl px-6 py-24">
			<div className="rounded-[2rem] bg-[#15151C] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:p-12">
				<p className="font-mono text-sm uppercase tracking-[0.3em] text-[#818CF8]">Contact</p>
				<h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{portfolio.contact.cta}</h2>
				<div className="mt-8 flex flex-wrap gap-4">
					<a className="rounded-full bg-[#818CF8] px-6 py-3 font-semibold text-[#0B0B0F]" href={`mailto:${portfolio.contact.email}`}>Email me</a>
					<a className="rounded-full border border-white/10 px-6 py-3 font-semibold" href={`tel:${portfolio.contact.phone}`}>{portfolio.contact.phone}</a>
				</div>
			</div>
		</section>
	);
}

export default App;
