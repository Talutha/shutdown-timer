// Initial timer length in seconds
var timerCount = 15;

// Timer constructor
var TimerFunc = function() {
  window.onload = function() {
    this.timerID = document.getElementById('timer');
    // Disply initial timer length, currently in seconds
    this.timerID.innerHTML = timerCount;
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

function shutdown() {
  alert('Shutting it down!');
};
