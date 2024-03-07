import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../../components/modal';
import { CiSearch } from 'react-icons/ci';
import styles from './style.module.scss';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  coordinate_x: string;
  coordinate_y: string;
}

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchAllClients();
  }, []);

  const fetchAllClients = async () => {
    try {
      const response = await api.get<Client[]>('/clients');
      setAllClients(response.data);
      setFilteredClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSearch = () => {
    const filtered = allClients.filter(client =>
      client.name.toLowerCase().includes(name.toLowerCase()) &&
      client.email.toLowerCase().includes(email.toLowerCase()) &&
      client.phone.toLowerCase().includes(phone.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Telefone:</label>
          <input className={styles.input} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className={styles.buttonGroup}>
      <button className={styles.button} onClick={handleSearch}>
          Pesquisar <CiSearch size="15px"/>
        </button>
        <button className={styles.button1} onClick={openModal}>
          Ver Clientes por Proximidade da Empresa
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Coordenada X</th>
              <th>Coordenada Y</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.coordinate_x}</td>
                <td>{client.coordinate_y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalVisible && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Home;
