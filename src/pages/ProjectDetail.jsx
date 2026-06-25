import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the current project
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    fetch(`${import.meta.env.VITE_API_BASE}/projects/${id}?_embed`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch all projects once (used for the Related Projects section)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/projects?_embed`)
      .then((res) => res.json())
      .then((data) => setAllProjects(Array.isArray(data) ? data : []))
      .catch(() => setAllProjects([]));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-[450px] animate-pulse rounded-2xl bg-slate-200" />
          <div className="mt-6 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!project || project.code === "rest_post_invalid_id") {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-28 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            🚫
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Project Not Found
          </h1>
          <p className="mt-2 text-slate-500">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const acf = project.acf ?? {};
  const image = project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Only treat a URL as usable if it's an external http(s) link and not the
  // WordPress REST API endpoint (some projects have bad project_url data).
  const isUsableUrl = (url) =>
    typeof url === "string" &&
    /^https?:\/\//.test(url) &&
    !url.includes("/wp-json/");

  const projectUrl = isUsableUrl(acf.project_url) ? acf.project_url : null;
  const githubUrl = isUsableUrl(acf.github_url) ? acf.github_url : null;

  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.id !== project.id &&
        acf.technology &&
        p.acf?.technology === acf.technology
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          ← Back to Projects
        </Link>

        <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {image && (
            <img
              src={image}
              alt={project.title?.rendered ?? "Project"}
              className="h-[450px] w-full object-cover"
            />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-slate-900">
              {project.title?.rendered}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {acf.technology && (
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  {acf.technology}
                </span>
              )}
              {acf.client_name && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {acf.client_name}
                </span>
              )}
            </div>

            {acf.description && (
              <p className="mt-6 text-lg leading-8 text-slate-700">
                {acf.description}
              </p>
            )}

            {/* Project Information */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Project Information
              </h2>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-slate-500">Technology</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {acf.technology || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Client Name</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {acf.client_name || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Project ID</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    #{project.id}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Action buttons */}
            {(projectUrl || githubUrl) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  🔗 Visit Project
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400"
                >
                  {"</>"} View Code
                </a>
              )}
            </div>
            )}
          </div>
        </article>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Related Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rp) => {
                const rpImage =
                  rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                return (
                  <Link
                    key={rp.id}
                    to={`/project/${rp.id}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {rpImage && (
                      <img
                        src={rpImage}
                        alt={rp.title?.rendered ?? "Project"}
                        className="h-40 w-full object-cover transition group-hover:scale-105"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="line-clamp-1 font-semibold text-slate-900">
                        {rp.title?.rendered}
                      </h3>
                      <span className="mt-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                        {rp.acf?.technology}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProjectDetail;
