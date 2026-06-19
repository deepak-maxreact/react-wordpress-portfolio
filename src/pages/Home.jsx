import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Home() {
  const [projects, setProjects] = useState([]);
const [search, setSearch] = useState("");
const [technology, setTechnology] = useState("All");  

 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE}/projects?_embed`)
    .then((res) => res.json())
    .then((data) => setProjects(data));
}, []);

  if (!projects.length) {
    return <h2>Loading...</h2>;
  }

const technologies = [
  "All",
  ...new Set(
    projects.map((project) => project.acf.technology)
  ),
];
const filteredProjects = projects.filter((project) => {
  const matchesSearch =
    project.title.rendered
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesTechnology =
    technology === "All" ||
    project.acf.technology === technology;

  return matchesSearch && matchesTechnology;
});
  return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-10">

      
  <div className="text-center py-20 bg-white rounded-3xl shadow-lg mb-10">
        <h1 className="text-6xl font-bold mb-4">
          Deshdeepak Portfolio
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          WordPress + React Developer
        </p>

        <a
          href="#projects"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          View Projects
        </a>
      </div>
      <h1 className="text-5xl font-bold text-center mb-8">
        My Projects
      </h1>

      <div id="projects" className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
  filteredProjects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
    />
  ))
) : (
  <div className="col-span-full text-center py-10">
    <h2 className="text-2xl font-semibold">
      No Projects Found
    </h2>
  </div>
)}
      </div>

    </div>
  <Footer />
  </div>
  

);

}

export default Home;