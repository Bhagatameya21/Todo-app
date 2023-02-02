const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to db!");
  app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
});

//view engine configuration
app.set("view engine", "ejs");

//GET
app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
  });
});

//POST
app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

//UPDATE
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});

//DELETE
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, err => {
  if (err) return res.send(500, err);
  res.redirect("/");
  });
  });
