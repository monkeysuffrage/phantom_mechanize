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

function output(html, page){
  if(!html.match(/<html/i)) return;
  console.log(JSON.stringify(phantom.cookies, null, 2) + '<<<phget_separator>>>' + html);
  phantom.exit();
}

var page = require('webpage').create();

setInterval(function() {
  var html = page.evaluate(function() {
    return document.documentElement.outerHTML;
  });
  output(html, page);
  output(page.content, page);
}, timeout);

setInterval(function() {
  page.render('phantomjs.png');
}, 500);


page.settings.userAgent = user_agent;

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(msg);
};

page.onInitialized = function() {
  page.evaluate(function() {
    // spoof plugins
    window.navigator = {plugins: {length: 5}};
    // remove stuff that will give us away
    delete window.callPhantom;
  });
};

page.onResourceRequested = function(requestData, networkRequest) {
  // skip loading images / styles
  if(requestData.url.match(/\.(gif|jpe?g|png|css)\b/i)) {
    networkRequest.abort(); 
  }

  host = networkRequest.setHeader('Host');
  networkRequest.setHeader('Host', 0);
  networkRequest.setHeader('Host', host);
  networkRequest.setHeader('Connection', 'keep-alive');
  //networkRequest.setHeader('Accept-Encoding', 'gzip, deflate');

};

page.onLoadFinished = function() {
  if(selectors[0] == undefined){
    return;
  } else {
    var selector = selectors.shift();
    var js = jss.shift();
    var done = (selectors[0] == undefined && js == undefined);

    if(selector !== undefined){
    page.includeJs('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
      html = page.evaluate(function(selector, page, js, done) {
        setInterval(function() {
          if($(selector)[0]){
            if(js !== undefined){
              eval(js);
            }
            if(done){
              return document.documentElement.outerHTML;
            }            
          }
        }, 500);
      }, selector, page, js, done);
      output(html, page);
    });
//    console.log(document.documentElement.outerHTML);
    }

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
   
    console.error(msgStack.join('\n'));
*/
};

page.open(url, function() {

});
