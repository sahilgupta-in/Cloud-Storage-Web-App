import {
  FileText,
  Image,
  Video,
  Music,
  Folder,
  MoreVertical,
} from "lucide-react";

const folders = [
  { name: "Documents", items: 24 },
  { name: "Images", items: 138 },
  { name: "Projects", items: 12 },
  { name: "Personal", items: 35 },
];

const recentFiles = [
  {
    name: "Project Proposal.pdf",
    type: "PDF",
    size: "2.4 MB",
    updated: "Today",
    icon: FileText,
  },
  {
    name: "Brand Design.png",
    type: "PNG",
    size: "4.8 MB",
    updated: "Yesterday",
    icon: Image,
  },
  {
    name: "Presentation.mp4",
    type: "MP4",
    size: "48.2 MB",
    updated: "Yesterday",
    icon: Video,
  },
  {
    name: "Background Music.mp3",
    type: "MP3",
    size: "6.1 MB",
    updated: "Sep 28",
    icon: Music,
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Good morning, Sahil 👋
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your files.
        </p>
      </div>

      {/* Folders */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Folders
          </h3>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Folder size={22} />
                </div>

                <MoreVertical
                  size={19}
                  className="text-slate-400"
                />
              </div>

              <h4 className="font-semibold text-slate-800">
                {folder.name}
              </h4>

              <p className="mt-1 text-xs text-slate-400">
                {folder.items} items
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent files */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Files
          </h3>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {recentFiles.map((file) => {
            const Icon = file.icon;

            return (
              <div
                key={file.name}
                className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {file.type} · {file.size}
                  </p>
                </div>

                <span className="hidden text-xs text-slate-400 sm:block">
                  {file.updated}
                </span>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                  <MoreVertical size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}