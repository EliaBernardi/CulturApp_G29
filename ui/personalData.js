const personalData = {
  template: `
  <div class="personal-info-box p-3">

        <div class="row justify-content-center py-2">
          <h4 class="title text-center white">Dati personali</h4>
        </div>

        <div class="row">
          <div class="flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <div class="input-group mb-3">
                <span class="input-group-text">Nome</span>
                <p class="form-control my-0">{{adminName}}</p>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Cognome</span>
                <p class="form-control my-0">{{adminSurname}}</p>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Indirizzo email</span>
                <p class="form-control my-0">{{adminEmail}}</p>
              </div>

              <div class="input-group">
                <span class="input-group-text">Data di nascita</span>
                <p class="form-control my-0">{{adminDateOfBirth}}</p>
              </div>

            </div>
          </div>
        </div>

  </div>
  `,
  data() {
    return {
      adminName: '',
      adminSurname: '',
      adminEmail: '',
      adminDateOfBirth: ''
    }
  },
  methods: {
    fetchData() {
      axios.get(variables.API_URL + '/administrator')
        .then((response) => {
          this.adminName = response.data[0].name
          this.adminSurname = response.data[0].surname
          this.adminEmail = response.data[0].email
          this.adminDateOfBirth = response.data[0].dateOfBirth
        });
    }
  },
  created: function () {
    this.fetchData()
  },
  mounted: function () {
    document.body.style.backgroundImage = "url('wp1.jpg')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
  }
}