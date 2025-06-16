const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addNewListController, MoveTaskToAnotherList, addNewTaskController, fetchAllLists, fetchListData, updateTaskPriority } = require('../controllers/listOprationController');
const { addNewList } = require('../utils/validator');
const validate = require('../middlewares/validatorMiddleware');

router.post('/addlist', validate(addNewList), auth ,addNewListController);
router.post('/addtask', validate(addNewTask), auth ,addNewTaskController);
router.post('/:listId/:taskId', validate(checkListId), auth , updateTaskPriority);
router.post('/lists', auth ,fetchAllLists);
router.put('/tasktolist/:listprevId/:listNextId/:taskId', auth ,MoveTaskToAnotherList);
router.get('/:listId', auth , fetchListData);

module.exports = router;

