import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <h2 className="font-bold text-xl text-indigo-600">
          Deshdeepak
        </h2>

        <div className="space-x-6">

          <Link
            to="/"
            className="hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-indigo-600 transition"
          >
            About
          </Link>
          <Link
  to="/contact"
  className="hover:text-indigo-600 transition"
>
  Contact
</Link>

          <a
            href="/#projects"
            className="hover:text-indigo-600 transition"
          >
            Projects
          </a>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;