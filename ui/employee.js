const employee = {
  template: `
  <div>
  <div class="top-right-navbar-buttons">
    <button type="button" class="btn btn-primary px-4 py-0 mx-3" data-bs-toggle="modal" data-bs-target="#addModal" @click="addClick()">Aggiungi dipendente</button>
    <button id="deleteButton" type="button" class="btn btn-danger px-2 px-4 py-0 mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasConferma">Elimina dipendenti</button>
  </div>
  <ul class="list-group list-group-flush">
    <li v-for="(emp,  index) in employees" :key="index" class="list-group-item">
      <div class="row">
        <div class="col-3 d-flex justify-content-center align-items-center">
          <div class="px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 15 15">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <p style="border-radius: 10px; width: 80%" class="px-3 mx-3 my-0 p-bg-dark border border-dark">
            <b>Nome: </b>{{emp.name}}<br><b>Cognome: </b>{{emp.surname}}
          </p>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <p style="padding: 13px 16px; border-radius: 10px; width: 80%" class="m-0 p-bg-dark border border-dark text-center">
            <b>Email: </b>{{emp.email}}
          </p>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <p style="padding: 13px 16px; border-radius: 10px; width: 80%" class="m-0 p-bg-dark border border-dark text-center">
            <b>Data di nascita: </b>{{getDateOfBirth(emp.dateOfBirth)}}
          </p>
        </div>
        <div class="col-1 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-light px-2 py-0" data-bs-toggle="modal" data-bs-target="#modifyModal" @click="modifyClick(emp)">Visualizza e modifica utente</button>
        </div>
        <div class="col-1 d-flex justify-content-center align-items-center">
        <input v-bind:id="index" v-on:click="checkboxClickHandler" class="form-check-input" type="checkbox" v-bind:value=index v-model="checkedEmployees"></input>
        </div>
      </div>
    </li>
  </ul>

  <!-- Modal form aggiungi employee -->

  <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">{{modalTitle}}</h5>
          <button id="dismissModalButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <form class="needs-validation">
          <div class="flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <div class="input-group mb-3">
                <span for="validationDefault01" class="input-group-text">Nome</span>
                <input type="text" class="form-control" v-model="name" id="validationDefault01" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Cognome</span>
                <input type="text" class="form-control" v-model="surname" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Indirizzo email</span>
                <input type="text" class="form-control" v-model="email" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="passwordHash" required>
              </div>
              
            <!-- @TODO: reinserimento password con controllo
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="EmployeePassword" required>
              </div>
                -->

              <div class="input-group mb-3">
                <span class="input-group-text">Data di nascita</span>
                <input id="inputDateOfBirth" type="date" min="1900-01-01" class="form-control" :value="dateToYYYYMMDD(dateOfBirth)" @input="dateOfBirth = $event.target.valueAsDate" required>
              </div>

            </div>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" @click="createEmployee()" class="btn btn-primary">
              Create
            </button>
          </div>
          </form>
        </div>

      </div>
    </div>
  </div>

  <!-- Modal form modifica employee -->

  <div class="modal fade" id="modifyModal" tabindex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modifyModalLabel">{{modalTitle}}</h5>
          <button id="dismissModifyModalButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <form>
          <div class="flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <div class="input-group mb-3">
                <span class="input-group-text">Nome</span>
                <input type="text" class="form-control" v-model="newName">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Cognome</span>
                <input type="text" class="form-control" v-model="newSurname">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Indirizzo email</span>
                <input type="text" class="form-control" v-model="newEmail">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Nuova password</span>
                <input type="text" class="form-control" v-model="newPassword">
              </div>
              
            <!-- @TODO: reinserimento password con controllo
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="EmployeePassword">
              </div>
                -->
              <div class="input-group mb-3">
                <span class="input-group-text">Data di nascita</span>
                <input id="inputDateOfBirth" type="date" min="1900-01-01" class="form-control" :value="dateToYYYYMMDD(newDateOfBirth)" @input="newDateOfBirth = $event.target.valueAsDate">
              </div>

            </div>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" @click="modifyEmployee()" class="btn btn-primary">
              Modifica
            </button>
          </div>
          </form>
        </div>

      </div>
    </div>
  </div>

  <!-- offcanvas conferma eliminazione employees -->

  <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasConferma" aria-labelledby="offcanvasConfermaLabel">
    <div class="offcanvas-body">
      <button id="dismissOffcanvasConferma" type="button" class="btn-close text-reset d-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <button type="button" class="btn btn-primary" style="height: 100%; width: 100%" @click="deleteEmployee()">Conferma eliminzione</button>
    </div>
  </div>


</div>
`,

  data() {
    return {
      employees: [],
      checkedEmployees: [],
      modalTitle: '',
      name: '',
      newName: '',
      surname: '',
      newSurname: '',
      email: '',
      newEmail: '',
      passwordHash: '',
      newPassword: '',
      dateOfBirth: new Date(),
      newDateOfBirth: new Date(),
      checkboxChecked: 0,
      deleteButton: ''
    }
  },
  methods: {
    fetchData() {
      axios.get(variables.API_URL + '/employee')
        .then((response) => {
          this.employees = []
          this.employees = response.data
        });
    },
    addClick() {
      this.modalTitle = 'Aggiungi dipendente'
      this.name = ''
      this.surname = ''
      this.email = ''
      this.passwordHash = ''
      this.dateOfBirth = ''
    },
    modifyClick(employee) {
      this.modalTitle = 'Modifica dipendente'
      this.name = employee.name
      this.surname = employee.surname
      this.email = employee.email
      this.dateOfBirth = new Date(parseInt(employee.dateOfBirth.substring(0, 4)),
        parseInt(employee.dateOfBirth.substring(5, 7)) - 1,     //mese - 1!
        parseInt(employee.dateOfBirth.substring(8, 10)) + 1)    //giorno + 1!
      this.passwordHash = ''
      this.newName = employee.name
      this.newSurname = employee.surname
      this.newEmail = employee.email
      this.newDateOfBirth = new Date(parseInt(employee.dateOfBirth.substring(0, 4)),
        parseInt(employee.dateOfBirth.substring(5, 7)) - 1,     //mese - 1!
        parseInt(employee.dateOfBirth.substring(8, 10)) + 1)    //giorno + 1!
      this.newPassword = ''
    },
    deleteEmployee() {
      this.checkedEmployees.forEach(empIndex => {
        axios.delete(variables.API_URL + '/employee/' + this.employees[empIndex]._id)
          .then((response) => {
            this.fetchData()
            document.body.querySelector('#dismissOffcanvasConferma').click()
          });
      });
    },
    createEmployee() {
      const form = document.body.querySelector('.needs-validation')
      if (form.checkValidity()) {
        axios.put(variables.API_URL + "/employee", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          passwordHash: this.passwordHash,
          dateOfBirth: this.dateOfBirth
        })
          .then((response) => {
            this.fetchData()
            document.body.querySelector('#dismissModalButton').click()
          });
      }
    },
    modifyEmployee() {
      var indexOfEmp = this.employees.findIndex(emp => emp.name == this.name && emp.surname == this.surname && emp.email == this.email)
      if (this.newPassword != '')
        this.passwordHash = this.newPassword
      axios.put(variables.API_URL + "/employee/" + this.employees[indexOfEmp]._id, {
        name: this.newName,
        surname: this.newSurname,
        email: this.newEmail,
        passwordHash: this.passwordHash,
        dateOfBirth: this.newDateOfBirth
      })
        .then((response) => {
          this.fetchData()
          document.body.querySelector('#dismissModifyModalButton').click()
        });
    },
    dateToYYYYMMDD(d) {
      return d && d.toISOString().split('T')[0]
    },
    getDateOfBirth(d) {
      var date = new Date(d)
      var dateISO = (date.toISOString().split('T')[0]).split('-')
      var dateString = dateISO[2] + '/' + dateISO[1] + '/' + dateISO[0]
      return dateString
    },
    checkboxClickHandler: function (event) {
      //al momento dell'esecuzione lo stato delle checkbox è già stato cambiato!
      if (event.target.checked) {
        this.checkedEmployees.push(event.target.id)
        this.checkboxChecked++
      }
      else {
        this.checkedEmployees.splice(this.checkedEmployees.indexOf(event.target.id), 1)
        this.checkboxChecked--
      }
      if (this.checkboxChecked > 0)
        this.deleteButton.disabled = false
      else
        this.deleteButton.disabled = true
    }
  },
  created: function () {
    this.fetchData()
  },
  mounted: function () {
    document.body.style.backgroundImage = "url('wp4.jpg')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    this.deleteButton = document.body.querySelector('#deleteButton')
    this.deleteButton.disabled = true
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.body.querySelector('#inputDateOfBirth').setAttribute("max", today);
  }
}