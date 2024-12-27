const todoListElement = document.getElementById('todoList');
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');

    // 체크박스
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input');
    checkbox.checked = checked;

    // 텍스트
    const spanElement = document.createElement('span');
    spanElement.classList('ms-2', 'flex-grow-1');
    spanElement.textContent = text;

    spanElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    // 체크박스 클릭시 처리
  checkbox.addEventListener('change', () => {
    li.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    
    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos[index].checked = checkbox.checked;
    saveTodos(todos);
  });

    // 삭제 버튼
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {});

    li.prepend(checkbox);
    li.append(spanElement);
    li.append(deleteButton);
    document.getElementById('').append(li);
}

// 데이터 저장
function saveTodos(todos) {
    localStorage.setItem('todoList', JSON.stringify(todos));
}



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
