const Blog = require('../model/blog')
const mongoose = require('mongoose')

module.exports.getAllBlogs = async (req, res) => {
    try {
        const result = await Blog.find({ status: { $ne: "draft" } });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports.getMyBlogs = async (req, res) => {
  try {
    const myBlogs = await Blog.find({author: req.user._id});
    res.status(200).json({ success: true, data: myBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports.getBlogById = async (req, res) => {
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Such blog doesn't exists" })
    }

    let result = await Blog.findById(id);
    res.status(200).json({ success: true, data: result })
}

module.exports.newDraft = async (req, res) => {
    let blog = req.body;

    if (!blog.content) {
        blog.content = ""
    }

    blog.status = "draft"
    blog.author = req.user._id;
    let newBlog = new Blog(blog)

    try {
        let result = await newBlog.save()
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.updateDraft = async (req, res) => {
    let blog = req.body;

    if (!blog.content) {
        blog.content = ""
    }

    blog.status = "draft"

    const existingBlog = await Blog.findById(blog._id)

    if (!existingBlog) {
        return res.status(400).json({ success: false, message: "Blog with such ID doesn't exists" })
    }

    if (existingBlog.status !== "draft") {
        return res.status(400).json({ success: false, message: "Published blogs can't be saved as drafts" })
    }

    try {
        let result = await Blog.findByIdAndUpdate(blog._id, blog, { new: true })
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.publishBlog = async (req, res) => {
    let blog = req.body;

    if (!blog.content) {
        blog.content = ""
    }

    blog.status = "published"
    if (!blog.author) {
        blog.author = req.user._id;
    }
    let newBlog = new Blog(blog)

    try {
        let result = await newBlog.save()
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.updatePublishedBlog = async (req, res) => {
    let blog = req.body;

    if (!blog.content) {
        blog.content = ""
    }

    blog.status = "published"

    try {
        const existingBlog = await Blog.findById(blog._id);

        if (!existingBlog) {
            return res.status(400).json({
                success: false,
                message: "Blog with such ID doesn't exist"
            });
        }

        const result = await Blog.findByIdAndUpdate(blog._id, blog, { new: true });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports.deleteBlog = async (req, res) => {
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Such blog doesn't exists" })
    }

    try {
        await Blog.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Blog deleted" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}