const localStorageKey = 'to-do-list';
const historyKey = 'completed-tasks';
const horas = new Date().getHours();

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !!exists;
}

function newTask() {
    let input = document.getElementById('input-new-task');

    // Validação
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição');
    } else {
        // Adiciona ao localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({ name: input.value });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='completeTask("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg></button></li>`;
    }
}

function completeTask(data) {
    // Remove da lista de tarefas pendentes
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    if (index !== -1) {
        let completedTask = values.splice(index, 1)[0]; // Remove e pega o item
        localStorage.setItem(localStorageKey, JSON.stringify(values));

        // Adiciona ao histórico de tarefas concluídas
        let completedTasks = JSON.parse(localStorage.getItem(historyKey) || "[]");
        completedTasks.push(completedTask);
        localStorage.setItem(historyKey, JSON.stringify(completedTasks));

        showValues(); // Atualiza a lista de tarefas pendentes
        showHistory(); // Atualiza o histórico de tarefas concluídas
    }
}

function showHistory() {
    let completedTasks = JSON.parse(localStorage.getItem(historyKey) || "[]");
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    // Inverte a ordem das tarefas concluídas (a mais recente fica no topo)
    completedTasks.reverse();

    for (let i = 0; i < completedTasks.length; i++) {
        historyList.innerHTML += `<li>${completedTasks[i]['name']}</li>`;
    }
}

// Inicializa as listas ao carregar a página
showValues();
showHistory();