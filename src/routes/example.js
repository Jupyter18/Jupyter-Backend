const router = require('express').Router();
const ExampleController = require('../api/example');

router.get('/list',ExampleController.getList); //here we can add middlewares
router.post('/list',ExampleController.postList)
module.exports = router;