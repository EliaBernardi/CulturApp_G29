const home = {
  methods : {
    refreshLayout() {
      //document.querySelector('#addEmployee').className = 'btn btn-light px-2 py-0 d-none';
      document.querySelector('#map').className = '';
    }
  },
  mounted: function () {
    this.refreshLayout();
  }
}