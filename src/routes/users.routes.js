const { Router } = require("express")
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const UserController = require("../controllers/usersController")
const UserAvatarController = require('../controllers/userAvatarController')
const usersRouter = Router()
const ensureAuth = require('../middleware/ensureAuth')
const userController = new UserController();

const upload = multer(uploadConfig.Multer)
const userAvatarController = new UserAvatarController()

usersRouter.post('/', userController.create)
usersRouter.put('/', ensureAuth, userController.update)
usersRouter.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update)


module.exports = usersRouter