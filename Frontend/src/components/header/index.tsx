import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Teste Facilita Jurídico</div>
        <ul className={isMenuOpen ? styles.open : ''}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Lista de Clientes
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleMenu}>
              Cadastrar Novo Cliente
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
