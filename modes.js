var isPlayerModeActive = false;
const playerModeButton = document.querySelector("#playerMode");
const adminModeButton = document.querySelector("#adminMode");
var isAdminModeActive = false;

//setup a player mode
playerModeButton.addEventListener("click", function () {
  //activate player mode
  isPlayerModeActive = !isPlayerModeActive;

  if (isPlayerModeActive) {
    document.querySelector("#container").style.display = "block";
    isAdminModeActive = false;
    document.querySelector("#container2").style.display = "none";
    console.log(isPlayerModeActive);
    console.log(isAdminModeActive);
  } else {
    document.querySelector("#container").style.display = "none";
    console.log(isPlayerModeActive);
    console.log(isAdminModeActive);
  }
});
//setup Admin mode
adminModeButton.addEventListener("click", function () {
  //deactivate player mode on Admin mode
  isAdminModeActive = !isAdminModeActive;

  if (isAdminModeActive) {
    isPlayerModeActive = false;
    document.querySelector("#container").style.display = "none";
    document.querySelector("#container2").style.display = "block";
    console.log(isPlayerModeActive);
    console.log(isAdminModeActive);
  } else {
    isPlayerModeActive = false;
    document.querySelector("#container2").style.display = "none";
    console.log(isPlayerModeActive);
    console.log(isAdminModeActive);
  }
});
