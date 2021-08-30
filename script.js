// scroll function

window.onscroll = function () {
  headerScrollFnc();
};
var navbar = document.getElementById("header");
var sticky = navbar.offsetHeight;
var covidTable = document.getElementById("covidTable");
var tableHead = covidTable.insertRow(0);
tableHead.insertCell(0).innerHTML = `S. No.`;
tableHead.insertCell(1).innerHTML = `States`;
tableHead.insertCell(2).innerHTML = `Active`;
tableHead.insertCell(3).innerHTML = `Recovered`;
tableHead.insertCell(4).innerHTML = `Deaths`;
tableHead.insertCell(5).innerHTML = `New Cases`;
tableHead.insertCell(6).innerHTML = `New Recovered`;
tableHead.insertCell(7).innerHTML = `New Deaths`;
tableHead.insertCell(8).innerHTML = `Last Updated Time`;
function headerScrollFnc() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("stickyHeader");
  } else {
    navbar.classList.remove("stickyHeader");
  }
}

// scroll function close

// fetch api | api => https://data.covid19india.org/data.json
var introTrackerDataValConf = document.getElementById(
  "introTrackerDataValConf"
);
var introTrackerDeltaValConf = document.getElementById(
  "introTrackerDeltaValConf"
);
var introTrackerDataValActive = document.getElementById(
  "introTrackerDataValActive"
);
// var introTrackerDeltaValActive = document.getElementById("introTrackerDeltaValActive")
var introTrackerDataValRecovered = document.getElementById(
  "introTrackerDataValRecov"
);
var introTrackerDeltaValRecovered = document.getElementById(
  "introTrackerDeltaValRecov"
);
var introTrackerDataValDeath = document.getElementById(
  "introTrackerDataValDeaths"
);
var introTrackerDeltaValDeath = document.getElementById(
  "introTrackerDeltaValDeaths"
);
var Jadata;

async function fetchingData() {
  var requestOptions = {
    method: "get",
    redirect: "follow",
  };
  await fetch("https://data.covid19india.org/data.json", requestOptions)
    .then((response) => response.text())
    .then((result) => (Jadata = JSON.parse(result))) //data = JSON.parse(result))
    .catch((error) => console.log("error", error));
  // giving data in html
  var JadataLength = Jadata.statewise.length;
  console.log(Jadata);
  introTrackerDataValConf.innerText = ` ${Jadata.statewise[0].confirmed}  `;
  introTrackerDeltaValConf.innerText = ` + ${Jadata.statewise[0].deltaconfirmed}  `;
  introTrackerDataValActive.innerText = ` ${Jadata.statewise[0].active}  `;
  introTrackerDataValRecovered.innerText = ` ${Jadata.statewise[0].recovered}  `;
  introTrackerDeltaValRecovered.innerText = ` + ${Jadata.statewise[0].deltarecovered}  `;
  introTrackerDataValDeath.innerText = ` ${Jadata.statewise[0].deaths}  `;
  introTrackerDeltaValDeath.innerText = ` + ${Jadata.statewise[0].deltadeaths}  `;
  for (i = 0; i < JadataLength; i++) {
    // var headRow =table.insertRow(0);
    var stringI = i + 1;
    var tableRow = covidTable.insertRow(i + 1);

    tableRow.insertCell(0).innerHTML = `${stringI}).`;
    tableRow.insertCell(1).innerHTML = `${Jadata.statewise[i].state}`;
    tableRow.insertCell(2).innerHTML = `${Jadata.statewise[i].active}`;
    tableRow.insertCell(3).innerHTML = `${Jadata.statewise[i].recovered}`;
    tableRow.insertCell(4).innerHTML = `${Jadata.statewise[i].deaths}`;
    tableRow.insertCell(5).innerHTML = `${Jadata.statewise[i].deltaconfirmed}`;
    tableRow.insertCell(6).innerHTML = `${Jadata.statewise[i].deltarecovered}`;
    tableRow.insertCell(7).innerHTML = `${Jadata.statewise[i].deltadeaths}`;
    tableRow.insertCell(8).innerHTML = `${Jadata.statewise[i].lastupdatedtime}`;

    // tableRow.insertCell(3).innerHTML=`${Jadata.statewise[i].confirmed}`;
  }
}
fetchingData();


function filterFunction() {
  // Declare variables
  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("myInputState");
  filter = input.value.toUpperCase();
  tr = covidTable.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        tr[0].style.display = "";
      } else {
        tr[i].style.display = "none";
        tr[0].style.display = "";
      }
    }
  }
}
