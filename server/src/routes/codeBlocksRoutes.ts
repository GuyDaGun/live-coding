import express from 'express'
const router = express.Router();

import {getAllBlocks, validateCodeBlock} from '../controllers/codeBlockControllers.js';

router.get('/', getAllBlocks);
router.post('/validate', validateCodeBlock)

export default router;