const home = {
  template: '<div id="map"></div>',
  data() {
    return {
      zoom: 17,
      map: '',
      mapCenter: '',
      marker: '',
      markerPosition: '',
      markerTitle: 'Museo del Buonconsiglio',
      infoWindow: '',
      infoWindowContentMessage:'MESSAGGIO'
    }
  },
  methods : {
    initMap() {
      //const museoBuonconsiglio = { lat: 46.071562, lng: 11.126563 };
      this.mapCenter = this.markerPosition = new google.maps.LatLng(46.071562, 11.126563);
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.mapCenter,
        zoom: this.zoom
      });

      this.marker = new google.maps.Marker({
        position: this.markerPosition,
        map: this.map,
        title: this.title
      });

      this.infoWindow = new google.maps.InfoWindow({
        content: this.infoWindowContentMessage
      });

      /****** info window with click *******/
      this.marker.addListener('click', () => {
        this.infoWindow.open(this.map, this.marker);
      })
    },
    refreshLayout() {
      //document.querySelector('#addEmployee').className = 'btn btn-light px-2 py-0 d-none';
      document.querySelector('#map').className = '';
    }
  },
  mounted: function () {
    this.refreshLayout();
    this.initMap();
  }
}