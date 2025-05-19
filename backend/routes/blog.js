const express = require('express')
const { validateBlog, validateUpdateBlog, isAuthor, isLoggedIn, delCheck } = require('../middleware')
const BlogController = require('../controller/blog')
const router = express.Router()

// Get all blogs

router.get("/", BlogController.getAllBlogs)

// Get My blogs

router.get("/myblogs", isLoggedIn, BlogController.getMyBlogs);

// Get blog by ID

router.get("/:id", BlogController.getBlogById)

// Save as draft

router.post("/save-draft/create", isLoggedIn, validateBlog, BlogController.newDraft)

router.post("/save-draft/update", isLoggedIn, isAuthor, validateUpdateBlog, BlogController.updateDraft)

// publish draft

router.post("/publish/create", isLoggedIn, validateBlog, BlogController.publishBlog)

router.post("/publish/update", isLoggedIn, isAuthor, validateUpdateBlog, BlogController.updatePublishedBlog)

// Delete a blog

router.delete("/:id",isLoggedIn, delCheck, BlogController.deleteBlog)


module.exports = router;