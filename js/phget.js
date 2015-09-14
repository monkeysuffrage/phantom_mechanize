var args = require('system').args;

var url = args[1];
var timeout = parseInt(args[2]);
var selectors = JSON.parse(args[3]);
var selector = selectors[0];

var cookies = JSON.parse(args[4]);
var user_agent = args[5];
var jss = JSON.parse(args[6]);

// var date = 
for(i in cookies){
  cookie = cookies[i]
  phantom.addCookie({
    'name'     : cookie[0], 
    'value'    : cookie[1],
    'domain'   : cookie[2],
    'path'     : cookie[3],     
    'httponly' : cookie[4],
    'secure'   : cookie[5],
    'expires'  : new Date(cookie[6] * 1000)
  });
}

var page = require('webpage').create();

setInterval(function() {
  page.includeJs('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
    page.evaluate(function() {
      console.log($(':root').html());
    });
  });
}, timeout);

page.settings.userAgent = user_agent;

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(JSON.stringify(phantom.cookies, null, 2) + '<<<phget_separator>>>' + msg);
  phantom.exit();
};

page.onResourceRequested = function(requestData, networkRequest) {
  if(requestData.url.match(/.(gif|jpe?g|png|css)/)) {
    networkRequest.abort(); 
  }
};

page.onLoadFinished = function() {
  if(selectors[0] == undefined){
    return;
  } else {
    var selector = selectors.shift();
    var js = jss.shift();
    var done = (selectors[0] == undefined && js == undefined);

    page.includeJs('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
      page.evaluate(function(selector, page, js, done) {
        setInterval(function() {
          if($(selector)[0]){
            if(js){
              eval(js);
            }
            if(done){
              console.log($(':root').html());
            }
            
          }
        }, 500);
      }, selector, page, js, done);

    });
  }
};

page.onError = function(msg, trace) {
  /*
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
   */
    // uncomment to log into the console 
    // console.error(msgStack.join('\n'));
};

page.open(url, function() {

});
