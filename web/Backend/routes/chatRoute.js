const express = require('express');
const { processChat } = require('../controller/chatController');
const router = express.Router();

router.route('/chat').post(processChat);

module.exports = router;
