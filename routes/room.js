const express = require('express');
const { doCreateRoom, doCheckRoom, doSaveRoom } = require('../controllers/room');
const router = express.Router();

router.route('/createNewRoom').post(doCreateRoom);
router.route('/checkRoomExists/:id').get(doCheckRoom);
router.route('/saveRoom').post(doSaveRoom);
module.exports = router;