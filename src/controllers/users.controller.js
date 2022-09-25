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

export const getUserByEmail = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.query("SELECT * FROM Users WHERE Email = ?", req.query.Email);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getGarmentIMG = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.query("SELECT img_path FROM garments WHERE user_ID =  ? and garment_category = ?;", [req.query.user_ID, req.query.garment_category]);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getOutfitIMG = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.query("select outfit_ID, outfit_path, is_favorite from outfit where user_ID = ? and formality = ? and weather = ? order by model_rate desc limit 5;", [req.query.user_ID, req.query.formality, req.query.weather]);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//POST################################################################################################################################################################################
export const addNewUser = async (req, res) => {
  try {

    const { Users_Name, Last_Name, Email } = req.body;

    // validating
    if (Users_Name == null || Email == null || Last_Name == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    const pool = await getConnection();

    const body = { Users_Name, Last_Name, Email };

    await pool.query("INSERT IGNORE INTO Users SET ?", body);

    res.json("User has registered.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const addFavorite = async (req, res) => {
  try {

    const { outfit_ID } = req.body;

    const pool = await getConnection();

    const body = { outfit_ID };

    await pool.query("update outfit set is_favorite = 1 where outfit_ID = ? ", body);

    res.json("New Favorite.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};