const addBtn = document.getElementById("addBtn");

function readTodos() {
  const savedTodos = localStorage.getItem("todoList");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

// todos를 읽어오고 콘솔에 출력하는 함수
function readAndLogTodos() {
  const todos = readTodos();
  todos.forEach((todo, index) => {
    console.log(`${index + 1}번: ${todo}`);
  });
}
