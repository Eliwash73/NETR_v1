import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("pod.db");
    if (!db) {
      throw new Error("Database failed to open.");
    }
    console.log("Database opened successfully");
    return db;
  } catch (e) {
    console.error("Error opening database:", e.message);
    throw e;
  }
};

export const initDb = async () => {
  const db = await openDatabase();
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS pods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pod_name TEXT,
            pod_color TEXT
        );`
    );
    console.log("Database initialized  successfully");
  } catch (error) {
    console.error("Error initializing database:", error.message);
  }
};

export const addPod = async (podName, podColor) => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    "INSERT INTO pods (pod_name, pod_color) VALUES ( $podName, $podColor)"
  );

  try {
    const result = await statement.executeAsync({
      $podName: podName,
      $podColor: podColor,
    });
    // to pass on the pod id
    const newId = result.lastInsertRowId;
    return newId;
  } catch (error) {
    console.error("Error executing statement:", error);
  } finally {
    await statement.finalizeAsync();
  }
};

export const deletePod = async (id) => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM pods WHERE id = $id");

  try {
    const result = await statement.executeAsync({
      $id: id,
    });
    console.log(`Deleted pod with id ${id}:`, result.changes);
  } catch (error) {
    console.error("Error deleting pod:", error);
  } finally {
    await statement.finalizeAsync();
  }
};

export const fetchPods = async () => {
  const db = await openDatabase();
  const result = await db.getAllAsync("SELECT * FROM pods");
  return result;
};
