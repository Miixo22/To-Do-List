// Load tasks from local storage when the page loads
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listContainer = document.getElementById("list-container");
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.checked);
    });
};

// Function to handle the Enter keypress
document.getElementById("input-area").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addMission(); // Call the addMission function
        event.preventDefault(); // Prevent default form submission behavior
    }
});

// Add a task
function addMission() {
    const inputArea = document.getElementById("input-area");
    const taskText = inputArea.value.trim(); // Get and trim the input text

    if (taskText === "") {
        alert("Please enter a task!");
        return; // Exit if input is empty
    }

    // Add task to the UI
    addTaskToList(taskText, false);

    // Save the task to local storage
    saveTask(taskText, false);

    // Clear the input field
    inputArea.value = "";
}

// Add a task to the UI
function addTaskToList(text, checked) {
    const listContainer = document.getElementById("list-container");
    const li = document.createElement("li");
    li.textContent = text;
    if (checked) li.classList.add("checked");

    // Toggle checked status
    li.addEventListener("click", () => {
        li.classList.toggle("checked");
        updateTaskStatus(text, li.classList.contains("checked"));
    });

    // Add a close (delete) button
    const span = document.createElement("span");
    span.textContent = "×"; // Unicode for '×'
    span.addEventListener("click", () => {
        li.remove(); // Remove task from UI
        deleteTask(text); // Remove task from local storage
    });

    li.appendChild(span);

    // Add the new task to the top of the list
    listContainer.insertBefore(li, listContainer.firstChild);
}

// Function to display the current date
function displayDate() {
    const dateContainer = document.getElementById('date-container');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString(undefined, options);
    dateContainer.textContent = today;
}

// Call the function on page load
displayDate();


// Save task to local storage
function saveTask(text, checked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, checked });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task status in local storage
function updateTaskStatus(text, checked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.text === text);
    if (task) task.checked = checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAll() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = ""; // Clears all tasks from the UI
    localStorage.removeItem("tasks"); // Removes all tasks from local storage
}