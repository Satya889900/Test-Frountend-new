import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-2xl font-bold mt-2">45</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold mt-2">$5000</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;