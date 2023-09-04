loadData();

const daysButtons = document.querySelectorAll("div.day-item-container");
const daysCodes = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vier", "Sab"];
const usedDaysCodes = ["Lun", "Mar", "Mie", "Jue", "Vier"];
var lastDaySelected = "placeholder";

const itemsContainer = document.getElementById("schedule-items-container");


// Load current day

var dateObject = new Date;
var today = dateObject.getDay();
if (usedDaysCodes.includes(daysCodes[today])){
  dayID = daysCodes[today];
  lastDaySelected = dayID;
}else{
  lastDaySelected = "Lun";
}

changeDay(lastDaySelected);



// Listen for clicks
document.addEventListener("click", (event) => {
  changeDay(event.target.getAttribute("id"));
});



// Change day

function changeDay(newDayID){
  if (!usedDaysCodes.includes(newDayID)) return;
  if (document.getElementById(lastDaySelected)) document.getElementById(lastDaySelected).classList.remove("selected"); 
  document.getElementById(newDayID).classList.add("selected");
  lastDaySelected = newDayID;

  render(newDayID);
}

function render(day) {
  if (!Object.keys(mySchedule).includes(day)) return;
  itemsContainer.innerHTML = "";

  mySchedule[day].forEach((subject) => {
    var newElement = getToRenderElement(subject);
    itemsContainer.appendChild(newElement);
  });
}


function getToRenderElement(jsonData){
  var container = document.createElement("div");
  container.setAttribute("class", "schedule-item");

  var pHeader = document.createElement("p");
  pHeader.setAttribute("class", "schedule-header");
  pHeader.innerText = jsonData.subject;

  var pTime = document.createElement("p");
  pTime.setAttribute("class", "schedule-time");
  pTime.innerText = jsonData.time;

  var pTeacher = document.createElement("p");
  pTeacher.setAttribute("class", "schedule-teacher");
  pTeacher.innerText = jsonData.teacher;

  container.appendChild(pHeader);
  container.appendChild(pTime);
  container.appendChild(pTeacher);

  jsonData.links.forEach((link) => {
    var newLinks = document.createElement("a");
    newLinks.setAttribute("class", "schedule-link");
    newLinks.setAttribute("href", link);
    newLinks.setAttribute("rel", "noreferrer");
    newLinks.setAttribute("target", "_blank");
    newLinks.innerText = link;
    container.appendChild(newLinks);
  });

  return container;

}