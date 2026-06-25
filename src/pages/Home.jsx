import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/projects?_embed`)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const technologies = [
    "All",
    ...new Set(
      projects.map((project) => project.acf?.technology).filter(Boolean)
    ),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = (project.title?.rendered ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTechnology =
      technology === "All" || project.acf?.technology === technology;

    return matchesSearch && matchesTechnology;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-700">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-100 ring-1 ring-white/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Available for freelance work
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Deshdeepak
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-indigo-100">
            WordPress&nbsp;+&nbsp;React Developer crafting fast, modern, headless
            web experiences and LMS solutions.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-indigo-700 shadow-lg shadow-indigo-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              View Projects
            </a>
            <Link
              to="/contact"
              className="rounded-xl border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="h-10 bg-slate-50 [clip-path:ellipse(75%_100%_at_50%_100%)]" />
      </header>

      {/* Projects */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div id="projects" className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-slate-900">My Projects</h2>
          <p className="mt-2 text-slate-500">
            A selection of things I've built recently.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <select
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🔍
            </div>
            <h3 className="text-2xl font-semibold text-slate-800">
              No Projects Found
            </h3>
            <p className="mt-1 text-slate-500">
              Try a different search or filter.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
