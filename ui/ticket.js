const ticket = {
  template: `
  <div class="row ticket-row justify-content-center">
  <div  v-for="(ticket,  index) in tickets" :key="index" class="col ticket-box">
    <div class="card h-100">
      <div class="row g-0 h-100">
        <div class="col-4 h-100 d-flex align-items-center" v-bind:id="index"></div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">{{getTicketStatus(ticket)}}</h5>
            <ul class="list-group list-group-flush list-unstyled">
              <li class="list-group-item">
                <p class="card-text"><b>Nome del proprietario:</b> {{ticket.customerName}}</p>
              </li>
              <li class="list-group-item">
                <p class="card-text"><b>Cognome del proprietario:</b> {{ticket.customerSurname}}</p>
              </li>
              <li class="list-group-item">
                <p class="card-text"><b>Email proprietario:</b> {{ticket.customerEmail}}</p>
              </li>
              <li class="list-group-item">
                <p class="card-text"><b>Data:</b> {{getDate(ticket.ticketDate)}}</p>
              </li>
              <li class="list-group-item">
                <p class="card-text"><b>Location:</b> {{ticket.location.locationName}}</p>
              </li>
              <li class="list-group-item" style="padding-bottom: 0">
                <button v-if="!ticket.validated" type="submit" @click="validateTicket(ticket)" class="btn btn-primary w-100">
                  Valida ticket
                </button>
                <button v-else type="submit" class="btn btn-primary w-100 disabled">
                  Valida ticket
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      tickets: []
    }
  },
  methods: {
    fetchData() {
      //popolo la lista tickets
      axios.get(variables.API_URL + "/ticket")
        .then((response) => {
          if (!Object.keys(response.data).length) {
            this.generateRandomTickets().then(() => {
              this.fetchData()
            })
          }
          else {
            this.tickets = []
            this.tickets = response.data
            this.$nextTick(() => {
              this.fillQrCodes()
            })
          }
        })
    },
    getDate(d) {
      var date = new Date(d)
      var dateISO = (date.toISOString().split('T')[0]).split('-')
      var dateString = dateISO[2] + '/' + dateISO[1] + '/' + dateISO[0]
      return dateString
    },
    async generateRandomTickets() {
      //creo 2 ticket random per mostrare le funzionalità principali
      const req1 = axios.post(variables.API_URL + "/ticket", {
        name: 'CustomerName_1',
        surname: 'CustomerSurname_1',
        email: 'CustomerEmail_1',
        date: new Date(2022, 0, 2)
      })
      const req2 = axios.post(variables.API_URL + "/ticket", {
        name: 'CustomerName_2',
        surname: 'CustomerSurname_2',
        email: 'CustomerEmail_2',
        date: new Date(2022, 1, 2)
      })
      await axios.all([req1, req2])
    },
    validateTicket(ticket) {
      axios.put(variables.API_URL + "/ticket/" + ticket._id)
        .then(() => {
          this.fetchData()
        })
    },
    getTicketStatus(ticket) {
      return ticket.validated ? 'Ticket già validato' : 'Ticket non validato'
    },
    fillQrCodes() {
      var index = 0
      this.tickets.forEach(ticket => {
        var el = document.getElementById(index)
        while (el.firstChild) {
          el.firstChild.remove()
        }
        var qrcode = new QRCode(el, {
          height: el.clientWidth,
          width: el.clientWidth
        })
        qrcode.makeCode(ticket._id)
        index++
      });
    }
  },
  mounted: function () {
    document.body.style.backgroundImage = "url('wp2.jpg')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.overflowX = 'hidden'
    this.fetchData()
  },
  deactivated: function () {
    Console.log('deactivated')
  },
  beforeUnmount: function () {
    Console.log('beforeUnmount')
  }
}