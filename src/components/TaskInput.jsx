import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/reducers/tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const dispatch = useDispatch();

    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim() === '') {
            alert('Please enter a task!');
            return;
        }
        const newTask = {
            text: task,
            priority: priority,
            id: uuidv4()
        };

        dispatch(addTask(newTask));

        // Update localStorage after Redux state change
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));

        setTask('');
        setPriority('Medium');
    };

    return (
        <div className="p-4 bg-gradient-to-b from-blue-50 to-blue-200 rounded-md shadow-md mx-auto max-w-7xl m-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">To-do</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Add a task"
                    className="bg-transparent rounded-md p-3 w-full border border-gray-300 focus:outline-none"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        className="bg-transparent rounded-md p-3 border border-gray-300 focus:outline-none w-full sm:w-1/3"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option className='text-red-600' value="High">High</option>
                        <option className='text-yellow-600' value="Medium">Medium</option>
                        <option className='text-green-600' value="Low">Low</option>
                    </select>
                    <button
                        onClick={handleAddTask}
                        className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 w-full sm:w-auto"
                    >
                        ADD TASK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskInput;
