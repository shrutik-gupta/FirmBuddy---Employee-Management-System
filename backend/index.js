import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js'
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingsRouter from './routes/settings.js';
import dashboardRouter from './routes/dashboard.js';

connectToDatabase()
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/departments',departmentRouter)
app.use('/api/employees',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/settings',settingsRouter)
app.use('/api/dashboard',dashboardRouter)

app.get('/', (req,res)=>{
    res.send("hello world");
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})