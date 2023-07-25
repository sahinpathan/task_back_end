const express = require('express');
const router = express.Router();
const { UserTask } = require('../models/UserTask');
const { User } = require('../models/User');

router.post('/create', async (req,res)=>{
    let task = new UserTask({
        title: req.body.title,
        description:req.body.description,
        status:req.body.status,
        user:req.body.userId,
    })
    task = await task.save();

    if(!task)
    return res.status(400).send('the task cannot be created!')

    res.send(task);
})

router.put('/update/:id', async (req,res)=>{
    const taskId = req.params.id;
    let task = {
        title: req.body.title,
        description:req.body.description,
        status:req.body.status
    }
    let query = {_id:taskId}
    // task.updateOne()
    task = await UserTask.findOneAndUpdate(query, { $set:task}, {})

    if(!task)
    return res.status(400).send('the task cannot be updated!')

    res.send(task);
})

router.delete('/delete/:id', async (req,res)=>{
    const taskId = req.params.id;
    task = await UserTask.findByIdAndRemove(taskId)
    if(!task)
    return res.status(400).send('the task cannot be deleted!')
    res.send({message:"Task deleted successfully"});
})

router.post('/get-tasks', async (req,res)=>{
   let task = await UserTask.findOne({ id: req.taskId }).populate('users');
    if(!task)
    return res.status(400).send('the task cannot be get!')
    res.send(task);
})


router.post('/get-task-by-user', async (req,res)=>{
    const getTasksByUserId = async (userId) => {
        try {
          const user = await User.findOne({ _id: userId });
      
          if (!user) {
            console.log('User not found');
            return [];
          }
          const tasks = await UserTask.find({ user: user.id });
          return tasks;
        } catch (error) {
          console.error('Error fetching tasks:', error);
          return [];
        }
      };
            
      getTasksByUserId(req.body.userId)
        .then((tasks) => {
          res.send(tasks);
        })
        .catch((err) => res.status(400).send('the task not found for user'));
 })



module.exports =router;