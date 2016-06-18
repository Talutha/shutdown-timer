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
    document.getElementById('startTimerButton').addEventListener('click', buttonTimerClick);
    if (debug) {
      // document.getElementById('titleHeader').innerHTML += '**DEBUG**';
    };
  };
};

// Function to start countdown, decrements timerCount in seconds
TimerFunc.prototype.startTimer = function() {
  var self = this;
  var bgState = 3;
  timerCount = self.numeral().unformat(document.getElementById('timeForm').value);
  if (timerCount > 0 && !self.timerRunning) {
    self.hideButtons();
    self.timerRunning = true;
    self.countdown = window.setInterval(function() {
      timerCount--;
      console.log(bgState);
      if (timerCount > 60 * 5 && bgState === 3) {
        changeBGColor(timerCount);
        bgState--;
      } else if (timerCount > 60 && timerCount <= (60 * 5) && bgState === 2) {
        changeBGColor(timerCount);
        bgState--;
      } else if (timerCount <= 60 && bgState === 1) {
        changeBGColor(timerCount);
        bgState--;
      };
      this.timerID.value = self.numeral(timerCount).format('00:00:00');
      if (timerCount <= 0) {
        self.endTimer();
        shutdown();
        self.timerRunning = false;
      }
    }, 1000);
  };
};

// Function to manually stop timer from counting
TimerFunc.prototype.endTimer = function() {
  this.showButtons();
  clearInterval(this.countdown);
  this.timerRunning = false;
};

TimerFunc.prototype.showButtons = function() {
  var enableButtons = document.getElementsByClassName('pButton');
  var pauseOverlay = document.getElementById('pauseOverlay');
  var timer = document.getElementById('timeForm');

  timer.readOnly = false;

  for (var i = 0; i < enableButtons.length; i++) {
    enableButtons[i].style.opacity = '1';
    enableButtons[i].disabled = false;
  }

  pauseOverlay.style.opacity = '0';
  pauseOverlay.style.display = 'none';
};

TimerFunc.prototype.hideButtons = function() {
  var disableButtons = document.getElementsByClassName('pButton');
  var pauseOverlay = document.getElementById('pauseOverlay');
  var timer = document.getElementById('timeForm');

  timer.readOnly = true;

  for (var i=0; i < disableButtons.length; i++) {
    //hideThis[i].style.transition = 'opacity 3s ease-in-out';
    disableButtons[i].style.opacity = '0';
    disableButtons[i].disabled = true;
  };

  pauseOverlay.style.display = 'block';
  pauseOverlay.style.transition = 'opacity 3s ease-in-out';
  pauseOverlay.style.opacity = '1';

};

var timer = new TimerFunc();

// To do background transitions depending on time remaining
function changeBGColor(time) {
  // five minutes
  var fiveMin = 60 * 5;
  // one minute
  var oneMin = 60;
  // element selector for body style
  var body = document.body.style;
  var flexCont = document.getElementById('flexContainer');
  if (time > fiveMin) {
    // set background color to green over 5 seconds
    flexCont.style.transition = 'background-color 4s ease-in-out';
    flexCont.style.backgroundColor = '#27e833';
    timeRemaining = (time - fiveMin - 5).toString();
    // wait until first transition is done then ease color to Yellow
    // for remaining time above 5 minutes

    function toYellow(e) {
      flexCont.style.transition = 'background-color ' + timeRemaining + 's ease-in-out';
      flexCont.style.backgroundColor = '#fad201';
      console.log(e);
      e.stopPropagation();
      flexCont.removeEventListener('transitionend', toYellow, false);
    };

    flexCont.addEventListener('transitionend', toYellow, false);
  } else if (time > oneMin && time <= fiveMin) {
    flexCont.style.transition = 'background-color 4s ease-in-out';
    flexCont.style.backgroundColor = '#fad201';
    timeRemaining = (time - 60 - 5).toString();
    flexCont.addEventListener('transitionend', function() {
      flexCont.style.transition = 'background-color ' + timeRemaining + 's ease-in-out';
      flexCont.style.backgroundColor = '#f9152f';
    }, true);
  } else if (time < oneMin) {
    flexCont.style.transition = 'background-color 4s ease-in-out';
    flexCont.style.backgroundColor = '#f9152f';
  } else {
    alert('You have broken the properties of TIME!');
  };
};

function alterTime(time) {
  document.getElementById('timeForm').value = time;
};

function shutdown() {
  var plat = process.platform;
  var exec = require('child_process').exec;
  var cmd = '';
  if (plat === 'win32') {
    cmd = 'shutdown -t 15 -s';
  } else if (plat === 'darwin') {
    cmd = '';//OSX shutdown command;
  } else {
    cmd = '';//linux shutdown command;
  };

  if (debug) {
    alert('Debug: Shutting it down!');
  } else {
    exec(cmd, function(error, stdout, stderr) {});
  };
};

function buttonTimerClick(e) {
  console.log(e);
  timer.startTimer();
  e.stopPropagation();
};
