
// Global Variables
var seconds = 0, minutes = 0, hours = 0;
var timer;
var $stopwatch = $('#stopwatch');
var $stop = $('#stop');
var $start = $('#start');
var $reset = $('#reset');


// Bind Start, Stop, and Reset

bindStart = function(){

  $start.on('click', function(){
    clearInterval(timer);
    timer = setInterval(renderTime, 1000);
  });
}

bindStop = function(){
  $stop.on('click', function(){
  clearInterval(timer);
  });
}

bindReset = function(){
  $reset.on('click', resetStopwatch);
}


// Stopwatch Rendering

renderTime = function(){
    seconds++;

    if(seconds >= 60){
      seconds = 0;
      minutes += 1;
    } else if (minutes > 59){
      minutes = 0;
      hours += 1;
    } else {
      $stopwatch.html(hours + ':' + minutes + ':' + seconds);
    }
}


// Reset Clock

resetStopwatch = function(){
  var seconds = 0, minutes = 0, hours = 0;
  timer;
  $stopwatch.html(hours + ':' + minutes + ':' + seconds);
}
