import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("pod.db", {
      useNewConnection: true,
    });
    if (!db) {
      throw new Error("Database failed to open.");
    }
    await db.execAsync("PRAGMA foreign_keys = ON;");

    return db;
  } catch (error) {
    console.error("Error opening database:", error.message);
    throw error;
  }
};

export const initPodDb = async () => {
  const db = await openDatabase();
  try {
    // Uncomment to reset the pod item table
    // await db.execAsync(`DROP TABLE IF EXISTS pods`);

    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS pods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pod_name TEXT,
            pod_color TEXT
        );
        `
    );
  } catch (error) {
    console.error("Error initializing pods database:", error.message);
  }
};

export const initPodItemDb = async () => {
  const db = await openDatabase();
  try {
    // Uncomment to reset the pod item table
    // await db.execAsync(`DROP TABLE pod_item;`);

    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS pod_item (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              pod_id INTEGER,
              pod_item_name TEXT,
              pod_item_quantity REAL,
              pod_item_quantity_unit TEXT,
              pod_item_date TEXT,
              pod_category TEXT,
              FOREIGN KEY(pod_id) REFERENCES pods(id) ON DELETE CASCADE
          );`
    );
  } catch (error) {
    console.error("Error initializing pod items database:", error.message);
  }
};

export const addPod = async (podName, podColor) => {
  const db = await openDatabase();
  try {
    const statement = await db.prepareAsync(
      "INSERT INTO pods (pod_name, pod_color) VALUES (?, ?)"
    );
    const result = await statement.executeAsync([podName, podColor]);
    await statement.finalizeAsync();

    // Return the new row
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding pod:", error);
  }
};

// Add Pod item to database
export const addPodItem = async (
  podId,
  podItemName,
  podItemQuantity,
  podItemDate,
  podCategory
) => {
  const db = await openDatabase();
  try {
    const statement = await db.prepareAsync(
      "INSERT INTO pod_item (pod_id, pod_item_name, pod_item_quantity, pod_item_date, pod_category) VALUES (?,?,?,?,?)"
    );

    const result = await statement.executeAsync([
      podId,
      podItemName,
      podItemQuantity,
      podItemDate,
      podCategory,
    ]);
    // Uncomment to pass on the pod_item id
    console.log(podItemName, "added to Pod", podId);
    const newItemId = result.lastInsertRowId;
    await statement.finalizeAsync();

    return newItemId;
  } catch (error) {
    console.error("Error adding pod item:", error);
  }
};

export const deletePod = async (id) => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM pods WHERE id = $id");

  try {
    const result = await statement.executeAsync({
      $id: id,
    });
    console.log(`Deleted pod with id ${id}:`);
  } catch (error) {
    console.error("Error deleting pod:", error.message);
  }
};

export const deletePodItem = async (id) => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    "DELETE FROM pod_item WHERE id = $id"
  );

  try {
    const result = await statement.executeAsync({
      $id: id,
    });
    console.log(`Deleted pod item with id ${id}:`);
    return result;
  } catch (error) {
    console.error("Error deleting pod item:", error.message);
  }
};

export const fetchPods = async () => {
  const db = await openDatabase();
  const result = await db.getAllAsync("SELECT * FROM pods");
  return result;
};

// only need to fetch pod items from specified pod
export const fetchPodsItems = async (podID) => {
  // export const fetchPodsItems = async () => {
  const db = await openDatabase();
  const result = await db.getAllAsync(
    "SELECT * FROM pod_item WHERE pod_id = ?",
    [podID]
  );
  // const result = await db.getAllAsync("SELECT * FROM pod_item");

  return result;
};

// fetch all items
export const fetchAllPodsItems = async () => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync("SELECT * FROM pod_item");
    return result;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const updatePodName = async (newName, podId) => {
  const db = await openDatabase();
  try {
    await db.runAsync("UPDATE pods SET pod_name = ? WHERE id = ?", [
      newName,
      podId,
    ]);
  } catch (error) {
    console.error("Error updating pod name:", error.message);
  }
};
export const updatePodColor = async (newColor, podId) => {
  const db = await openDatabase();
  try {
    await db.runAsync("UPDATE pods SET pod_color = ? WHERE id = ?", [
      newColor,
      podId,
    ]);
  } catch (error) {
    console.error("Error updating pod color:", error.message);
  }
};
