// DOM 요소들을 미리 저장
const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
  // li 요소 만들기
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('list-group-item');

  // 체크박스 만들기
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('form-check-input');
  checkbox.checked = checked;

  // 체크박스 상태에 따라 취소선 처리
  li.style.textDecoration = checked ? 'line-through' : 'none';
  
  // 체크박스 클릭시 처리
  checkbox.addEventListener('change', () => {
    li.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    
    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos[index].checked = checkbox.checked;
    saveTodos(todos);
  });

  li.prepend(checkbox);
  todoListElement.append(li);
}