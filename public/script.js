const inputArea = document.getElementById("input-area");
const listContainer = document.getElementById("list-container");

function addMission(){
    if(inputArea.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputArea.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // This adds a "×" symbol for removal
        li.appendChild(span);
    }
    inputArea.value = ""; // Clear input field
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // Toggles the "checked" class on click
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); // Removes the list item when clicking "×"
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showMission(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showMission();