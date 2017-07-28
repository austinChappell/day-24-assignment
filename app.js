const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override');
      mongoose = require('mongoose'),
      mustacheExpress = require('mustache-express');
      ToDo = require('./todo');

let port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/todolist');

app.engine('mustache', mustacheExpress());

app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// INDEX ROUTE
app.get('/', (req, res) => {
  ToDo.find({}, (err, todos) => {
    if (err) {
      console.log('Something went wrong!');
    } else {
      let data = { 'list': todos };
      console.log(data);
      res.render('index', data);
    }
  })
});

// CREATE ROUTE
app.post('/todo', (req, res) => {
  let task = req.body.task;
  console.log(task);
  ToDo.create({ task, complete: false, date: new Date().toDateString() });
  res.redirect('/');
});

// UPDATE ROUTE
app.put('/task/:id', (req, res) => {
  let id = req.params.id;
  ToDo.update({ _id: id }, { complete: true, date: new Date().toDateString() }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

// DELETE ROUTE
app.delete('/task/:id/delete', (req, res) => {
  let id = req.params.id;
  ToDo.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

app.listen(port, () => {
  console.log(`Your app is running on PORT ${ port }.`);
});
