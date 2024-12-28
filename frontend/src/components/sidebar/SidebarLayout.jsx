import React, { useState } from "react";
import {
  HomeIcon,
  FileText,
  CreditCard,
  ClipboardListIcon,
  ClipboardCheckIcon,
  SettingsIcon,
  Menu,
  X,
} from "lucide-react";
import MenuItem from "../common/Menuitem";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: HomeIcon, text: "Dashboard", path: "/" },
    { icon: FileText, text: "Form Laporan", path: "/form-laporan" },
    {
      icon: ClipboardListIcon,
      text: "Daftar Laporan",
      path: "/daftar-laporan",
    },
    { icon: ClipboardCheckIcon, text: "Verifikasi", path: "/verifikasi" },
    { icon: SettingsIcon, text: "Setting", path: "/setting" },
  ];

  const handleClick = (index) => setActiveIndex(index);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0  left-0 w-64 h-screen bg-white border-r border-gray-200 px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-20 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="bg-blue-600 text-white p-2 rounded">
            <CreditCard size={20} />
          </div>
          <span className="text-xl font-bold">MonitoringBansos.</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
              isActive={activeIndex === index}
              onClick={() => {
                handleClick(index);
                setIsMenuOpen(false); // Close menu on selection
              }}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-80 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Hamburger Button for Mobile */}
      <div className="lg:hidden fixed top-0 left-0 w-full p-auto z-80 bg-white shadow-md">
        <button
          className="p-2 text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
