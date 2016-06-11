var timerCount = 15;

window.onload = function() {
  var timerID = document.getElementById('timer');
  timerID.innerHTML += timerCount;
};

var TimerFunc = function() {
  window.onload = function() {
    this.timerID = document.getElementById('timer');
  };
};

TimerFunc.prototype.startTimer = function() {
  this.countdown = window.setInterval(function() {
    timerCount--;
    this.timerID.innerHTML = timerCount;
  }, 1000);
};

TimerFunc.prototype.endTimer = function() {
  clearInterval(this.countdown);
};

var timer = new TimerFunc();

function startTimer() {
  var timerID = document.getElementById('timer');
  window.setInterval(function() {
    timerCount--;
    timerID.innerHTML = timerCount;
  }, 1000);
};

function endTimer() {

};
