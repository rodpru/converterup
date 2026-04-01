const DB_NAME = "converterup-tool-cache";
const STORE_NAME = "pending-downloads";
const DB_VERSION = 1;

interface PendingDownload {
  toolName: string;
  data: Blob | string;
  filename: string;
  savedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "toolName" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePendingDownload(
  toolName: string,
  data: Blob | string,
  filename: string,
): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const entry: PendingDownload = { toolName, data, filename, savedAt: Date.now() };
  store.put(entry);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadPendingDownload(
  toolName: string,
): Promise<{ data: Blob | string; filename: string } | null> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(toolName);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const entry = request.result as PendingDownload | undefined;
      if (!entry) return resolve(null);
      // Expire after 1 hour
      if (Date.now() - entry.savedAt > 60 * 60 * 1000) {
        clearPendingDownload(toolName);
        return resolve(null);
      }
      resolve({ data: entry.data, filename: entry.filename });
    };
    request.onerror = () => reject(request.error);
  });
}

export async function clearPendingDownload(toolName: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(toolName);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
