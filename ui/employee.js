const employee = {
  template: `
  <div>
  <!--
  <button type="button" class="btn btn-light px-2 py-0 top-right" data-bs-toggle="modal" data-bs-target="#exampleModal"
    @click="addClick()">
    Add Employee
  </button>
  
  <table class="table table-striped">
    <thead>
      <tr>
        <th>
          Employee Id
        </th>
        <th>
          Employee Name
        </th>
        <th>
          Department
        </th>
        <th>
          DOJ
        </th>
        <th>
          Options
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="emp in employees">
        <td>{{emp.EmployeeId}}</td>
        <td>{{emp.EmployeeName}}</td>
        <td>{{emp.Department}}</td>
        <td>{{emp.DateOfJoining}}</td>
        <td>
          <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal"
            @click="editClick(emp)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </button>
          <button type="button" @click="deleteClick(emp.EmployeeId)" class="btn btn-light mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>

        </td>
      </tr>
    </tbody>
    </thead>
  </table>
  -->

  <ul class="list-group list-group-flush">
    <li v-for="emp in employees" class="list-group-item">
      <div class="row">
        <div class="col">{{emp.EmployeeName + " " + emp.EmployeeSurname}}</div>
        <div class="col">{{emp.EmployeeEmail}}</div>
        <div class="col">{{emp.DateOfBirth}}</div>
        <div class="col">
          <button type="button" class="btn btn-light px-2 py-0">sono un bottone</button>
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
                <input type="text" class="form-control" v-model="EmployeeName" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Cognome</span>
                <input type="text" class="form-control" v-model="EmployeeSurname">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Indirizzo email</span>
                <input type="text" class="form-control" v-model="EmployeeEmail">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="EmployeePsw">
              </div>
              
            <!-- @TODO: reinserimento password con controllo
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input type="text" class="form-control" v-model="EmployeePassword">
              </div>
                -->
              <div class="input-group mb-3">
                <span class="input-group-text">Data di nascita</span>
                <input type="date" class="form-control" v-model="DateOfBirth">
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
      EmployeeName: '',
      EmployeeSurname: '',
      EmployeeEmail: '',
      EmployeePsw: '',
      DateOfBirth: '',
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
      this.EmployeeName = '',
        this.EmployeeSurname = '',
        this.EmployeeEmail = '',
        this.DateOfBirth = ''
    },
    createEmployee() {
      //@TODO qui non funziona, scegli tipologia di dato con cui fare calcoli
      if (this.DateOfBirth < new Date().toLocaleString() - 18) {
        axios.post(variables.API_URL + "/employee", {
          EmployeeName: this.EmployeeName,
          EmployeeSurname: this.EmployeeSurname,
          EmployeeEmail: this.EmployeeEmail,
          EmployeePsw: this.EmployeePsw,
          DateOfBirth: this.DateOfBirth
        })
          .then((response) => {
            this.fetchData();
            alert(response.data);
          });
      }
    },
    refreshLayout() {
      document.querySelector('#addEmployee').className = 'btn btn-light px-2 py-0';
    }
  },
  mounted: function () {
    this.refreshLayout();
    this.fetchData();
  }

}