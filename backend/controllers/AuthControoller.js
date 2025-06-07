import pool from "../models/db.js";

export const saveUser = async (req, res) => {
  const { email, name, auth0_id } = req.body;
  //console.log('Request body:', req.body); 

  try {
    await pool.query(
      `INSERT INTO users (auth0_id, email, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (auth0_id) DO NOTHING`,
      [auth0_id, email, name]
    );

    res.status(200).json({ message: 'User saved' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
};


