import {
  Cloud,
  File,
  Clock3,
  Trash2,
  Settings,
  HardDrive,
  Plus,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "My Files",
    path: "/files",
    icon: File,
  },
  {
    name: "Recent",
    path: "/recent",
    icon: Clock3,
  },
  {
    name: "Trash",
    path: "/trash",
    icon: Trash2,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Cloud size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">CloudBox</h1>
            <p className="text-xs text-slate-400">Cloud Storage</p>
          </div>
        </div>

        {/* Upload */}
        <div className="p-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700">
            <Plus size={19} />
            Upload
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User + Storage */}
        <div className="border-t border-slate-100 p-5">
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {user?.name?.slice(0, 2).toUpperCase() || "US"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.name || "User"}
                </p>

                <p className="truncate text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <HardDrive size={18} className="text-slate-500" />

            <span className="text-sm font-medium text-slate-700">Storage</span>
          </div>

          <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[32%] rounded-full bg-blue-600" />
          </div>

          <p className="mb-4 text-xs text-slate-500">3.2 GB of 10 GB used</p>

          <button
            onClick={logout}
            className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
