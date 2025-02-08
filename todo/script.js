document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let editingTask = null; // Tracks the task currently being edited

  // Add or Edit Task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    if (editingTask) {
      // Update the existing task
      editingTask.querySelector("span").textContent = taskText;
      editingTask = null;
      taskInput.value = "";
    } else {
      // Add a new task
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  });

  // Create Task Item
  function createTaskItem(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(li, span));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(li));

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(li));

    li.append(span, editBtn, deleteBtn, completeBtn);

    // Enable Enter key for toggling completion
    li.addEventListener("keydown", (e) => handleKeyDown(e, li));
    return li;
  }

  // Edit Task
  function editTask(li, span) {
    taskInput.value = span.textContent; // Populate input with current task text
    taskInput.focus(); // Focus the input field
    editingTask = li; // Set the task being edited
  }

  // Delete Task
  function deleteTask(li) {
    taskList.removeChild(li);
  }

  // Toggle Complete
  function toggleComplete(li) {
    li.classList.toggle("completed");
  }

  // Handle Enter Key
  function handleKeyDown(e, li) {
    if (e.key === "Enter") {
      toggleComplete(li);
    }
  }

  // Enable Enter for Adding or Editing via Input
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      taskForm.dispatchEvent(new Event("submit")); // Trigger the form submit event
    }
  });

  // Add keyboard focus to tasks for accessibility
  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" || e.target.closest("li")) {
      const li = e.target.closest("li");
      li.focus();
    }
  });
});