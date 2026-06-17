function Navbar() {
  return (
   <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">

        <h2 className="font-bold text-xl">
          Deshdeepak
        </h2>

        <div className="space-x-4">
          <a href="/">Home</a>
          <a href="#projects">Projects</a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;