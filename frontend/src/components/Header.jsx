import { Search, Bell, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-6 lg:px-8">
      <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
        <Menu size={22} />
      </button>

      <div className="relative max-w-xl flex-1">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search files and folders..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
        />
      </div>

      <button className="relative rounded-xl p-3 text-slate-600 hover:bg-slate-100">
        <Bell size={20} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
      </button>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
        SG
      </div>
    </header>
  );
}