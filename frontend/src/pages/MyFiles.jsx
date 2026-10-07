import { useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Download,
  File,
  FileArchive,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Folder,
  FolderPlus,
  Grid2X2,
  List,
  MoreVertical,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const initialFolders = [
  { id: 1, name: "Documents", items: 24, updated: "Today" },
  { id: 2, name: "Images", items: 138, updated: "Yesterday" },
  { id: 3, name: "Projects", items: 12, updated: "Sep 28" },
  { id: 4, name: "Personal", items: 35, updated: "Sep 26" },
];

const initialFiles = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    type: "pdf",
    size: "2.4 MB",
    bytes: 2400000,
    updated: "Today, 10:42 AM",
  },
  {
    id: 2,
    name: "Brand Design.png",
    type: "image",
    size: "4.8 MB",
    bytes: 4800000,
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "Presentation.mp4",
    type: "video",
    size: "48.2 MB",
    bytes: 48200000,
    updated: "Yesterday",
  },
  {
    id: 4,
    name: "Background Music.mp3",
    type: "audio",
    size: "6.1 MB",
    bytes: 6100000,
    updated: "Sep 28",
  },
  {
    id: 5,
    name: "Website Assets.zip",
    type: "archive",
    size: "18.6 MB",
    bytes: 18600000,
    updated: "Sep 27",
  },
  {
    id: 6,
    name: "Meeting Notes.docx",
    type: "document",
    size: "1.2 MB",
    bytes: 1200000,
    updated: "Sep 25",
  },
  {
    id: 7,
    name: "College Notes.docx",
    type: "document",
    size: "8.2 MB",
    bytes: 8200000,
    updated: "Sep 15",
  },
  {
    id: 8,
    name: "Home Notes.docx",
    type: "document",
    size: "3.6 MB",
    bytes: 3600000,
    updated: "Aug 25",
  },
];

const fileTypeIcons = {
  pdf: FileText,
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  archive: FileArchive,
  document: FileText,
  default: File,
};

function getFileType(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return "image";
  }

  if (["mp4", "mov", "avi", "mkv", "webm"].includes(extension)) {
    return "video";
  }

  if (["mp3", "wav", "ogg", "m4a"].includes(extension)) {
    return "audio";
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return "archive";
  }

  if (["pdf"].includes(extension)) {
    return "pdf";
  }

  if (["doc", "docx", "txt"].includes(extension)) {
    return "document";
  }

  return "default";
}

