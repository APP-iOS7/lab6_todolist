const addBtn = document.getElementById("addBtn");

function readTodos() {
  const savedTodos = localStorage.getItem("todoList");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

// todos를 읽어오고 콘솔에 출력하는 함수
function readAndLogTodos() {
  const todos = readTodos();
  todos.forEach((todo, index) => {
    console.log(`${index + 1}번: ${todo}`);
  });
}

function deleteTodos() {
  const todos = readTodos();
  const index = Array.from(FileList.parentElement.children).indexOf(li);
  todos[index].checked = checkbox.checked;
  // MARK: - UPDATE(todos); 로컬 스토리지에 저장
  li.remove();
}

function main() {
  const todos = readTodos();

  todos.forEach((todo) => {
    // MARK: - CREATE(todos);
  });

  addBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return; // 빈 입력 방지

    // 새로운 할일 추가
    // MARK: - CREATE(todos);

    // localStorage 업데이트
    // MARK: - const todos = readTodos();
    todos.push({ text: todoInput.value, checked: false });
    // saveTodos(todos);

    // 입력창 비우기
    todoInput.value = "";
  });
}

document.addEventListener("DOMContentLoaded", main);
