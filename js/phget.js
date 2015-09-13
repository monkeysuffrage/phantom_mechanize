var args = require('system').args;

var url = args[1];
var timeout = parseInt(args[2]);
var selector = args[3];

var cookies = JSON.parse(args[4]);
var user_agent = args[5];

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
  console.log(JSON.stringify(phantom.cookies, null, 2) + '<<<phget_separator>>>' + page.content);
  phantom.exit();
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
  if(selector != ''){
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
      page.evaluate(function(selector, page) {
        setInterval(function() {
          if($(selector)[0]){
            console.log(page.content);
          }
        }, 500);
      }, selector, page);
    });
  }
};

page.open(url, function() {

});
