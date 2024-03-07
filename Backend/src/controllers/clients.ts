import { Request, Response } from "express";
import { pool } from "../config/connection";
import { Client } from "../interfaces/clientInterfaces";

export class Clients {
  public async listClients(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone } = req.body;
      const { query, values } = Clients.buildQuery(name, email, phone);

      const result = await pool.query(query, values);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  public async registerClient(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, coordinate_x, coordinate_y } = req.body;

    try {
      if (await Clients.checkIfEmailExists(email)) {
        return res.status(400).json({
          message: "Já existe usuário cadastrado com o e-mail informado.",
        });
      }

      const query =
        "INSERT INTO clients (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [name, email, phone, coordinate_x, coordinate_y];

      const { rows } = await pool.query(query, values);
      const clientRegistered = Clients.mapClient(rows[0]);

      return res.status(201).json(clientRegistered);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  private static async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const result = await pool.query("SELECT * FROM clients WHERE email = $1", [
        email,
      ]);
      return result && result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error("Erro ao verificar existência de e-mail:", error);
      throw error;
    }
  }

  private static buildQuery(name: string, email: string, phone: string): { query: string, values: any[] } {
    let query = "SELECT * FROM clients WHERE 1=1";
    const values: any[] = [];

    if (name) {
      query += " AND name = $1";
      values.push(name);
    }

    if (email) {
      query += ` AND email = $${values.length + 1}`;
      values.push(email);
    }

    if (phone) {
      query += ` AND phone = $${values.length + 1}`;
      values.push(phone);
    }

    return { query, values };
  }

  private static mapClient(row: any): Client {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      coordinate_x: row.coordinate_x,
      coordinate_y: row.coordinate_y,
    };
  }
}
