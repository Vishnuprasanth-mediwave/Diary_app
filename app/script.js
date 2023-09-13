let myevents = [
  {
    id: "1",
    date: "2001/08/24",
    note: "ram birthday",
  },
];

function MakeEventCard(event){
    const div = document.createElement("div");
    div.setAttribute("class", "event-card");

    const id = `event-${event["id"]}`;
    div.setAttribute("id", id);

    const h2 = document.createElement("h2");
    h2.innerText = event["date"];

    const h3 = document.createElement("h3");
    h3.innerText = event["note"];

    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.setAttribute("class", "delete-btn");
    button.addEventListener("click", function () {
      removeEvent(event["id"]);
    });
    div.appendChild(h2);
    div.appendChild( h3);
    div.appendChild(button)

    return div;
}

function removeEvent(eventId){
    const removeIndex=myevents.findIndex((e)=>e.id == eventId);
    myevents.splice(removeIndex,1);
    saveToLocalStorage();
    updateUI();
}

function addEventForm() {
    const form = document.querySelector("#add-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let dateInput = document.querySelector("#date").value;
      let notesInput = document.querySelector("#add-notes").value;
  
      if (!dateInput) {
        alert("please enter value");
        return false;
      } else if (!notesInput) {
        alert("please enter notes");
        return false;
      } else {
        const event = {
          id: new Date().getTime(),
          date: dateInput,
          note: notesInput,
        }
          addEvent(event);
          clearValue();
          }
    });
}
function addEvent(event){
    myevents.push(event);
    sortArray();
    updateUI();
    saveToLocalStorage();
}

function clearValue(){
    const dateInput = document.querySelector("#date");
    const notesInput = document.querySelector("#add-notes");

    dateInput.value="";
    notesInput.value="";
}

function clearMyDiary(){
    const diary =document.querySelector("#my-diary");
    diary.innerHTML="";
}
function updateUI(){
    clearMyDiary();
    sortArray();
for (let event of myevents) {
  console.log(event);
  const eventCard = MakeEventCard(event);
  const app = document.querySelector("#my-diary");
  app.appendChild(eventCard)
}
}

function saveToLocalStorage(){
    const str = JSON.stringify(myevents);
    localStorage.setItem("my-event-list", str);
}

function getFromLocalStorage() {
    const str = localStorage.getItem("my-event-list");
    if (!str) {
      return myevents;
    } else {
        myevents = JSON.parse(str);
    }
}
function sortArray(){
    myevents.sort(function(a,b){
        return  new Date(b.date)-new Date(a.date);
       
    })
}
getFromLocalStorage() 
updateUI();
addEventForm();
