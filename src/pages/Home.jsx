import React, { useEffect } from 'react';
import { Header, WeatherForecast, TaskInput, TaskList } from '../components';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/reducers/tasksSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load tasks only once on mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Clear existing tasks before loading
    localStorage.setItem('tasks', JSON.stringify([]));
    savedTasks.forEach(task => {
      dispatch(addTask(task));
    });
  }, [dispatch]);

  return (
    <div className="">
      <Header />
      <WeatherForecast />
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default Home;