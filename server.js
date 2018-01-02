// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

     var todoSearch = todos.filter(function (todo) {
    return(todo.task.includes(req.query.q));
   });
   res.json({todos: todoSearch});

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
    res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
    if (todos.length > 0) {
    req.body._id = todos[todos.length - 1]._id +1;

}
   res.json(req.body);
   todos.push(req.body);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var todosID = req.params.id;
   res.json(todos[todosID-1]);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   var todosID = parseInt(req.params.id); // Get the todo id to update from the url params
   var todoUpdated = todos.filter(function (todo) {
    return todo._id === todosID;
   })[0];

    todoUpdated.task = req.body.task;
    todoUpdated.description = req.body.description;
   
   res.json(todoUpdated);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */

    var todosID = parseInt(req.params.id); // Get the todo ID from the url params
   var todoDeleted = todos.filter(function (todo) {
    return todo._id === todosID;
   })[0];

   todos.splice(todos.indexOf(todoDeleted), 1);
   res.json(todoDeleted);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
