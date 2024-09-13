import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("pod.db", {
      useNewConnection: true,
    });
    if (!db) {
      throw new Error("Database failed to open.");
    }
    // console.log("Database opened successfully");
    return db;
  } catch (e) {
    console.error("Error opening database:", e.message);
    throw e;
  }
};

export const initPodDb = async () => {
  const db = await openDatabase();
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS pods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pod_name TEXT,
            pod_color TEXT
        );`
    );
    // console.log("Database initialized  successfully");
  } catch (error) {
    console.error("Error initializing pods database:", error.message);
  }
};

export const initPodItemDb = async () => {
  const db = await openDatabase();
  try {
    await db.execAsync(
      `
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS pod_item (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              pod_id INTEGER,
              pod_item_name TEXT,
              pod_item_quantity INTEGER,
              pod_item_date TEXT,
              pod_category TEXT,
              FOREIGN KEY(pod_id) REFERENCES pods(id)
          );`
    );
    // console.log("Database initialized  successfully");
  } catch (error) {
    console.error("Error initializing pod items database:", error.message);
  }
};

//add Pod to database
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
    console.error("Error adding pod:", error);
  } finally {
    await statement.finalizeAsync();
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
  const statement = await db.prepareAsync(
    "INSERT INTO pod_item (pod_id, pod_item_name, pod_item_quantity, pod_item_date, pod_category) VALUES ($podId, $podItemName, $podItemQuantity, $podItemDate, $podCategory)"
  );

  try {
    const result = await statement.executeAsync({
      $podId: podId,
      $podItemName: podItemName,
      $podItemQuantity: podItemQuantity,
      $podItemDate: podItemDate,
      $podCategory: podCategory,
    });
    // Uncomment to pass on the pod_item id
    console.log(podItemName, "added to Pod", podId);
    const newItemId = result.lastInsertRowId;
    return newItemId;
  } catch (error) {
    console.error("Error adding pod item:", error);
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
    console.log(`Deleted pod with id ${id}:`);
  } catch (error) {
    console.error("Error deleting pod:", error);
  } finally {
    await statement.finalizeAsync();
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
    console.error("Error deleting pod:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
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
  const result = await db.getAllAsync("SELECT * FROM pod_item");
  return result;
};
