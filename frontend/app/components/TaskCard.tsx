import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>{task.dueDate}</p> {/* Duración o Fecha de realización */}
      <div style={styles.actions}>
        <FaEdit onClick={() => onEdit(task._id)} style={styles.icon} />
        <FaTrash onClick={() => onDelete(task._id)} style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '20px',
  },
};

export default TaskCard;
