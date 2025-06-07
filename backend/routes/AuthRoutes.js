import express from 'express';
import { saveUser } from '../controllers/AuthControoller.js';

const router = express.Router();

router.post('/save-user', saveUser);

export default router;
