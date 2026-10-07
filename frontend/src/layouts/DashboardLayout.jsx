import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Header />

        <main className="p-5 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
