import { createSlice } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        ...action.payload,
        // id: uuidv4(), // Generate UUID when adding a task
      };
      state.tasks.push(task);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    loadTasksFromStorage: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, loadTasksFromStorage } = tasksSlice.actions;

export default tasksSlice.reducer;
