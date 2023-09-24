  // Load tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Function to update the task list
        function updateTaskList() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    ${task}
                    <button type="button" class="btn btn-outline-danger btn-sm float-right delete-btn" data-index="${index}" data-toggle="modal" data-target="#deleteModal">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm float-right edit-btn" data-index="${index}">
                        <i class="fas fa-edit"></i>
                    </button>
                `;
                taskList.appendChild(listItem);
            });

            // Attach event listeners to edit buttons
            const editButtons = document.querySelectorAll('.edit-btn');

            editButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    const updatedTask = prompt('Edit task:', tasks[index]);
                    if (updatedTask !== null) {
                        tasks[index] = updatedTask;
                        updateTaskList();
                        saveTasksToLocalStorage();
                    }
                });
            });
        }

        // Save tasks to localStorage
        function saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

      // Add a new task
    document.getElementById('addButton').addEventListener('click', function () {
        const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();

    if (newTask === '') {
        // Show a SweetAlert with a "danger" icon for empty input
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Task cannot be empty!',
        });
    } else {
        tasks.push(newTask);
        taskInput.value = '';
        updateTaskList();
        saveTasksToLocalStorage();
        Swal.fire({
            icon: 'success',
            title: 'Task Added!',
            showConfirmButton: false,
            timer: 1500 // Auto close after 1.5 seconds
        });
    }
    });

    // Confirm task deletion using a Bootstrap modal
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteIndexInput = document.getElementById('deleteIndex');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteIndexInput.value = index;
        });
    });

    // Delete task when modal confirmation is given
    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
        const index = deleteIndexInput.value;
        tasks.splice(index, 1);
        updateTaskList();
        saveTasksToLocalStorage();
        $('#deleteModal').modal('hide'); // Hide the modal

        // Replace alert with SweetAlert2 success notification
        Swal.fire({
            icon: 'success',
            title: 'Task Deleted!',
            showConfirmButton: false,
            timer: 1500 // Auto close after 1.5 seconds
        });
    });


    // Function to clear all tasks
function showClearAll() {
    $('#clearAllModal').modal('show'); // Hide the confirmation modal
}

// Add an event listener to the "Clear All" button
document.getElementById('clearAllButton').addEventListener('click', showClearAll);


    function clearAllTasks() {
    tasks.length = 0; // Clear the tasks array
    updateTaskList();
    saveTasksToLocalStorage();
    Swal.fire({
        icon: 'success',
        title: 'All Tasks Cleared!',
        showConfirmButton: false,
        timer: 1500 // Auto close after 1.5 seconds
    });
    $('#clearAllModal').modal('hide'); // Hide the confirmation modal
}

// Add an event listener to the "Clear All" button in the modal
document.getElementById('confirmClearAllButton').addEventListener('click', clearAllTasks);

    
    // Initial task list rendering
    updateTaskList();
