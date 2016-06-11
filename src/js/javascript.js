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
  this.countdown = window.setInterval(function() {
    timerCount--;
    this.timerID.innerHTML = timerCount;
  }, 1000);
};

// Function to manually stop timer from counting
TimerFunc.prototype.endTimer = function() {
  clearInterval(this.countdown);
};

var timer = new TimerFunc();
