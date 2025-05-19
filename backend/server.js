const express = require('express')
const { connectDB } = require('./config/db')
const blogRouter = require('./routes/blog')
const passport = require('passport');
const User = require('./model/user');
const LocalStrategy = require("passport-local")
require('./config/passport')(passport);
passport.use(new LocalStrategy(User.authenticate()))
const userRouter = require('./routes/user')
const cors = require('cors')

const app = express()

const port = 8080

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB()
  .then(res => console.log("MongoDB connected"))
  .catch(err => console.log("Error DB not connected:", err))

app.use(passport.initialize())

app.use("/api/blogs", blogRouter)

app.use("/api/user",userRouter)

app.listen(port, () => {
  console.log("App is listening on port:", port)
})