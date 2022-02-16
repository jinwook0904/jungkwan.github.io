const buttons = document.querySelectorAll(".restaurant-list");
for (const button of buttons) {
  button.addEventListener("click", function(event) {
    const restaurantName = event.path[2].childNodes[5].childNodes[1].innerText;
    const restaurantAddress = event.path[2].attributes[1].value;
    test(restaurantName, restaurantAddress);
  })
}

function test(name, address) {
    var Addr_val = address;

    // 도로명 주소를 좌표 값으로 변환(API)
    naver.maps.Service.geocode({
        query: Addr_val
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('Something wrong!');
        }

        var result = response.v2, // 검색 결과의 컨테이너
            items = result.addresses; // 검색 결과의 배열
            
        // 리턴 받은 좌표 값을 변수에 저장
        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);
        mapGenerator(name, String(y), String(x));
    })
}

function mapGenerator(name, la,lo){
  var HOME_PATH = window.HOME_PATH || '.';
  var location = new naver.maps.LatLng(la,lo),
      map = new naver.maps.Map('map', {
          center: location,
          zoom: 19
      }),
      marker = new naver.maps.Marker({
          map: map,
          position: location
      });
  
  var contentString = [
          '<div class="iw_inner ridi">',
          '   <h5>'+name+'</h5>',
          '   <p><br>',
          '       <a target="_blank" href="http://map.naver.com/search/가좌동'+name+'" >네이버 지도 바로 가기</a>',
          '   </p>',
          '</div>'
      ].join('');
  
  var infowindow = new naver.maps.InfoWindow({
      content: contentString,
      maxWidth: 300,
      backgroundColor: "#eee",
      borderColor: "#A4A4A4",
      borderRadius:"30px",
      borderWidth: 2,
      disableAnchor:true,
      anchorColor: "#A4A4A4",
      pixelOffset: new naver.maps.Point(10, -10)
  });
  
  naver.maps.Event.addListener(marker, "click", function(e) {
      if (infowindow.getMap()) {
          infowindow.close();
      } else {
          infowindow.open(map, marker);
      }
  });
  setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
  }, 600);
}