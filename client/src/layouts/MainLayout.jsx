import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Ticket Management System
          </h1>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm cursor-pointer hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

export default MainLayout;
