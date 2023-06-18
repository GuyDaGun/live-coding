import express from 'express';
var router = express.Router();
import { getAllBlocks, validateCodeBlock } from '../controllers/codeBlockControllers.js';
router.get('/', getAllBlocks);
router.post('/validate', validateCodeBlock);
export default router;
//# sourceMappingURL=codeBlocksRoutes.js.map