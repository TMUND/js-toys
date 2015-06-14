/*globals jsToys */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  jsToys.modules.toni = {
    // ----------
    init: function(windowSize, context) {
    },
    
    // ----------
    frame: function(windowSize, context) {

      var canvas = document.getElementById('$canvas');

      var i, snowflake;
      var maxRadius = Math.max(windowSize.x, windowSize.y) / 2;

      var W = window.innerWidth;
      var H = window.innerHeight;

      canvas.width = W;
      canvas.height = H;

      var maxSnowflakes = 200;
      var snowflakes = [];

      for (var i = 0; i < maxSnowflakes; i++) {
        snowflakes.push ({
            x: Math.random() * w ,
            y: Math.random() * h,
            r: Math.random() * 4 + 1,
            d: Math.random() * maxSnowflakes
        });
      }

      // draw the snowflakes
      function draw () {
        context.clearRect (0, 0, W, H);

        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.beginPath();

        for (var i = 0; i < maxSnowflakes; i++) {
            var s = snowflakes[i];
            context.moveTo(s.x, s.y);
            context.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
        }

        context.fill();
        update();
      }

      var angle = 0;

      function update() {
        angle += 0.01;
        for (var i = 0; i < maxSnowflakes; i++) {
            var s = snowflakes[i];

            s.y += Math.cos(angle + s.d) + 1 + s.r / 2;
            s.x += Math.sin(angle) * 2;

            if (s.x > W + 5 || s.x < -5 || s.y > H) {
                if (i % 3 > 0) {
                    snowflakes[i] = {
                        x: Math.random() * W, 
                        y: -10, 
                        r: s.r,
                        d: s.d
                    };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: s.r,
                            d: s.d
                        };
                    } else {
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: s.r,
                            d: s.d
                        };
                    }
                }
            }
        }
      }

      setInterval(draw, 33);
    },
    
    // ----------
    resize: function(windowSize, context) {
    }
  };

})();
