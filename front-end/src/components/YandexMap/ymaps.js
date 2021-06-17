export default function init() {
  var myPlacemark,
    myMap = new window.ymaps.Map(
      "map",
      {
        center: [55.753994, 37.622093],
        zoom: 12,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

  // myPlacemark = createPlacemark([55.74741048760227, 37.604411878173835]);
  // myMap.geoObjects.add(myPlacemark);

  //для Свята
  // // myPlacemark = createPlacemark([55.73, 37.64]);
  // myMap.events.add("mousemove", function (e) {
  //   console.log(e.get("coords"));
  // });

  // Слушаем клик на карте.
  myMap.events.add("click", function (e) {
    var coords = e.get("coords");
    console.log(coords);
    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    // Если нет – создаем.
    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add("dragend", function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });

  // Создание метки.
  function createPlacemark(coords) {
    return new window.ymaps.Placemark(
      coords,
      {
        iconCaption: "поиск...",
      },
      {
        preset: "islands#violetDotIconWithCaption",
        draggable: true,
      }
    );
  }
  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set("iconCaption", "поиск...");
    window.ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      console.log(firstGeoObject.getAddressLine());
      myPlacemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          // Название населенного пункта или вышестоящее административно-территориальное образование.
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        ]
          .filter(Boolean)
          .join(", "),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine(),
      });
    });
  }
}
