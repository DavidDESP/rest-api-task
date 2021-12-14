import express from 'express'; //Nueva sintaxis
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './routes/tasks.routes';

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middleware
const corsOptions = {origin: 'http://localhost:3000'};
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my application'});
});

app.use('/api/tasks', TasksRoutes);

export default app;