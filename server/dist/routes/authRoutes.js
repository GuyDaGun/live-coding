import express from 'express';
var router = express.Router();
import { login, logout, getCurrentUser, getAllStudents, validateUser } from '../controllers/authControllers.js';
import authenticateUser from '../middleware/auth.js';
router.post('/login', login);
router.get('/logout', logout);
router.get('/getCurrentUser', authenticateUser, getCurrentUser);
router.get('/getAllStudents', getAllStudents);
router.post('/validate', validateUser);
export default router;
//# sourceMappingURL=authRoutes.js.map