import { pool } from "../config/connection";

const initializeDatabase = async () => {
  const client = await pool.connect();

  try {
    // Criação da tabela
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        coordinate_x INT,
        coordinate_y INT
      );
    `);

    console.log("Table created successfully");

    // População da tabela
    await client.query(`
      INSERT INTO clients (name, email, phone, coordinate_x, coordinate_y)
      VALUES
        ('João Filho', 'joao@example.com', '981023380', 1, 2),
        ('Mariana Fernandes', 'mariana@example.com', '994991461', 7, 14),
        ('Kelsiane Lima', 'Kelsiane@example.com', '987664385', 53, 92);
    `);

    console.log("Table populated successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.release();
  }
};

initializeDatabase();
