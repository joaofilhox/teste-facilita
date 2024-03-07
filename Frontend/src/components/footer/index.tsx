import React from 'react';
import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        &copy; 2024 João Filho. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
