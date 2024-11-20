// Defining the JSON BIN Url and API/Master Key
document.addEventListener("DOMContentLoaded", () => {
  loadPlayerData(); // Call the function after DOM is loaded
});

const BASE_JSON_BIN_URL = "-";

const MASTER_KEY = "-";

// Function to load cashPool from JSON Bin
const loadCashPool = async () => {
  try {
    const response = await fetch(BASE_JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    const playerData = data.record.playerData;

    // Assign the saved cashPool value to the cashPool variable
    cashPool = playerData.cashPool;

    // Update the UI with the latest cashPool value
    updateCashPoolUI(updatedCashPool);

    console.log(`Loaded cashPool: ${cashPool}`);
    // updateCashPoolUI(cashPool); // Update the UI with the loaded cashPool value
  } catch (error) {
    console.error("Error loading cashPool:", error);
  }
};

// Call loadCashPool when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCashPool();
});

//Create function to fetch and update the Json Bin
const loadPlayerData = async () => {
  try {
    const response = await axios.get(BASE_JSON_BIN_URL, {
      headers: { "X-Master-Key": MASTER_KEY },
    });
    console.log(response.data);
    //Destructure current data
    let { userID, cashPool } = response.data.record.playerData;

    // Update DOM element
    // Check elements exist before setting textContent
    const nameElement = document.getElementById("player-name");
    const cashPoolElement = document.getElementById("cashpool-display");

    if (nameElement) nameElement.textContent = userID;
    if (cashPoolElement) cashPoolElement.textContent = cashPool;
  } catch (error) {
    console.error("Failed to load player data:", error);
    alert("Error fetching player data. Please try again later.");
  }
};
// Function to save player data to JSONBin
const savePlayerData = async () => {
  try {
    const playerData = { userID: "player 1", cashPool: cashPool };

    const response = await axios.put(
      BASE_JSON_BIN_URL,
      { playerData }, // Payload: The data to save
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
      }
    );
    console.log("Player data saved successfully:", response.data);
    alert("Player data saved successfully!");
  } catch (error) {
    console.error("Error saving player data:", error);
    alert("Failed to save player data. Check the console for details.");
  }
};
//window.reload

// Function to amend and update stats.
const amendStats = async (cashPool, newValue) => {
  try {
    // Fetch current data from JSONBin
    const response = await fetch(BASE_JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current data from JSONBin");
    }

    const data = await response.json();
    const updatedData = data.record;

    // Update the relevant stat
    updatedData.playerData.cashPool = newValue;

    // Save the updated data back to JSONBin
    const updateResponse = await fetch(BASE_JSON_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
      body: JSON.stringify(updatedData),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update JSONBin data");
    }

    console.log(`Cash Pool successfully updated to ${newValue} in JSONBin.`);
  } catch (error) {
    console.error("Error updating stats:", error);
    throw error;
  }
};

// Function to delete stats.
const deleteStats = async (cashPool, resetValue) => {
  try {
    // Fetch current data from JSONBin
    const response = await fetch(BASE_JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current data from JSONBin");
    }

    const data = await response.json();
    const updatedData = data.record;

    // Update the relevant stat
    updatedData.playerData.cashPool = resetValue;

    // Save the updated data back to JSONBin
    const updateResponse = await fetch(BASE_JSON_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
      body: JSON.stringify(updatedData),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update JSONBin data");
    }

    console.log(`Cash Pool successfully updated to ${resetValue} in JSONBin.`);
  } catch (error) {
    console.error("Error updating stats:", error);
    throw error;
  }
};
