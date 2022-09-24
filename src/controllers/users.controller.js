import { getConnection, queries, sql } from "../database";
import { config } from "dotenv";

//GET###############################################################################################################################################################################################
export const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.query(queries.getAllUsers);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};