import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-8">
    <Link to="/" className="text-white font-bold uppercase tracking-wider text-sm hover:text-gray-300 transition-colors">Home</Link>
    <Link to="/about" className="text-white font-bold uppercase tracking-wider text-sm hover:text-gray-300 transition-colors">About</Link>
  </nav>
);

export default Navbar;