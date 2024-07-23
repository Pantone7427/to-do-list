"use strict";
// Variable para contar el número de tareas
let IdCounter = 0;
// Seleccionamos elementos del DOM
const input = document.querySelector('input[type="text"]');
const userInput = document.getElementById('userInput');
const list = document.getElementById('list');
const stats = document.getElementById('stats');
// Evento para manejar el formulario
userInput.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
    addTask(); // Llamar a la función para agregar una tarea
});
// Función para agregar una nueva tarea
const addTask = () => {
    IdCounter++;
    const newValue = input.value.trim(); // Obtener el valor del input
    if (newValue === '') { // Verificar que el input no esté vacío
        alert('Por favor, escribe una tarea.');
        return;
    }
    // Crear los elementos HTML para la nueva tarea
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.id = IdCounter.toString();
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const taskText = document.createTextNode(newValue);
    const closeBtn = document.createElement('img');
    closeBtn.src = './img/bote-de-basura.png';
    closeBtn.className = 'closeBtn';
    // Añadir los elementos al DOM
    label.appendChild(checkbox);
    label.appendChild(taskText);
    taskContainer.appendChild(label);
    taskContainer.appendChild(closeBtn);
    list.appendChild(taskContainer);
    input.value = ''; // Limpiar el campo de entrada
    updateStats(); // Actualizar estadísticas de tareas
};
// Evento para manejar clicks en la lista de tareas
list.addEventListener('click', (event) => {
    const target = event.target; // Afirmar el tipo del evento
    if (target.nodeName === 'INPUT') {
        updateStats(); // Actualizar estadísticas si se marca/desmarca una tarea
    }
    else if (target.nodeName === 'IMG') {
        deleteTask(target.parentElement.id); // Llamar a la función para eliminar una tarea
    }
});
// Función para actualizar las estadísticas de tareas
const updateStats = () => {
    const elements = list.querySelectorAll('div');
    const checkboxes = list.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p>Tareas pendientes: ${elements.length} completadas: ${checkboxes.length}</p>`;
};
// Función para eliminar una tarea
const deleteTask = (id) => {
    const taskToDelete = document.getElementById(id);
    list.removeChild(taskToDelete);
    updateStats(); // Actualizar estadísticas después de eliminar una tarea
};
