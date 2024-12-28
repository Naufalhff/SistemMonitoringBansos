import React from "react";
import Sidebar from "./components/sidebar/SidebarLayout";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white lg:ml-64">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
