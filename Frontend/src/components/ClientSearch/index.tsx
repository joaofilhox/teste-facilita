import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchParams {
  name: string;
  email: string;
  phone: string;
}

interface ClientSearchProps {
  onSearch: (searchParams: SearchParams) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search Parameters:', searchParams);
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={searchParams.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={searchParams.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={searchParams.phone}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default ClientSearch;
