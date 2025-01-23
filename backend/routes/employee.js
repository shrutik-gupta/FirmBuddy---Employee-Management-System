import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepartment } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/add', authMiddleware, upload.single('emp_image'), addEmployee)
router.get('/', authMiddleware, getEmployees)
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, updateEmployee)
router.get('/department/:deptId', authMiddleware, fetchEmployeesByDepartment)

export default router;