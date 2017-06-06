      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '225',
          width: '400',
          videoId: 'ZXsQAXx_ao0',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      function onPlayerReady(event) {
        //event.target.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          done = true;
        }
      }
      
      function stopVideo() {
        player.stopVideo();
      }
      
      function abreFecha(sel) {
    	  $(sel).slideToggle();
      }