const todoListElement = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false, date = null, elementIndex = null) {
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );

  // 체크박스
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-check-input");
  checkbox.checked = checked;

  // 텍스트
  const spanElement = document.createElement("span");
  spanElement.classList.add("ms-2", "flex-grow-1");
  spanElement.textContent = text;

  spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

  // 현재 날짜와 시간
  const now = date ? new Date(date) : new Date(); // 전달된 날짜가 없으면 현재 날짜 사용
  const formattedDate = formatDate(now);

  // 날짜 표시
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("text-muted", "ms-3");
  dateSpan.textContent = formattedDate;

  dateSpan.style.color = "#6c757d"; // 회색
  dateSpan.style.fontSize = "0.85rem"; // 작은 글씨

  // 체크박스 클릭시 처리
  checkbox.addEventListener("change", () => {
    li.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // localStorage 업데이트
    const todos = readTodos();
    // ul index
    const index = elementIndex === null ? Array.from(li.parentElement.children).indexOf(li) : elementIndex;
    todos[index].checked = checkbox.checked;
    todos[index].date = now.toISOString();
    saveTodos(todos);
  });

  // 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => {
    const index = elementIndex === null ? Array.from(li.parentElement.children).indexOf(li) : elementIndex;
    deleteTodos(index, li); // index를 매개변수로 전달
  });

  // 수정 버튼
  const updateButton = document.createElement("button");
  updateButton.classList.add("btn", "btn-info", "btn-sm", "ms-2");
  updateButton.textContent = "수정";
  updateButton.addEventListener("click", () => {
    const index = elementIndex === null ? Array.from(li.parentElement.children).indexOf(li) : elementIndex;
    updateTodos(index, spanElement);
  });

  li.prepend(checkbox);
  li.append(spanElement);
  li.append(dateSpan);
  li.append(updateButton);
  li.append(deleteButton);
  todoListElement.append(li);
}

function readTodos() {
  const savedTodos = localStorage.getItem("todoList");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function deleteTodos(index, li) {
  const todos = readTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  li.remove();
}

function formatDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date >= today) {
    return "오늘";
  } else if (date >= yesterday) {
    return "어제";
  }

  const year = date.getFullYear().toString().slice(-2); // 연도 마지막 두 자리
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

function updateTodos(index, spanElement) {
  const todos = readTodos();

  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  document.getElementById("updateText").value = todos[index].text;
  myModal.show();

  document.getElementById("updateOK").addEventListener("click", () => {
    const updateText = document.getElementById("updateText").value;
    todos[index].text = updateText;
    spanElement.textContent = updateText;
    saveTodos(todos);
    myModal.hide();
  });
}

function main() {
  const todos = readTodos();
  todos.forEach((todo) => {
    addTodo(todo.text, todo.checked, todo.date);
    console.log(todo);
  });

  addBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return; // 빈 입력 방지

    addTodo(todoInput.value);

    readTodos(todoInput.value);
    todos.push({ text: todoInput.value, checked: false });
    saveTodos(todos);

    // 입력창 비우기
    todoInput.value = "";
  });

  // 검색
  searchBtn.addEventListener("click", () => {
    const search = document.getElementById("searchInput").value;
    const todos = readTodos();

    todoListElement.innerHTML = "";

    todos.forEach((todo, index) => {
      if (todo.text.includes(search)) {
        console.log(index);
        addTodo(todo.text, todo.checked, todo.date, index);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
