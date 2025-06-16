const List = require('../models/listSchema');
const User = require('../models/userSchema');
const Task = require('../models/TaskSchema');

const addNewListController = async (req, res) => {
    try {
        const { title } = req.body;
        const newList = new List({ title, user: req.user.id });
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { lists: { title, id: newList._id } }
            },
            { new: true, useFindAndModify: false }
        );
        await newList.save();
        res.status(201).json(newList);
        console.log('Adding new list:', title, req.user.id);
    } catch (error) {
        res.status(500).json({ message: 'Error creating list', error });
    }
};

const addNewTaskController = async (req, res) => {
    try {
        const { listId, taskTitle, taskDes, DueDate, taskPriority } = req.body;
        // cosole.log(listId, taskTitle, taskDes, taskPriority, DueDate);
        await List.findByIdAndUpdate(
            listId,
            {
                $push: {
                    tasks: {
                        title: taskTitle,
                        description: taskDes,
                        priority: taskPriority,
                        dueDate: new Date(DueDate),
                        createdAt: new Date()
                    }
                }
            },
            { new: true, useFindAndModify: false }
        );
        res.status(201).json(newTask);
        console.log('Adding new task:', taskTitle, req.user.id);
    } catch (error) {
        res.status(500).json({ message: 'Error adding ot list task', error });
    }
};

const fetchAllLists = async (req, res) => {
    console.log('Fetching all lists for user:', req.user.id);
    try {
        const lists = await List.find({ user: req.user.id }).populate('tasks');
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all lists lists...', error });
    }
};



const getUserLists = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Error in getting perticular user lists', error });
    }
};

const fetchListData = async (req, res) => {
    try {
        const list = await List.findById(req.params.listId).populate('tasks');
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error in getting list tasks...', error });
    }
};

const updateTaskPriority = async (req, res) => {
    try {
        const { priority } = req.body;
        const result = await List.updateOne(
            { _id: req.params.listId, 'tasks._id': req.params.taskId },
            {
                $set: { 'tasks.$.priority': priority }
            }
        );
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating task priority..:', error);
    }
}

const MoveTaskToAnotherList = async (req, res) => {
    try {
        const { listprevId, listNextId, taskId } = req.params;

        console.log('Moving task:', taskId, 'from list:', listprevId, 'to list:', listNextId);
        const prevList = await List.findById(listprevId);
        if (!prevList) return res.status(404).json({ msg: 'Previous list not found' });

        const taskToMove = prevList?.tasks.id(taskId);
        console.log("moving task; ", taskToMove)
        if (!taskToMove) return res.status(404).json({ msg: 'Task not found in previous list' });

        prevList.tasks.pull(taskToMove._id);
        await prevList.save();

        const nextList = await List.findById(listNextId);
        if (!nextList) return res.status(404).json({ msg: 'Next list not found' });

        nextList.tasks.push(taskToMove);
        await nextList.save();

        console.log('Task moved successfully');
        res.status(200).json({ msg: 'Task moved successfully' });

    } catch (error) {
        console.error('Error moving task:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { addNewListController, addNewTaskController, fetchAllLists, fetchListData, updateTaskPriority, getUserLists, MoveTaskToAnotherList };
