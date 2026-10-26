const newTaskTitleInput = document.getElementById('new-task__input');
const newTaskAddButton = document.getElementById('new-task__add-button');
const incompleteTasksList = document.getElementById('incomplete-tasks__list');
const completedTasksList = document.getElementById('completed-tasks__list');

const createElementWithClass = (elementTag, className) => {
  const element = document.createElement(elementTag);
  element.classList.add(className);

  return element;
};

const createNewTaskElement = (taskTitle) => {
  const taskElement = createElementWithClass('li', 'task');
  const taskCheckBox = document.createElement('input');
  const taskTitleLabel = createElementWithClass('label', 'task__title');
  const taskEditTitleInput = document.createElement('input');
  const taskEditButton = createElementWithClass('button', 'task__edit-button');
  const taskDeleteButton = createElementWithClass('button', 'task__delete-button');
  const taskDeleteButtonImage = document.createElement('img');

  taskTitleLabel.innerText = taskTitle;
  taskEditButton.innerText = 'Edit';

  taskCheckBox.type = 'checkbox';
  taskEditTitleInput.type = 'text';

  taskDeleteButtonImage.src = './src/assets/remove.svg';

  taskDeleteButton.append(taskDeleteButtonImage);
  taskElement.append(taskCheckBox, taskTitleLabel, taskEditTitleInput, taskEditButton, taskDeleteButton);

  return taskElement;
};

const handleCreateNewTask = () => {
  if (!newTaskTitleInput.value) return;

  const taskElement = createNewTaskElement(newTaskTitleInput.value);
  incompleteTasksList.append(taskElement);
  bindTaskEvents(taskElement);

  newTaskTitleInput.value = '';
};

const handleToggleTaskEditMode = (event) => {
  const taskElement = event.currentTarget.parentElement;
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

const handleDeleteTask = (event) => {
  const taskElement = event.currentTarget.parentElement;
  taskElement.remove();
};

// Merged task status functions into a single toggle function to simplify event handling logic.
const handleToggleTaskStatus = (event) => {
  const taskElement = event.currentTarget.parentElement;
  const isTaskComplete = event.currentTarget.checked;

  if (isTaskComplete) {
    completedTasksList.append(taskElement);
  } else {
    incompleteTasksList.append(taskElement);
  }
};

const bindTaskEvents = (taskElement) => {
  const taskCheckBox = taskElement.querySelector('input[type=checkbox]');
  const taskEditButton = taskElement.querySelector('.task__edit-button');
  const taskDeleteButton = taskElement.querySelector('.task__delete-button');

  taskEditButton.addEventListener('click', handleToggleTaskEditMode);
  taskDeleteButton.addEventListener('click', handleDeleteTask);
  taskCheckBox.addEventListener('change', handleToggleTaskStatus);
};

// Combined the loops into a single function since they perform the same task.
const bindEventsToExistingTasks = () => {
  const completedTasks = completedTasksList.children;
  const incompleteTasks = incompleteTasksList.children;
  const allTasks = [...completedTasks, ...incompleteTasks];

  for (const task of allTasks) {
    bindTaskEvents(task);
  }
};

newTaskAddButton.addEventListener('click', handleCreateNewTask);

bindEventsToExistingTasks();
