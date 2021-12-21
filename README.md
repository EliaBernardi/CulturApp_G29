# CulturApp_G29
<p align="center">
  <img width="300" src="https://i.postimg.cc/CxPxJg6F/unitn-1.jpg">

</p>
<h4 align="center">
Progetto CulturApp del gruppo G29 
  
Università degli studi di Trento
  
Ingegneria del software 1 [146064]

Dipartimento di Ingegneria e Scienza dell’Informazione

A.A 2021/2022
</h4>

[![immagine-2021-12-21-212620.png](https://i.postimg.cc/W1Q7dQ64/immagine-2021-12-21-212620.png)](https://postimg.cc/68fZSbPs)

## Note
Se è necessario testare le API con postman selezionare il formato 'x-www-form-urlencoded' all'interno del body della richiesta.

## Requisiti
Per avviare il progetto è necessaria l'ultima versione di nodeJs disponibile a questo link: [Download NodeJs](https://nodejs.org/en/download/)

## Installazione
- Scaricare il pacchestto zip: [Download](https://github.com/eliabernardi01/CulturApp_G29/archive/refs/heads/main.zip)
- Estrarre la cartella contenuta all'interno dello zip nella quale saranno presenti due cartelle a cui fare riferimento denominate **api** e **ui**

### Avviare il database
- Entrare nella cartella **api**
- Da terminale avviare il file *index.js* con il seguente comando
```dos
node index.js
```
- Lasciare il cmd aperto durante l'utilizzo

### Avviare l'applicativo
- Entrare nella cartella **ui**
- Avviare il file denominato *index.html*
- Per un corretto funzionamento si consiglia di tenere la pagina web a schermo intero.

## Come si presenta l'applicativo
La prima schermata visualizzata sarà la mappa della città (potrebbe capitare un popup che segnala un errore di visualizzazione, in tal caso cliccare su ok e ignorare il fatto, si tratta dell'assenza del token per l'utilizzo dei servizi di google maps essendo il codice pubblico, comunque l'applicativo è totalmente funzionante).
Da questa schermata si possono visualizzare i musei grazie ad unicona pointer rossa, cliccando sulla quale sarà possibile visualizzare i dettagli del museo.
[![immagine-2021-12-21-220833.png](https://i.postimg.cc/B6tw4FxK/immagine-2021-12-21-220833.png)](https://postimg.cc/47k11m2f)

Il menu è costituto dalle seguenti voci:
- **CulturApp**: Per visualizzare la mappa
- **Scannerizza ticket**: per la gestione e la validazione dei ticket
- **Area personale**: per la gestione dei dipendenti

Nello specifico, in quest'ultima si potrà:
- [x] Visualizzare e modificare i profili dipendenti
- [x] Visualizzare i dati anagrafici dell'amministratore
- [ ] Monitorare l'attività dei dipendenti
- [ ] Modificare le password

## Gestione dei dipendenti
[![immagine-2021-12-21-220032.png](https://i.postimg.cc/zGVN2yQV/immagine-2021-12-21-220032.png)](https://postimg.cc/rDX7KwMk)
Recarsi nella sezione *Area personale > Gestione dei dipendenti* del menù per visualizzare l'elenco dei dipendenti salvati.
Da questa schermata è possibile visualizzare, modificare, aggiungere ed elliminare i profili dei dipendenti

### Modificare un dipendente
Per modificare un dipendente è neccessario cliccare sull'apposito bottone ***Visualizza e modifica utente***, in questa maniera comparirà il form per modificare i dati
**N.B:** tutti i campi devono essere inseriti correttamente (salvo la password che se lasciata vuota manterrà quella precedente) prima di salvare

[![immagine-2021-12-21-214110.png](https://i.postimg.cc/ydKtZJXW/immagine-2021-12-21-214110.png)](https://postimg.cc/mcdmxgnG)

### Creare un dipendente
Per creare un nuovo dipendente sarà necessario cliccare sul bottone [![immagine-2021-12-21-214424.png](https://i.postimg.cc/MpR9m6GB/immagine-2021-12-21-214424.png)](https://postimg.cc/jDx6srPq), successivamente compilare il form e e premere il tasto ***create***

[![immagine-2021-12-21-215037.png](https://i.postimg.cc/W3KgrFxg/immagine-2021-12-21-215037.png)](https://postimg.cc/34XkQR8x)

### Eliminare i dipendenti
Per poter eliminare uno o può dipendenti bisognerà prima selezionare i profili interessati tramite la check box presente a destra di ogni utente, successivamente cliccare il tasto [![immagine-2021-12-21-215514.png](https://i.postimg.cc/R0hWRC7R/immagine-2021-12-21-215514.png)](https://postimg.cc/p9NVVH1h) e confermare l'eliminazione

[![immagine-2021-12-21-220156.png](https://i.postimg.cc/L5xdNSBt/immagine-2021-12-21-220156.png)](https://postimg.cc/K33s8dWj)

### Visualizzare i dati dell'amministratore
Recarsi nella sezione *Area personale > Gestione dei dipendenti* del menù per visualizzare i dati personali
[![immagine-2021-12-21-220243.png](https://i.postimg.cc/QdR2605y/immagine-2021-12-21-220243.png)](https://postimg.cc/jD4326MH)

## Validazione ticket
In questa sezione sarà possibile visualizzare e convalidare i ticket presenti tramite l'apposito tasto
[![immagine-2021-12-21-220353.png](https://i.postimg.cc/zGRMRKMS/immagine-2021-12-21-220353.png)](https://postimg.cc/cv0Tpgdr)
