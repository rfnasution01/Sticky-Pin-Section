export const portfolio = {
	profile: {
		name: "Your Name",
		role: "Fresh Graduate Frontend Developer",
		tagline: "Membangun produk digital yang jelas, cepat, dan mudah dipahami user.",
		description:
			"Portfolio single page dengan alur storytelling: hero yang ringkas, skill yang terukur, dan project case study dengan sticky pin section agar HRD tetap punya konteks saat membaca proses berpikir.",
		location: "Indonesia",
		resumeUrl: "/CV.pdf",
	},
	socials: [
		{ label: "Email", href: "mailto:hello@example.com" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/username" },
		{ label: "GitHub", href: "https://github.com/username" },
	],
	skills: [
		{ name: "React", level: "88%" },
		{ name: "TypeScript", level: "78%" },
		{ name: "TailwindCSS", level: "86%" },
		{ name: "UI Implementation", level: "82%" },
		{ name: "Database Basic", level: "68%" },
	],
	project: {
		title: "Digital Desa Offline",
		year: "2026",
		description: "Desktop app untuk administrasi desa offline-first agar data tetap bisa dikelola meski koneksi internet tidak stabil.",
		tags: ["React", "Electron", "SQLite", "Tailwind"],
		link: "#contact",
		steps: [
			{
				label: "Problem",
				title: "Administrasi desa sering berhenti saat internet tidak stabil.",
				body: "Staf desa membutuhkan aplikasi yang tetap bisa mencatat surat, data warga, dan laporan harian tanpa bergantung pada koneksi. Tantangan utamanya adalah menjaga flow kerja tetap sederhana untuk user non-teknis.",
				points: ["Input data harus tetap berjalan offline", "UI perlu familiar dan minim distraksi", "Data lokal harus mudah dicari kembali"],
			},
			{
				label: "Research",
				title: "User butuh kecepatan, kejelasan status, dan risiko data hilang yang rendah.",
				body: "Saya memetakan alur kerja admin desa dari input data sampai cetak dokumen. Dari riset sederhana, prioritasnya bukan fitur banyak, tetapi navigasi jelas, pencarian cepat, dan indikator penyimpanan yang mudah dipercaya.",
				points: ["Observasi form dan dokumen yang paling sering dipakai", "Membuat constraint offline-first", "Menentukan data penting untuk versi awal"],
			},
			{
				label: "Solution",
				title: "Aplikasi desktop offline-first dengan struktur data lokal.",
				body: "Solusi dibuat menggunakan React untuk antarmuka, Electron untuk desktop runtime, SQLite untuk penyimpanan lokal, dan Tailwind untuk konsistensi UI. Setiap flow dibuat ringkas: tambah data, validasi, simpan lokal, lalu tampilkan status berhasil.",
				points: ["Komponen form reusable", "Penyimpanan lokal SQLite", "Dashboard ringkas untuk akses modul utama"],
			},
			{
				label: "Result",
				title: "Workflow lebih mandiri dan siap dikembangkan ke sinkronisasi online.",
				body: "Prototype membuktikan bahwa kebutuhan inti bisa berjalan tanpa internet. Struktur project juga disiapkan agar di tahap berikutnya dapat ditambahkan sinkronisasi cloud, role user, dan export laporan otomatis.",
				points: ["Core flow offline berjalan", "Interface mudah dipresentasikan ke stakeholder", "Fondasi teknis siap untuk iterasi berikutnya"],
			},
		],
	},
	contact: {
		email: "hello@example.com",
		phone: "+62 812 0000 0000",
		cta: "Tertarik berdiskusi tentang role frontend, internship, atau project kolaborasi?",
	},
} as const;
