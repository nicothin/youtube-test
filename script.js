// функция будет автоматом вызвана после загрузки API видео с тюбика
function onYouTubeIframeAPIReady() {
  
  // объект, в котором скоро будут все видеоплейры
  var players = {};
  
  // обойдём все элементы-обёртки с видео
  $('.video-wrap').each(function(){
    var videoId = $(this).find('iframe').attr('id');
    // добавим элемент объекта для этой обёртки
    players[$(this).index()] = new YT.Player(videoId, {
      // подпишемся на событие смены состояния плейра: будем вызывать функцию onPlayerStateChange
      events: {'onStateChange': onPlayerStateChange}
    });
  });
  // console.log(players);

  // вызывается при смене состояния любого плейра
  function onPlayerStateChange(event) {
    // console.log(event.target.a.id);
    // console.log(event.data);
    if(event.data == 1) {
      // console.log('Скрыть кнопку');
      $('#' + event.target.a.id).closest('.video-wrap').find('.video-wrap__trigger').hide();
    }
    else if(event.data == 2) {
      // console.log('Показать кнопку');
      $('#' + event.target.a.id).closest('.video-wrap').find('.video-wrap__trigger').show();
    }
  }
  
  // следим за кликом на кнопках, лежащих поверх видео
  $('.video-wrap__trigger').on('click', function(){
    var playerNum = $(this).closest('.video-wrap').index();
    players[playerNum].playVideo();
  });
}

// встроим неблокирующий запрос за API видео с тюбика
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);