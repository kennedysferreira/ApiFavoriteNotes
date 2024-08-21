const { Router } = require("express");
const TagsController = require("../controllers/tagsController");
const ensureAuth = require("../middleware/ensureAuth");
const tagsRouter = Router();

const tagController = new TagsController();

tagsRouter.get('/', ensureAuth,tagController.index)

module.exports = tagsRouter