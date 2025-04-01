import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask } from '../redux/reducers/tasksSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Local states to manage completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load completed tasks from local storage on component mount
  useEffect(() => {
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Update completed tasks in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Sorting function for priority (High -> Medium -> Low)
  const sortTasksByPriority = (taskList) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return taskList.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const handleToggleComplete = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);

    // Update active tasks in Redux and local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    dispatch(deleteTask(task.id));

    // Update completed tasks list and local storage
    setCompletedTasks((prev) => [...prev, { ...task, completed: true }]);
  };

  const handleUncheckTask = (task) => {
    const updatedCompletedTasks = completedTasks.filter((t) => t.id !== task.id);

    // Update completed tasks in local storage
    setCompletedTasks(updatedCompletedTasks);

    // Add the task back to active tasks in Redux and local storage
    const updatedTasks = [...tasks, { ...task, completed: false }];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    dispatch(addTask(task));
  };

  const handleDeleteTask = (taskId, isCompleted) => {
    if (isCompleted) {
      // Remove task from completed tasks
      const updatedCompletedTasks = completedTasks.filter((task) => task.id !== taskId);
      setCompletedTasks(updatedCompletedTasks);
    } else {
      // Remove task from active tasks
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-200 rounded-md shadow-md max-w-7xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center sm:text-left text-teal-700">Task List</h2>
      {tasks.length === 0 && completedTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available. Add a task to get started!</p>
      ) : (
        <>
          <ul className="space-y-3">
            {sortTasksByPriority([...tasks]).map((task) => (
              <li
                key={task.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md shadow-sm gap-4 
                  ${task.priority === 'High' 
                    ? 'bg-red-100 border-l-4 border-red-600' 
                    : task.priority === 'Medium' 
                    ? 'bg-yellow-100 border-l-4 border-yellow-600' 
                    : 'bg-green-100 border-l-4 border-green-600'}`}
              >
                <div className="flex items-center w-full sm:w-auto">
                  <input
                    type="checkbox"
                    className="mr-3"
                    onChange={() => handleToggleComplete(task)}
                  />
                  <div>
                    <p className="font-medium break-all">{task.text}</p>
                    <span
                      className={`text-sm ${task.priority === 'High'
                        ? 'text-red-600'
                        : task.priority === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-green-600'}`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id, false)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-full sm:w-auto"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {completedTasks.length > 0 && (
            <>
              <h3 className="text-lg font-bold mt-6 text-center sm:text-left text-teal-700">Completed Tasks</h3>
              <ul className="space-y-3">
                {sortTasksByPriority([...completedTasks]).map((task) => (
                  <li
                    key={task.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-200 border-l-4 border-gray-500 rounded-md gap-4"
                  >
                    <div className="flex items-center w-full sm:w-auto">
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={true}
                        onChange={() => handleUncheckTask(task)}
                      />
                      <p className="line-through text-gray-600 break-all">{task.text}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id, true)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
