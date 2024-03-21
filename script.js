const localStorageKey = 'to-do-list'

function validateIfExistsNewTask() {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input-new-task')
    input.style.border = ''
    input.value = ''

    //validation
    if(!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    }
    else if (validateIfExistsNewTask()){
        alert('Já existe uma task com essa descrição')
    }
    else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push ({
            name: input.values
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for (let i = 0; i <values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick="removeItem"("${values[1]}")>OK</button></li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()