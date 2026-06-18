import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-16">

        <div className="bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-5xl font-bold mb-6">
            About Me
          </h1>

          <p className="text-lg text-gray-700 leading-8 mb-8">
            Hi, I'm Deshdeepak. I work with WordPress,
            React, LMS Development and Digital Solutions.
            I enjoy building modern web applications and
            headless WordPress projects.
          </p>

          <h2 className="text-3xl font-semibold mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              WordPress
            </span>

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              React
            </span>

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              Tailwind CSS
            </span>

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              PHP
            </span>

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              REST API
            </span>

            <span className="bg-indigo-100 px-4 py-2 rounded-full">
              LMS Development
            </span>

          </div>

          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Download Resume
          </a>

        </div>

      </div>
    </div>
  );
}

export default About;