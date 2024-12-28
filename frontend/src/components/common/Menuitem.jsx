import React from "react";
import { Link } from "react-router-dom";

const Menuitem = ({ icon: Icon, text, path, isActive, onClick }) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <Icon
        size={20}
        className={`${isActive ? "text-white" : "text-gray-400"}`}
      />
      <span className="ml-3 text-sm font-medium">{text}</span>
    </Link>
  );
};

export default Menuitem;
