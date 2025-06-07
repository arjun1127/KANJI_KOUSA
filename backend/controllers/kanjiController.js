import pool from '../models/db.js';

export const getKanji = async (req, res) => {
  const { q, level } = req.query;

  try {
    let baseQuery = 'SELECT * FROM kanji';
    const conditions = [];
    const values = [];

    if (q) {
      conditions.push('(character ILIKE $1 OR meaning ILIKE $1)');
      values.push(`%${q}%`);
    }

    if (level) {
      const index = values.length + 1;
      conditions.push(`level = $${index}`);
      values.push(level.toUpperCase());
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' ORDER BY id';

    const result = await pool.query(baseQuery, values);
    res.json(result.rows);
  } catch (error) {
    //console.error('Error fetching kanji:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const saveResult = async (req, res) => {
  const { email, level, score } = req.body;
  try {
    await pool.query(
      'INSERT INTO user_quiz_results (user_email, level, score, total) VALUES ($1, $2, $3, $4)',
      [email, level, score, 20]
    );

    res.status(201).json({ message: 'Result saved' });
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserResults = async (req, res) => {
  const { email } = req.query;
  //console.log("Email received in query:", email);
  try {
    const result = await pool.query(
      'SELECT * FROM user_quiz_results WHERE user_email = $1 ORDER BY taken_at DESC',
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
