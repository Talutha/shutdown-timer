// Initial timer length in seconds
var timerCount = 15,
    remote = require('electron').remote,
    arguments = remote.getGlobal('sharedObject').prop1;

// debug mode ensures that computer doesnt shut down while testing
// npm start --debug
if (arguments[2] == '--debug') {
  console.log('Debug mode enabled');
  var debug = true;
}

// Timer constructor
var TimerFunc = function() {
  window.onload = function() {
    this.timerID = document.getElementById('timer');
    // Disply initial timer length, currently in seconds
    this.timerID.innerHTML = timerCount;

    if (debug) {
      // document.getElementById('titleHeader').innerHTML += '**DEBUG**';
    };
  };
};

// Function to start countdown, decrements timerCount in seconds
TimerFunc.prototype.startTimer = function() {
  var self = this;
  if (timerCount > 0) {
    self.countdown = window.setInterval(function() {
      timerCount--;
      this.timerID.innerHTML = timerCount;
      if (timerCount <= 0) {
        self.endTimer();
        shutdown();
      }
    }, 1000);
  };
};

// Function to manually stop timer from counting
TimerFunc.prototype.endTimer = function() {
  clearInterval(this.countdown);
};

var timer = new TimerFunc();

function alterTime(time) {
  document.getElementById('timeForm').value = time;
};

function shutdown() {
  if (debug) {
    alert('Debug: Shutting it down!');
  } else {
    var plat = process.platform;
    var exec = require('child-process').exec;
    var cmd = '';
    if (plat === 'win32') {
      cmd = 'shutdown -t 15 -s';
    } else if (plat === 'darwin') {
      cmd = '';//OSX shutdown command;
    } else {
      cmd = '';//linux shutdown command;
    };

    exec(cmd, function(error, stdout, stderr) {});
  };
};
