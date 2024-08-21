const { Router } = require("express")
const ensureAuth = require("../middleware/ensureAuth")

const NotesController = require("../controllers/notesController")
const notesRouter = Router()

const noteController = new NotesController();
notesRouter.use(ensureAuth)
notesRouter.post('/', noteController.create)
notesRouter.get('/:id', noteController.show)
notesRouter.delete('/:id', noteController.delete)
notesRouter.get('/', noteController.index)

module.exports = notesRouter

