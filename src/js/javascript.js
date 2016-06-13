// Initial timer length in seconds
var timerCount = 15,
    remote     = require('electron').remote,
    arguments  = remote.getGlobal('sharedObject').prop1;

// debug mode ensures that computer doesnt shut down while testing
// npm start --debug
if (arguments[2] == '--debug') {
  console.log('Debug mode enabled');
  var debug = true;
}

// Timer constructor
var TimerFunc = function() {
  var self = this;
  this.numeral = require('numeral');
  this.timerRunning = false;
  window.onload = function() {
    // this.timerID = document.getElementById('timer');
    this.timerID = document.getElementById('timeForm');
    // Disply initial timer length, currently in seconds
    this.timerID.value = self.numeral(timerCount).format('00:00:00');

    if (debug) {
      // document.getElementById('titleHeader').innerHTML += '**DEBUG**';
    };
  };
};

// Function to start countdown, decrements timerCount in seconds
TimerFunc.prototype.startTimer = function() {
  var self = this;
  timerCount = self.numeral().unformat(document.getElementById('timeForm').value);
  if (timerCount > 0 && !self.timerRunning) {
    self.hideButtons();
    self.timerRunning = true;
    self.countdown = window.setInterval(function() {
      timerCount--;
      this.timerID.value = self.numeral(timerCount).format('00:00:00');
      if (timerCount <= 0) {
        self.endTimer();
        shutdown();
        self.timerRunning = false;
      }
    }, 1000);
  };
};

TimerFunc.prototype.hideButtons = function() {
  var hideThis = document.getElementsByClassName('buttons');
  var disableButtons = document.getElementsByClassName('pButton');

  for (var i=0; i < hideThis.length; i++) {
    hideThis[i].style.transition = 'opacity 3s ease-in-out';
    hideThis[i].style.opacity = '0'
  };

  for (var i=0; i < disableButtons.length; i++) {
    console.log(disableButtons[i]);
    disableButtons[i].disabled = true;
  }
};

// Function to manually stop timer from counting
TimerFunc.prototype.endTimer = function() {
  clearInterval(this.countdown);
  this.timerRunning = false;
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
