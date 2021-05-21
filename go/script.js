// scroll function

window.onscroll = function () {
  headerScrollFnc();
};
var navbar = document.getElementById("header");
var sticky = navbar.offsetHeight;
function headerScrollFnc() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("stickyHeader");
  } else {
    navbar.classList.remove("stickyHeader");
  }
}

// scroll function close

// fetch api | api => https://api.covid19india.org/data.json
var introTrackerDataValConf = document.getElementById("introTrackerDataValConf")
var introTrackerDeltaValConf = document.getElementById("introTrackerDeltaValConf")
var introTrackerDataValActive = document.getElementById("introTrackerDataValActive")
// var introTrackerDeltaValActive = document.getElementById("introTrackerDeltaValActive")
var introTrackerDataValRecovered = document.getElementById("introTrackerDataValRecov")
var introTrackerDeltaValRecovered = document.getElementById("introTrackerDeltaValRecov")
var introTrackerDataValDeath = document.getElementById("introTrackerDataValDeaths")
var introTrackerDeltaValDeath  = document.getElementById("introTrackerDeltaValDeaths")
var Jadata ;

async function fetchingData() {
  var requestOptions = {
    method: "get",
    redirect: "follow",
  };
  await fetch("https://api.covid19india.org/data.json", requestOptions)
    .then((response) => response.text())
    .then((result) =>(Jadata=JSON.parse(result))  )//data = JSON.parse(result))
    .catch((error) => console.log("error", error));
    // giving data in html
    
    setTimeout(function(){
    console.log(Jadata);
    introTrackerDataValConf.innerText= (Jadata.statewise[0].confirmed);
    introTrackerDeltaValConf.innerText = `+ ${(Jadata.statewise[0].deltaconfirmed)}`;
    introTrackerDataValActive.innerText = (Jadata.statewise[0].active);
    // introTrackerDeltaValActive.innerText = (Jadata.statewise[0].deltaactive);
    introTrackerDataValRecovered.innerText = (Jadata.statewise[0].recovered);
    introTrackerDeltaValRecovered.innerText = `+ ${(Jadata.statewise[0].deltarecovered)}`;
    introTrackerDataValDeath.innerText = (Jadata.statewise[0].deaths);
    introTrackerDeltaValDeath.innerText = `+ ${(Jadata.statewise[0].deltadeaths)}`;

  }, 3000);
}
fetchingData();
