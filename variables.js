//Define button click functionality -->
document.addEventListener("DOMContentLoaded", () => {
  //declare and define a variable that represents the name Submit button
  const button = document.querySelector("#submit-button");
  const hitButton = document.querySelector("#hit-button");
  const holdButton = document.querySelector("#hold-button");
  const saveButton = document.querySelector("#save-button");
  //Admin Mode buttons
  var updateButton = document.querySelector("#update-button");
  var newValueInput = document.querySelector("#new-value");
  var deleteButton = document.querySelector("#delete-button");

  //when the submit button is clicked, it will trigger the main function
  button.addEventListener("click", function () {
    // Set result to input value
    var input = document.querySelector("#input-field");
    // store the output of main()
    var result = main(input.value);
    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    // Reset input value
    input.value = "";
  });
  hitButton.addEventListener("click", function () {
    //display results in output element
    var input = document.querySelector("#input-field");
    var result = drawCard(input.value);
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
  });
  holdButton.addEventListener("click", function () {
    //display results in output element
    var input = document.querySelector("#input-field");
    var result = cpuDraw(input.value);
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
  });
  saveButton.addEventListener("click", savePlayerData);
  console.log("Player data saved successfully");

  //Set up submit button for Admin Mode
  updateButton.addEventListener("click", async function () {
    if (isAdminModeActive) {
      const newValue = parseInt(newValueInput.value, 10);
      if (isNaN(newValue) || newValue < 0) {
        alert("Invalid input. Only accepts numbers with value greater than .");
        return;
      }
      ///Call amendStats function to update stats in JSONBin.
      try {
        await amendStats(cashPool, newValue);
        alert(`Successfully updated CashPool to ${newValue}.`);
      } catch (error) {
        console.error("Error updating stats", error);
        alert("Failed to update stats.");
      }
    }
  });
  deleteButton.addEventListener("click", async function () {
    if (isAdminModeActive) {
      const resetValue = 0;

      ///Call amendStats function to update stats in JSONBin.
      try {
        await amendStats(cashPool, resetValue);
        alert(`Successfully updated CashPool to ${resetValue}.`);
      } catch (error) {
        console.error("Error updating stats", error);
        alert("Failed to update stats.");
      }
    }
  });
});

var calculateHandScore = function (array) {
  //we assume that array is an array of cards
  var arrayScore = 0;
  var hasAce = false; // assume that the array has no Ace

  for (i = 0; i < array.length; i += 1) {
    arrayScore = arrayScore + Number(array[i]);
    if (array[i] == "1") {
      hasAce = true;
      if ((hasAce = true && array.length < 3 && arrayScore + 10 <= 21)) {
        // if array score +10 is less that 21, then maybe you can use Ace as 11, rather than 1
        arrayScore = arrayScore + 10;
      }
    }
  }

  return arrayScore;
};
