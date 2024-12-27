const todoListElement = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
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

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = text;
  textInput.disabled = true;

  spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

  // 체크박스 클릭시 처리
  checkbox.addEventListener("change", () => {
    li.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // localStorage 업데이트
    const todos = readTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos[index].checked = checkbox.checked;
    saveTodos(todos);
  });

  // 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => {
    deleteTodos(li, checkbox); // li를 매개변수로 전달
  });

  // 수정 버튼
  const updateButton = document.createElement("button");
  updateButton.classList.add("btn", "btn-info", "btn-sm", "ms-2");
  updateButton.textContent = "수정";
  updateButton.addEventListener("click", () => {
    updateTodos(li, spanElement);
  });

  li.prepend(checkbox);
  li.append(spanElement);
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
  console.log(todos);
}

// todos를 읽어오고 콘솔에 출력하는 함수
function readAndLogTodos() {
  const todos = readTodos();
  todos.forEach((todo, index) => {
    console.log(`${index + 1}번: ${todo}`);
  });
}

function deleteTodos(li, checkbox) {
  const todos = readTodos();
  const index = Array.from(li.parentElement.children).indexOf(li);
  todos.splice(index, 1);
  saveTodos(todos);
  li.remove();
}

function updateTodos(li, spanElement) {
  const todos = readTodos();
  const index = Array.from(li.parentElement.children).indexOf(li);

  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  document.getElementById("updateText").value = todos[index].text;
  myModal.show();

  document.getElementById("updateOK").addEventListener("click", () => {
    const updateText = document.getElementById("updateText").value;
    todos[index].text = updateText;
    spanElement.textContent = updateText;
    console.log(todos[index].value);
    saveTodos(todos);
    myModal.hide();
  });
}

function main() {
  const todos = readTodos();
  todos.forEach((todo) => {
    addTodo(todo.text, todos.checked);
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
}

document.addEventListener("DOMContentLoaded", main);
