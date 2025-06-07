import express from "express";
import dotenv from "dotenv";
import pool from "./models/db.js";
import kanjiRoutes from "./routes/kanjiRoutes.js";
import authRoutes from './routes/AuthRoutes.js';
import quizStoreRoutes from "./routes/quizStoreRoute.js"
import cors from 'cors';


dotenv.config();

const app=express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// app.get("/",(req,res)=>{
//     res.send("kanji practice is listning");
// });

// app.get('/api/test-db', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('DB test failed:', err);
//     res.status(500).send('Database connection failed');
//   }
// });


// app.post('/api/register', (req, res) => {
//   console.log(req.body);
//   res.json({ message: 'User registered successfully' });//this works correctly
// });

app.use('/api/kanji', kanjiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quiz',quizStoreRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on  http://localhost:${PORT}`);
})