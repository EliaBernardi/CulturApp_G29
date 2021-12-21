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
      infoWindowContentMessage: ''
    }
  },
  methods: {
    async setLocationInfoWindow() {
      var response = await axios.get(variables.API_URL + "/pointOfInterest")
      this.infoWindowContentMessage = `<div><ul class="list-group list-group-flush">
                                              <h6 class="text-center">${response.data.locationName}</h6>
                                              <li class="list-group-item"><b>Costo biglietto:</b> €${response.data.locationTicketPrice}</li>
                                              <li class="list-group-item"><b>Orario di apertura:</b> ${response.data.locationOpeningHours}</li>
                                              <li class="list-group-item"><b>Descrizione:</b> ${response.data.locationDescription}</li>
                                            </ul></div>`
    },
    initMap() {
      //const museoBuonconsiglio = { lat: 46.071534, lng: 11.126513 };
      this.mapCenter = this.markerPosition = new google.maps.LatLng(46.071534, 11.126513);
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.mapCenter,
        zoom: this.zoom
      });

      this.marker = new google.maps.Marker({
        position: this.markerPosition,
        map: this.map,
        title: this.markerTitle
      });

      this.marker.setAnimation(google.maps.Animation.BOUNCE);

      this.infoWindow = new google.maps.InfoWindow({
        content: this.infoWindowContentMessage
      });

      /****** info window with click *******/
      this.marker.addListener('click', () => {
        this.infoWindow.open(this.map, this.marker);
      })
    }
  },
  mounted: function () {
    this.setLocationInfoWindow().then(() => {
      this.initMap()
    })
  }
}