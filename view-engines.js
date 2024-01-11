const express = require('express');
const path = require('path');
const app = express();

// set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));

// set view engine to use, in this case 'some_template_engine_name'
app.set('view engine', 'some_template_engine_name');

// the appearance of the template will depend on what engine you use. Assuming that you have a template file named "index.<template_extension" that contains placeholders for data variables named "title" and "message", you would call Response.render() in a route handler function to create and send the HTML response:

app.get('/', (req, res) => {
  res.render('index', { title: 'About dogs', message: 'Dogs rock!' });
});
