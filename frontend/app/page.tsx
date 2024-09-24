"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

// Definir la interfaz para Task
interface Task {
  name: string;
  description: string;
  dueDate?: string;
  _id: string; // El ID es opcional en caso de ser una tarea nueva
}

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    axios.get<Task[]>('http://localhost:3000/items')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
        setLoading(false);
      });
  }, []);

  const handleCreate = () => {
    setCreating(true);
  };

  const handleCancel = () => {
    setCreating(false);
  };

  const handleSave = (task: Task) => {
    axios.post<Task>('http://localhost:3000/items', task)
      .then(response => {
        setTasks([...tasks, response.data]);
        setCreating(false);
      })
      .catch(error => {
        console.error('Error al guardar la tarea:', error);
      });
  };

  const handleEdit = (id: string) => {
    console.log(`Editar tarea con id ${id}`);
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/items/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la tarea:', error);
      });
  };

  return (
    <div>
      <Header onCreate={handleCreate} />
      {creating ? (
        <TaskForm onSubmit={handleSave} onCancel={handleCancel} />
      ) : loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div style={styles.cardsContainer}>
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
};

export default HomePage;
