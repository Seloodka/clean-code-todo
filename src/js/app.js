const newTaskTitleInput = document.getElementById('new-task');
const newTaskAddButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incomplete-tasks__list');
const completedTasksList = document.getElementById('completed-tasks__list');

const createNewTaskElement = function (taskTitle) {
  const taskElement = document.createElement('li');
  const taskCheckBox = document.createElement('input');
  const taskTitleLabel = document.createElement('label');
  const taskEditTitleInput = document.createElement('input');
  const taskEditButton = document.createElement('button');
  const taskDeleteButton = document.createElement('button');
  const taskDeleteButtonImage = document.createElement('img');

  taskTitleLabel.innerText = taskTitle;
  taskTitleLabel.className = 'task__title';

  taskCheckBox.type = 'checkbox';
  taskEditTitleInput.type = 'text';
  taskEditTitleInput.className = 'task';

  taskEditButton.innerText = 'Edit';
  taskEditButton.className = 'task__edit-button';

  taskDeleteButton.className = 'task__delete-button';
  taskDeleteButtonImage.src = './src/assets/remove.svg';
  taskDeleteButton.appendChild(taskDeleteButtonImage);

  taskElement.appendChild(taskCheckBox);
  taskElement.appendChild(taskTitleLabel);
  taskElement.appendChild(taskEditTitleInput);
  taskElement.appendChild(taskEditButton);
  taskElement.appendChild(taskDeleteButton);

  return taskElement;
};

const handleCreateNewTask = function () {
  if (!newTaskTitleInput.value) return;

  const taskElement = createNewTaskElement(newTaskTitleInput.value);
  incompleteTasksList.appendChild(taskElement);

  bindTaskEvents(taskElement, handleTaskComplete);

  newTaskTitleInput.value = '';
};

const handleToggleTaskEditMode = function () {
  const taskElement = this.parentNode;
  const taskEditTitleInput = taskElement.querySelector('input[type=text]');
  const taskTitleLabel = taskElement.querySelector('label');
  const taskEditButton = taskElement.querySelector('.task__edit-button');
  const isEditModeActive = taskElement.classList.contains('task--edit-mode');

  if (isEditModeActive) {
    taskTitleLabel.innerText = taskEditTitleInput.value;
    taskEditButton.innerText = 'Edit';
  } else {
    taskEditTitleInput.value = taskTitleLabel.innerText;
    taskEditButton.innerText = 'Save';
  }

  taskElement.classList.toggle('task--edit-mode');
};

const handleDeleteTask = function () {
  const taskElement = this.parentNode;
  const tasksList = taskElement.parentNode;

  tasksList.removeChild(taskElement);
};

const handleTaskComplete = function () {
  const taskElement = this.parentNode;
  completedTasksList.appendChild(taskElement);
  bindTaskEvents(taskElement, handleTaskIncomplete);
};

const handleTaskIncomplete = function () {
  const taskElement = this.parentNode;
  incompleteTasksList.appendChild(taskElement);
  bindTaskEvents(taskElement, handleTaskComplete);
};

const bindTaskEvents = function (taskElement, checkBoxEventHandler) {
  const taskCheckBox = taskElement.querySelector('input[type=checkbox]');
  const taskEditButton = taskElement.querySelector('.task__edit-button');
  const taskDeleteButton = taskElement.querySelector('.task__delete-button');

  taskEditButton.onclick = handleToggleTaskEditMode;
  taskDeleteButton.onclick = handleDeleteTask;
  taskCheckBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], handleTaskComplete);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], handleTaskIncomplete);
}

newTaskAddButton.addEventListener('click', handleCreateNewTask);
