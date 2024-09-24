"use client";

import { FaPlus } from 'react-icons/fa';

// Definir los props que acepta el componente Header
interface HeaderProps {
  onCreate: () => void; // onCreate es una función que no recibe parámetros y no devuelve nada
}

const Header: React.FC<HeaderProps> = ({ onCreate }) => {
  return (
    <header style={styles.header}>
      <h1>Tareas</h1>
      <div style={styles.iconContainer}>
        <FaPlus onClick={onCreate} style={styles.icon} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
  },
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    cursor: 'pointer',
    color: 'white',
    fontSize: '24px',
  },
};

export default Header;
