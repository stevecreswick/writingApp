angular.module( 'writeAway' )
  .factory(
    'Stopwatch',
    [
    '$interval',
    function( $interval ) {
      var Stopwatch = {
        totalTime: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        converted: '00:00'
      };

      Stopwatch.start = function() {
        if ( Stopwatch.timer ) {
          Stopwatch.clearTime();
        }

        Stopwatch.timer = $interval( calculateTime, 1000 );
      };

      Stopwatch.clearTime = function(){
        $interval.cancel( Stopwatch.timer );
        Stopwatch.totalTime = 0;
        Stopwatch.seconds = 0;
        Stopwatch.minutes = 0;
        Stopwatch.hours = 0;
        Stopwatch.converted = '00:00';
      };

      Stopwatch.calculateWPM = function( wordCount ) {
        var minutes = Stopwatch.totalTime / 60;
        return Math.floor( wordCount / minutes );
      };

      var convertTime = function() {
        var minutesView = Stopwatch.minutes + ":",
            hoursView = Stopwatch.hours + ":",
            secondsView = Stopwatch.seconds;

        if ( Stopwatch.minutes < 10 ) {
          minutesView = "0" + Stopwatch.minutes + ":";
        }

        if ( Stopwatch.seconds < 10 ) {
          secondsView = "0" + Stopwatch.seconds;
        }

        if ( Stopwatch.hours == 0 ) {
          hoursView = ""
        } else if ( Stopwatch.hours < 10 ) {
          hoursView = "0" + Stopwatch.hours + ":";
        }

        Stopwatch.converted = hoursView + minutesView + secondsView;
      }

      var calculateTime = function() {
        Stopwatch.totalTime++;
        Stopwatch.hours = Math.floor( Stopwatch.totalTime / 3600 );
        Stopwatch.minutes = Math.floor( Stopwatch.totalTime / 60 );
        Stopwatch.seconds = Stopwatch.totalTime % 60;

        convertTime();
      };

      return Stopwatch;
    }
  ]
);
