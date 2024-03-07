import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import style from './style.module.scss';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  coordinate_x: string;
  coordinate_y: string;
}

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [dataFromAPI, setDataFromAPI] = useState<Client[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Client[]>('/clients');
        setDataFromAPI(response.data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div role="dialog" className={style.overlayBox}>
      <div className={style.modalBox}>
        <button className={style.closeBtn} onClick={onClose}>
          Fechar
        </button>
        <div className={style.modalContent}>
          <h1>Clientes</h1>
          <ul className={style.clientsList}>
            {!isLoading &&
              dataFromAPI &&
              dataFromAPI.map((client) => (
                <li key={client.id} className={style.client}>
                  <h3>{`${client.name}`}</h3>
                  <p>Email: {client.email}</p>
                  <p>Telefone: {client.phone}</p>
                  <p>Coordenada X: {client.coordinate_x}</p>
                  <p>Coordenada Y: {client.coordinate_y}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
