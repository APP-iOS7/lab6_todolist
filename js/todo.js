
function addTodo(text, checked = false) {
    const li = document.createElement('li');

    // 체크박스
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('');
    checkbox.checked = checked;

    // 텍스트
    const spanElement = document.createElement('span');
    spanElement.classList('');
    spanElement.textContent = text;

    spanElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    // 체크박스 이벤트
    checkbox.addEventListener('change', () => {});

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