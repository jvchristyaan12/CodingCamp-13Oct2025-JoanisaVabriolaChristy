document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const addBtn = document.getElementById("addBtn");
  const filterBtn = document.getElementById("filterBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const taskList = document.getElementById("taskList");

  // 🔹 Ambil data dari localStorage saat halaman dibuka
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTasks(filter = false) {
    taskList.innerHTML = "";
    const filtered = filter ? todos.filter(t => !t.completed) : todos;

    if (filtered.length === 0) {
      taskList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
      return;
    }

    filtered.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${todo.text}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "✅ Done" : "⏳ Pending"}</td>
        <td>
          <button class="completeBtn" data-index="${index}">✔️</button>
          <button class="deleteBtn" data-index="${index}">🗑️</button>
        </td>
      `;
      taskList.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const date = dateInput.value;

    if (!text || !date) {
      alert("Please enter both task and date!");
      return;
    }

    todos.push({ text, date, completed: false });
    saveToLocalStorage(); // 🔹 Simpan ke localStorage
    taskInput.value = "";
    dateInput.value = "";
    renderTasks();
  });

  taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("completeBtn")) {
      todos[index].completed = !todos[index].completed;
    } else if (e.target.classList.contains("deleteBtn")) {
      todos.splice(index, 1);
    }
    saveToLocalStorage(); // 🔹 Update localStorage setiap ada perubahan
    renderTasks();
  });

  filterBtn.addEventListener("click", () => renderTasks(true));

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      todos = [];
      saveToLocalStorage(); // 🔹 Hapus semua dari localStorage
      renderTasks();
    }
  });

  // 🔹 Render saat pertama kali halaman dibuka
  renderTasks();
});
