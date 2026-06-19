import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
   fetch(
  `${import.meta.env.VITE_API_BASE}/projects/${id}?_embed`
)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const image =
    project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto px-4 py-10">

        <Link
          to="/"
          className="inline-block mb-6 text-indigo-600 font-semibold"
        >
          ← Back to Projects
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {image && (
            <img
              src={image}
              alt={project.title.rendered}
              className="w-full h-[450px] object-cover"
            />
          )}

          <div className="p-8">

            <h1 className="text-4xl font-bold mb-4">
              {project.title.rendered}
            </h1>

            <div className="flex gap-3 mb-6 flex-wrap">

              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {project.acf.technology}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {project.acf.client_name}
              </span>

            </div>

            <p className="text-gray-700 leading-8 text-lg">
              {project.acf.description}
            </p>

            {project.acf.project_url && (
              <a
                href={project.acf.project_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Visit Project
              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetail;