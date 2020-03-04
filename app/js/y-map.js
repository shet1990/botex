//Ymap start
var spinner = $('.ymap-container').children('.loader');
var check_if_load = 0;
var myMapTemp, myPlacemarkTemp;

function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    //center: [map_object.mapX, map_object.mapY],
    center: [53.870989, 27.660709],
    zoom: 15,
    controls: ['zoomControl', 'fullscreenControl']
  });

  //var myPlacemarkTemp = new ymaps.Placemark([map_object.mapX, map_object.mapY], {
  var myPlacemarkTemp = new ymaps.Placemark([53.870989, 27.660709], {
      //balloonContent: map_object.adress,
      balloonContent: 'г. Минск, Лазо 16',
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      //iconImageHref: map_object.templateurl + '/assets/images/map-marker.png',
      iconImageHref: '/images/map-marker.png',
      // Размеры метки.
      iconImageSize: [50, 50],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-25, -50],
  });

  myMapTemp.geoObjects.add(myPlacemarkTemp);

  //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
  waitForTilesLoad(layer).then(function() {
    //Скрываем
    spinner.removeClass('is-active');
  });
}

function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

function loadScript(url, callback){

  var script = document.createElement("script");

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (check_if_load == 0) {
        check_if_load = 1;

        spinner.addClass('is-active');

        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           ymaps.load(init);
        });

      }
    }
  );
}

$(function() {

  //Map Yandex
  ymap();

});
