const ENDPOINT_API = "https://api.mercadolibre.com";
var moduleUtils = require('./utils/utils');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var request = require('request');
var utils = new moduleUtils();
var app = express();
var allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/items/:id', (req, res, next) => {
  var itemId = req.params.id;
  request.get({ url: ENDPOINT_API + '/items/' + itemId }, (error, response, body) => { 
    if (!error && response.statusCode == 200) {
      var item = JSON.parse(body);
      var result = utils.resultItemDetail(item);
      request.get({ url: ENDPOINT_API + '/items/' + itemId + '/description' }, 
        (error, response, body) => { 
          if (!error && response.statusCode == 200) {
            var description = JSON.parse(body);
            result.description = description.plain_text;
            request.get({ url: ENDPOINT_API + '/categories/' + item.category_id }, 
              (error, response, body) => { 
                if (!error && response.statusCode == 200) { 
                  var category = JSON.parse(body);
                  result.categories = category.path_from_root
                    .map((category) => category.name);
                  res.json({result});
                } else {
                  res.json({result});
                }
            });
          } else {
            res.json({result});
          }
      });
    } else {
      res.json({ msgError: 'Intente nuevamente más tarde' });
    }
  })
})

app.use('/api/items', function(req, res, next) {
  var q = req.param('q');
  request.get({ url: ENDPOINT_API + '/sites/MLA/search?q=' + q }, (error, response, body) => { 
    if (!error && response.statusCode == 200) { 
      var resultItems = JSON.parse(body).results;
      var result = utils.resultItemSearch(resultItems);
      var categoryId = resultItems[0] ? resultItems[0].category_id : null;
      if (categoryId) {
        request.get({ url: ENDPOINT_API + '/categories/' + categoryId },
          (error, response, body) => { 
            if (!error && response.statusCode == 200) { 
              var category = JSON.parse(body);
              result.categories = category.path_from_root.map((category) => category.name);
              res.json({result});
            } else {
              res.json({result});
            }
        });
      } else {
        res.json({result});
      }
    } else {
      res.json({ msgError: 'Intente nuevamente más tarde' });
    }
  });
});

app.use('/', routes);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
