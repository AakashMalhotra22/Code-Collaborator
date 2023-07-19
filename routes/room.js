const express = require('express');
const { doCreateRoom, doCheckRoom, doSaveRoom } = require('../controllers/room');
const router = express.Router();

router.route('/createNewRoom').get(doCreateRoom);
router.route('/checkRoomExists/:id').get(doCheckRoom);
router.route('/saveRoom').put(doSaveRoom);
module.exports = router;