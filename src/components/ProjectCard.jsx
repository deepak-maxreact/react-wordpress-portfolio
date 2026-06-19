import { Link } from "react-router-dom";

function ProjectCard({ project }) {

 const image =
  project._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ?.replace(
      "http://localhost/react-wp",
      "https://safari-even-adventures-sympathy.trycloudflare.com/react-wp"
    );

console.log("IMAGE URL:", image);
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      {image && (
        <img
          src={image}
          alt={project.title.rendered}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5">

        <h2 className="text-2xl font-bold mb-3">
          {project.title.rendered}
        </h2>

        <p className="text-gray-600 mb-2">
          <strong>Client:</strong> {project.acf.client_name}
        </p>

        <p className="text-gray-600 mb-3">
          <strong>Technology:</strong> {project.acf.technology}
        </p>

        <p className="text-gray-700 mb-4">
          {project.acf.description}
        </p>

        <Link
          to={`/project/${project.id}`}
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          View Project
        </Link>

      </div>

    </div>
  );
}

export default ProjectCard;