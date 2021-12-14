import { config } from 'dotenv'
config(); //Apenas cargue la app, el sistema va a cargar automaticamente

export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb:localhost/tasksdb'
}