const defaultSchedule = {
  "Lun": [],
  "Mar": [],
  "Mie": [],
  "Jue": [],
  "Vier": [],
}

var mySchedule = defaultSchedule;

function loadData(){
  var stringData = localStorage.getItem("schedule-json-data");
  if (stringData == null) return;

  mySchedule = JSON.parse(stringData);
}