const {createBlogSchema, updateBlogSchema, createUser} = require('./schema.js')
const Blog = require("./model/blog.js")
const passport = require("passport");

module.exports.validateBlog = (req,res,next) => {
    const { error } = createBlogSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map(detail => detail.message) // returns all errors
        });
    }

    next();
}

module.exports.validateUpdateBlog = (req,res,next) => {
    const { error } = updateBlogSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map(detail => detail.message) // returns all errors
        });
    }

    next();
}

module.exports.validateSignup = (req,res,next) => {
    const { error } = createUser.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map(detail => detail.message) // returns all errors
        });
    }

    next();
}

module.exports.isLoggedIn = passport.authenticate("jwt", { session: false });

module.exports.isAuthor = async(req, res, next) =>{
  try {
    const blog = await Blog.findById(req.body._id); 

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (!blog.author.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: "You are not authorized to modify this blog" });
    }

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports.delCheck = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (!req.user || !blog.author.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this blog" });
    }

    next();
  } catch (err) {
    console.error('Error in delCheck middleware:', err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};