export default function MyFiles() {
  const [folders, setFolders] = useState(initialFolders);
  const [files, setFiles] = useState(initialFiles);

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const fileInputRef = useRef(null);

  const filteredFolders = useMemo(() => {
    return folders
      .filter((folder) =>
        folder.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [folders, search]);

  const filteredFiles = useMemo(() => {
    const result = files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase()),
    );

    return [...result].sort((a, b) => {
      if (sortBy === "size") {
        return b.bytes - a.bytes;
      }

      if (sortBy === "updated") {
        return a.updated.localeCompare(b.updated);
      }

      return a.name.localeCompare(b.name);
    });
  }, [files, search, sortBy]);

  const createFolder = () => {
    const name = newFolderName.trim();

    if (!name) return;

    setFolders((current) => [
      {
        id: Date.now(),
        name,
        items: 0,
        updated: "Just now",
      },
      ...current,
    ]);

    setNewFolderName("");
    setShowCreateFolder(false);
  };

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const uploadedFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: getFileType(file),
      size: formatBytes(file.size),
      bytes: file.size,
      updated: "Just now",
      rawFile: file,
    }));

    setFiles((current) => [...uploadedFiles, ...current]);

    event.target.value = "";
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  };

  const deleteFile = (id) => {
    setFiles((current) => current.filter((file) => file.id !== id));
    setSelectedItem(null);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>CloudBox</span>
            <ChevronRight size={15} />
            <span className="font-medium text-slate-600">My Files</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">My Files</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your files and folders.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

          <button
            onClick={() => setShowCreateFolder(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FolderPlus size={18} />
            New Folder
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Upload size={18} />
            Upload Files
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files and folders..."
            className="w-full rounded-xl bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-blue-200"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="updated">Updated</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg p-2 ${
                view === "grid"
                  ? "bg-slate-100 text-blue-600"
                  : "text-slate-400"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`rounded-lg p-2 ${
                view === "list"
                  ? "bg-slate-100 text-blue-600"
                  : "text-slate-400"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Folders */}
      {filteredFolders.length > 0 && (
        <section className="mb-9">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Folders</h2>

            <span className="text-xs text-slate-400">
              {filteredFolders.length} folders
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedItem(folder)}
                className="group text-left"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Folder size={24} fill="currentColor" />
                    </div>

                    <MoreVertical
                      size={18}
                      className="text-slate-300 group-hover:text-slate-500"
                    />
                  </div>

                  <p className="truncate font-semibold text-slate-800">
                    {folder.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {folder.items} items · {folder.updated}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Files */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Files</h2>

          <span className="text-xs text-slate-400">
            {filteredFiles.length} files
          </span>
        </div>

        {filteredFiles.length === 0 ? (
          <EmptyState
            search={search}
            onUpload={() => fileInputRef.current?.click()}
          />
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFiles.map((file) => (
              <FileGridCard
                key={file.id}
                file={file}
                onSelect={() => setSelectedItem(file)}
              />
            ))}
          </div>
        ) : (
          <FileList files={filteredFiles} onSelect={setSelectedItem} />
        )}
      </section>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Create New Folder
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a name for your new folder.
                </p>
              </div>

              <button
                onClick={() => setShowCreateFolder(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <input
              autoFocus
              value={newFolderName}
              onChange={(event) => setNewFolderName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createFolder();
                }
              }}
              placeholder="Folder name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateFolder(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={createFolder}
                disabled={!newFolderName.trim()}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item menu */}
      {selectedItem && (
        <ItemMenu
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={
            selectedItem.name?.includes(".")
              ? () => deleteFile(selectedItem.id)
              : undefined
          }
        />
      )}
    </div>
  );
}

function FileGridCard({ file, onSelect }) {
  const Icon = fileTypeIcons[file.type] || fileTypeIcons.default;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={23} />
        </div>

        <button
          onClick={onSelect}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-100 hover:text-slate-600"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <p className="truncate text-sm font-semibold text-slate-800">
        {file.name}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs uppercase text-slate-400">{file.type}</span>

        <span className="text-xs text-slate-400">{file.size}</span>
      </div>

      <p className="mt-3 text-xs text-slate-400">{file.updated}</p>
    </div>
  );
}

function FileList({ files, onSelect }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {files.map((file) => {
        const Icon = fileTypeIcons[file.type] || fileTypeIcons.default;

        return (
          <div
            key={file.id}
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
                {file.type.toUpperCase()}
              </p>
            </div>

            <span className="hidden text-sm text-slate-500 md:block">
              {file.size}
            </span>

            <span className="hidden text-xs text-slate-400 lg:block">
              {file.updated}
            </span>

            <button
              onClick={() => onSelect(file)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ search, onUpload }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <File size={26} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">
        {search ? "No files found" : "No files yet"}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
        {search
          ? `We couldn't find anything matching "${search}".`
          : "Upload your first file to start using your cloud storage."}
      </p>

      {!search && (
        <button
          onClick={onUpload}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Upload size={17} />
          Upload File
        </button>
      )}
    </div>
  );
}

function ItemMenu({ item, onClose, onDelete }) {
  const isFolder = !item.name?.includes(".");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-2xl bg-white p-2 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-100 px-3 py-3">
          <p className="truncate text-sm font-semibold text-slate-800">
            {item.name}
          </p>

          {!isFolder && (
            <p className="mt-1 text-xs text-slate-400">{item.size}</p>
          )}
        </div>

        {!isFolder && (
          <button
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Download size={17} />
            Download
          </button>
        )}

        <button
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
        >
          <File size={17} />
          Rename
        </button>

        {onDelete && (
          <button
            onClick={onDelete}
            className="flex w-full items-center gap-3  rounded-xl px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={17} />
            Move to Trash
          </button>
        )}
      </div>
    </div>
  );
}
