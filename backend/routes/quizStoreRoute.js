import express from 'express';
import { saveResult,getUserResults } from '../controllers/kanjiController.js';

const router = express.Router();

router.post('/save-result',saveResult);
router.get('/get-results/', getUserResults);

export default router;
