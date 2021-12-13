const employee = {
  template: `
  <div>

  <ul class="list-group list-group-flush">
    <li v-for="emp in employees" class="list-group-item bg-secondary">
      <div class="row">
        <div class="col-3 d-flex justify-content-center align-items-center">
          <div class="px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 15 15">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <p style="border-radius: 10px; width: 80%" class="px-3 mx-3 my-0 bg-warning border border-dark">
            <b>Nome: </b>{{emp.name}}<br><b>Cognome: </b>{{emp.surname}}
          </p>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <p style="padding: 13px 16px; border-radius: 10px; width: 80%" class="m-0 bg-warning border border-dark text-center">
            <b>Email: </b>{{emp.email}}
          </p>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <p style="padding: 13px 16px; border-radius: 10px; width: 80%" class="m-0 bg-warning border border-dark text-center">
            <b>Data di nascita: </b>{{emp.dateOfBirth}}
          </p>
        </div>
        <div class="col d-flex justify-content-center">
          <button type="button" class="btn btn-light px-2 py-0">Modifica utente</button>
        </div>
      </div>
    </li>
  </ul>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <form>
          <div class="flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <div class="input-group mb-3">
                <span class="input-group-text">Nome</span>
                <input type="text" class="form-control" v-model="name" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Cognome</span>
                <input type="text" class="form-control" v-model="surname">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Indirizzo email</span>
                <input type="text" class="form-control" v-model="email">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="passwordHash">
              </div>
              
            <!-- @TODO: reinserimento password con controllo
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="EmployeePassword">
              </div>
                -->
              <div class="input-group mb-3">
                <span class="input-group-text">Data di nascita</span>
                <input type="date" class="form-control" v-model="dateOfBirth">
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


</div>
`,

  data() {
    return {
      employees: [],
      modalTitle: '',
      name: '',
      surname: '',
      email: '',
      passwordHash: '',
      dateOfBirth: '',
    }
  },
  methods: {
    fetchData() {
      axios.get(variables.API_URL + '/employee')
        .then((response) => {
          this.employees = response.data;
        });
    },
    addClick() {
      this.modalTitle = 'Add employee';
      this.name = '',
        this.surname = '',
        this.email = '',
        this.dateOfBirth = ''
    },
    createEmployee() {
      //@TODO qui non funziona, scegli tipologia di dato con cui fare calcoli
      if (this.DateOfBirth < new Date().toLocaleString() - 18) {
        axios.post(variables.API_URL + "/employee", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          passwordHash: this.passwordHash,
          dateOfBirth: this.dateOfBirth
        })
          .then((response) => {
            this.fetchData();
            alert(response.data);
          });
      }
    },
    refreshLayout() {
      document.querySelector('#addEmployee').className = 'btn btn-light px-2 py-0';
      document.querySelector('#map').className = 'd-none';
    }
  },
  mounted: function () {
    this.refreshLayout();
    this.fetchData();
  }

}