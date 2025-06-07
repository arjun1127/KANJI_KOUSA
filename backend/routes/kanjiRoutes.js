import express from 'express';
import { getKanji,saveResult,getUserResults } from '../controllers/kanjiController.js';

const router = express.Router();

router.get('/',getKanji);


export default router;
