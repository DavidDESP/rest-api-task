import Task from "../models/Task";
import {getPagination} from '../libs/getPagination';

export const createTask = async (req, res) => {
    //console.log(req.body);
    //Capa de validacion con un 400 a traves del res.status
    if(!req.body.title) {
        return res.status(400).send({message: 'Title is required'})
    }
    try {
        const newTask = new Task({
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false //Si existe colocalo, si no existe, usa false.
        });
        const taskSaved = await newTask.save();
        console.log(newTask);
        res.json(taskSaved);
    }

    catch (error){
        res.status(500).json({
            message: error.message || 'Something went wrong creating the task'
        });
    }
};

export const findAllTasks = async (req, res) => {
    try {
        const { size, page, title } = req.query // {limit, offset, title}

        const condition = title ? {
            title: {$regex: new REgExp(title), $options: "i"},
        } : {}; //El : significa caso contrario. El ? significa, existe?


        const { limit, offset } = getPagination(page, size);

        const data = await Task.paginate(condition, {},{ offset: offset, limit: limit });
        //res.json(data);
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        })
    }
    catch (error){
        res.status(500).json({
            message: error.message || 'Something went wrong retrieving the tasks'
        });
    }
}

export const findOneTask = async (req, res) => {
    //console.log(req.params.id); //params es todo lo extra que se le pasa a la ruta, ej. /id
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if(!task) 
            return res
                .status(400)
                .json({message: `Task under ID ${id} does not exists.` });
        res.json(task); 
    }
    catch (error) {
        res.status(500).json({
            message: error.message || `Error retreving Task under ID ${id}.`
        });
    }
    

    
};

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({done: true});
    res.json(tasks);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({
        message: `Task has been deleted sucecssfully`
        })
    }
    catch (error){
        res.status(500).json({
            message: error.message || `Error deleting Task under ID ${id}.`
        });
    }
}

export const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: 'Task has been updated successfully'});
}


//CONTINUAR HORA 1:40:00
//Paginacion
