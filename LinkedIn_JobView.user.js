// ==UserScript==
// @name        LinkedIn_JobView
// @namespace   marcusborg
// @description Tabella sotto i lavori
// @include     https://www.linkedin.com/jobs/view/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// @grant       GM_openInTab
// ==/UserScript==

// alert("Linkedin_01 funziona");

// 0 scansiona documento
//var scanfinito = false;
function scansiona() {
    window.scrollTo(0, 0);
    //alert("aggiornamento in corso");
    var iScan=0
    var iScanmax=10;
    var iNtervalloScan=1500; //intervallo in millisecondi
    var pIXelScan= 400; //pixel dello scrolling
    myVarScan = setInterval(function() {
        window.scrollBy(0, pIXelScan); iScan++; 
        if (iScan==iScanmax-1) {
            ScriviTabella (TabellaCompleta);
        };
        if (iScan==iScanmax) {
            clearInterval(myVarScan); 
            window.scrollTo(0, 0);
            //alert("fine prima scansione");
            Aggiorna();
        };
    }, iNtervalloScan);
}
window.addEventListener("load", function() {scansiona();}, false);




//1.0 GM_*Value - Funzione per resettare (inizializzare)
function ResetGM () {
    var ListaJobIntp = [["-", "-"],["-", "-"]];
    var ListaJobInts = JSON.stringify(ListaJobIntp);
    GM_setValue("ListaJob", ListaJobInts);
    alert("GM*Value é stato resettato/inizializzato");
}; // Fin qui funziona!

// 1.1 GM*Value- leggere se GM_*Value presente...  Se no: inizializzare --> funzione
if (GM_getValue("ListaJob") == "undefined") {ResetGM()}
//    else {alert("Valore GM ListaJob era giá presente")}
;

// 1.2 Bottone per resettare (manualmente)
$("body").append ( '                                     		\
    <div id="gmPopupContainer2">                          		\
        <button id="Resettttt">reset</button>                   \
    </div>                                                      \
' );
GM_addStyle ( '                                                 \
    #gmPopupContainer2 {                                        \
        position:               fixed;                          \
        bottom:                  0%;                            \
        right:                   0%;                            \
        padding:                1em;                            \
        background:             red;                    		\
        border:                 3px double Black;               \
        border-radius:          2ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer2 button{                                  \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
' );
$("#Resettttt").click ( function () {ResetGM()} );

// 1.3 GM_*Value da stringa ad array!
var ListaJobIntP = JSON.parse(GM_getValue("ListaJob"));
//alert("ListaJobIntP é: " + JSON.stringify(ListaJobIntP));

// 2.0 Componenti tabella
var Testata; Testata = ('   \
    <div>     \
        </br></br></br></br>\
        <table> \
            <tr> \
                <th>Indirizzo</th> \
                <th>Company</th> \
                <th>JobTitle</th> \
                <th>Location</th> \
                <th>JobDescription</th> \
                <th>Experience</th> \
                <th>Settore</th> \
                <th>Funzione</th> \
                <th>Dipendenti</th> \
                <th>TrendAziendaIntera</th> \
                <th>TrendAziendaReparto</th> \
                <th>TrendAziendaTurnOver</th> \
                <th>Candidati</th> \
                <th>Competenza01</th> \
                <th>Competenza02</th> \
                <th>Competenza03</th> \
                <th>Competenza04</th> \
                <th>Competenza05</th> \
                <th>Competenza06</th> \
                <th>Competenza07</th> \
                <th>Competenza08</th> \
                <th>Competenza09</th> \
                <th>Competenza10</th> \
            </tr>\
    ');
var Nuovo; Nuovo = ('   \
            <tr> \
                <td id="DataOutTab00"></td> \
                <td id="DataOutTab01"></td> \
                <td id="DataOutTab02"></td> \
                <td id="DataOutTab03"></td> \
                <td id="DataOutTab04"></td> \
                <td id="DataOutTab05"></td> \
                <td id="DataOutTab06"></td> \
                <td id="DataOutTab07"></td> \
                <td id="DataOutTab08"></td> \
                <td id="DataOutTab09"></td> \
                <td id="DataOutTab10"></td> \
                <td id="DataOutTab11"></td> \
                <td id="DataOutTab12"></td> \
                <td id="DataOutTab13"></td> \
                <td id="DataOutTab14"></td> \
                <td id="DataOutTab15"></td> \
                <td id="DataOutTab16"></td> \
                <td id="DataOutTab17"></td> \
                <td id="DataOutTab18"></td> \
                <td id="DataOutTab19"></td> \
                <td id="DataOutTab20"></td> \
                <td id="DataOutTab21"></td> \
                <td id="DataOutTab22"></td> \
            </tr>\
    ');
var Finita; Finita = (' \
            <tr> \
                <td id="DataErrTab00">-</td> \
                <td id="DataErrTab01">-</td> \
                <td id="DataErrTab02">-</td> \
                <td id="DataErrTab03">-</td> \
                <td id="DataErrTab04">-</td> \
                <td id="DataErrTab05">-</td> \
                <td id="DataErrTab06">-</td> \
                <td id="DataErrTab07">-</td> \
                <td id="DataErrTab08">-</td> \
                <td id="DataErrTab09">-</td> \
                <td id="DataErrTab10">-</td> \
                <td id="DataErrTab11">-</td> \
                <td id="DataErrTab12">-</td> \
                <td id="DataErrTab13">-</td> \
                <td id="DataErrTab14">-</td> \
                <td id="DataErrTab15">-</td> \
                <td id="DataErrTab16">-</td> \
                <td id="DataErrTab17">-</td> \
                <td id="DataErrTab18">-</td> \
                <td id="DataErrTab19">-</td> \
                <td id="DataErrTab20">-</td> \
                <td id="DataErrTab21">-</td> \
                <td id="DataErrTab22">-</td> \
            </tr>\
        </table> \
        </br></br></br></br>\
    </div>                                                                    		\
    ');
var InMezzo; InMezzo = (" ");
iRowMax = ListaJobIntP.length;
iColMax = ListaJobIntP[0].length;
for (var iRow=0; iRow<iRowMax; iRow++)
  {InMezzo = (InMezzo + "<tr> ");
    for (var iCol=0; iCol<iColMax; iCol++)
        {InMezzo = (InMezzo + "<td>" + ListaJobIntP[iRow][iCol] + "</td>");}
  InMezzo = (InMezzo + "</tr>");};

// 2.1 Scrittura tabella
var TabellaCompleta = Testata + Nuovo + InMezzo + Finita;
function ScriviTabella (TabellaTesto) {
    //alert("aspetto click prima di andare in fondo e scrivere tabella");
    window.scrollBy(0, 1000000);
    $("body").append (TabellaTesto)
};
// inserito dopo scansione
//window.addEventListener("load", function() {ScriviTabella (TabellaCompleta)}, false);

// 3.0 Lettura Input / Aggiornamento tabella 
function Aggiorna() {
  window.scrollTo(0, 0);
  //alert("aggiornamento in corso");
  var i = 0
  var imax = 15;
  var iNtervallo = 200; //intervallo in millisecondi
  var pIXel = 400; //pixel dello scrolling
  var NonDefinito = '';
  var OutMessage = '';
  myVar = setInterval(function () {
    window.scrollBy(0, pIXel);
    i++;
// - - -
    if (document.URL == undefined)
    {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Indirizzo, ';
      }
    } else {
      var DataOut_00 = document.getElementById('DataOutTab00');
      if (DataOut_00.innerHTML == '') { DataOut_00.innerHTML = document.URL };
    };
// - - -
    if (document.getElementsByClassName('jobs-details-top-card__company-url') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Company, ';
      }
    } else {
      var DataOut_01 = document.getElementById('DataOutTab01');
      if (DataOut_01.innerHTML == '') { DataOut_01.innerHTML = document.getElementsByClassName('jobs-details-top-card__company-url') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-details-top-card__job-title') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'JobTitle, ';
      }
    } else {
      var DataOut_02 = document.getElementById('DataOutTab02');
      if (DataOut_02.innerHTML == '') { DataOut_02.innerHTML = document.getElementsByClassName('jobs-details-top-card__job-title') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-details-top-card__bullet') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Location, ';
      }
    } else {
      var DataOut_03 = document.getElementById('DataOutTab03');
      if (DataOut_03.innerHTML == '') { DataOut_03.innerHTML = document.getElementsByClassName('jobs-details-top-card__bullet') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-description-content__text') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'JobDescription, ';
      }
    } else {
      var DataOut_04 = document.getElementById('DataOutTab04');
      if (DataOut_04.innerHTML == '') { DataOut_04.innerHTML = document.getElementsByClassName('jobs-description-content__text') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('js-formatted-exp-body') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Experience, ';
      }
    } else {
      var DataOut_05 = document.getElementById('DataOutTab05');
      if (DataOut_05.innerHTML == '') { DataOut_05.innerHTML = document.getElementsByClassName('js-formatted-exp-body') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('js-formatted-industries-list') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Settore, ';
      }
    } else {
      var DataOut_06 = document.getElementById('DataOutTab06');
      if (DataOut_06.innerHTML == '') { DataOut_06.innerHTML = document.getElementsByClassName('js-formatted-industries-list') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('js-formatted-job-functions-list') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Funzione, ';
      }
    } else {
      var DataOut_07 = document.getElementById('DataOutTab07');
      if (DataOut_07.innerHTML == '') { DataOut_07.innerHTML = document.getElementsByClassName('js-formatted-job-functions-list') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-premium-company-growth__stat-item') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Dipendenti, ';
      }
    } else {
      var DataOut_08 = document.getElementById('DataOutTab08');
      if (DataOut_08.innerHTML == '') { DataOut_08.innerHTML = document.getElementsByClassName('jobs-premium-company-growth__stat-item') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-premium-company-growth__stat-item') [1] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'TrendAziendaIntera, ';
      }
    } else {
      var DataOut_09 = document.getElementById('DataOutTab09');
      if (DataOut_09.innerHTML == '') { DataOut_09.innerHTML = document.getElementsByClassName('jobs-premium-company-growth__stat-item') [1].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-premium-company-growth__stat-item') [2] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'TrendAziendaReparto, ';
      }
    } else {
      var DataOut_10 = document.getElementById('DataOutTab10');
      if (DataOut_10.innerHTML == '') { DataOut_10.innerHTML = document.getElementsByClassName('jobs-premium-company-growth__stat-item') [2].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-premium-company-growth_average-tenure') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'TrendAziendaTurnOver, ';
      }
    } else {
      var DataOut_11 = document.getElementById('DataOutTab11');
      if (DataOut_11.innerHTML == '') { DataOut_11.innerHTML = document.getElementsByClassName('jobs-premium-company-growth_average-tenure') [0].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('mt1') [1] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Candidati, ';
      }
    } else {
      var DataOut_12 = document.getElementById('DataOutTab12');
      if (DataOut_12.innerHTML == '') { DataOut_12.innerHTML = document.getElementsByClassName('mt1') [1].innerHTML };
    };
// - - -
    if (document.getElementsByClassName('jobs-premium-applicant-insights__pill') [0] == undefined) {
      if (i == imax - 1) {
        NonDefinito = NonDefinito + 'Competenze, ';
      }
    } else {
      var DataOut_13 = document.getElementById('DataOutTab13');
      if (DataOut_13.innerHTML == '') { DataOut_13.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [0].innerHTML };
      var DataOut_14 = document.getElementById('DataOutTab14');
      if (DataOut_14.innerHTML == '') { DataOut_14.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [1].innerHTML };
      var DataOut_15 = document.getElementById('DataOutTab15');
      if (DataOut_15.innerHTML == '') { DataOut_15.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [2].innerHTML };
      var DataOut_16 = document.getElementById('DataOutTab16');
      if (DataOut_16.innerHTML == '') { DataOut_16.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [3].innerHTML };
      var DataOut_17 = document.getElementById('DataOutTab17');
      if (DataOut_17.innerHTML == '') { DataOut_17.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [4].innerHTML };
      var DataOut_18 = document.getElementById('DataOutTab18');
      if (DataOut_18.innerHTML == '') { DataOut_18.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [5].innerHTML };
      var DataOut_19 = document.getElementById('DataOutTab19');
      if (DataOut_19.innerHTML == '') { DataOut_19.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [6].innerHTML };
      var DataOut_20 = document.getElementById('DataOutTab20');
      if (DataOut_20.innerHTML == '') { DataOut_20.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [7].innerHTML };
      var DataOut_21 = document.getElementById('DataOutTab21');
      if (DataOut_21.innerHTML == '') { DataOut_21.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [8].innerHTML };
      var DataOut_22 = document.getElementById('DataOutTab22');
      if (DataOut_22.innerHTML == '') { DataOut_22.innerHTML = document.getElementsByClassName('jobs-premium-applicant-insights__pill') [9].innerHTML };
    };
    if (i == imax) {
      clearInterval(myVar);
      if (NonDefinito == "") {
        //alert("Tutto caricato completamente!");
        //OutMessage = document.getElementById('Messaggio_ricarica').innerHTML;
        //OutMessage = "Tutto caricato completamente!";
        document.getElementById('Messaggio_ricarica').innerHTML = "Tutto caricato completamente!";
      } else {
        //alert("I seguenti campi non sono definiti: " + NonDefinito);
        document.getElementById('Messaggio_ricarica').innerHTML = ("I seguenti campi non sono definiti: " + NonDefinito);
      }
      window.scrollTo(0, 0);
    };
  }, iNtervallo);
  window.scrollTo(0, 0);
};
// Inserito alla fine della scansione
// window.addEventListener("load", function() {Aggiorna();}, false);

// 3.1 Bottone per ricaricare
$("body").append ( '                                            \
    <div id="gmPopupContainer">                                 \
        <p id=Messaggio_ricarica>                               \
            caricamento...                                      \
        </p>                                                    \
        </br>                                                   \
        <button id="Caricaaaaa">Ricarica da LinkedIn</button>   \
    </div>                                                      \
' );
//--- CSS styles make it work...
GM_addStyle ( '                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    5%;                             \
        left:                   0%;                             \
        padding:                1em;                            \
        background:             Aqua;                    		\
        border:                 3px double Black;               \
        border-radius:          2ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
' );
$("#Caricaaaaa").click ( function () {Aggiorna()} );


// 4.0 Funzione salvataggio nuove acquisizioni (Aggiornamento e salvataggio e stringhificazione GM_*Value
function Aggiorna3() {
  // 4.0 Preparazione Output
  var DataOutNew = [
    [
    DataOutTab00.innerHTML,
    DataOutTab01.innerHTML,
    DataOutTab02.innerHTML,
    DataOutTab03.innerHTML,
    DataOutTab04.innerHTML,
    DataOutTab05.innerHTML,
    DataOutTab06.innerHTML,
    DataOutTab07.innerHTML,
    DataOutTab08.innerHTML,
    DataOutTab09.innerHTML,
    DataOutTab10.innerHTML,
    DataOutTab11.innerHTML,
    DataOutTab12.innerHTML,
    DataOutTab13.innerHTML,
    DataOutTab14.innerHTML,
    DataOutTab15.innerHTML,
    DataOutTab16.innerHTML,
    DataOutTab17.innerHTML,
    DataOutTab18.innerHTML,
    DataOutTab19.innerHTML,
    DataOutTab20.innerHTML,
    DataOutTab21.innerHTML,
    DataOutTab22.innerHTML
    ],
  ];
  //alert("JSON.stringify(DataOutNew) é:    " + JSON.stringify(DataOutNew));
  var dataout;
  var listajobint;
  var listajobintstring;
  var iOut;
  var Lunghezza;
  // ciclo for per essere sicuri contro sincronicitá
  for (iOut = 0; iOut < 3; iOut++) {
    if (iOut == 0) {
      listajobint = JSON.parse(GM_getValue('ListaJob'));
      //alert("listajobint é:   " + JSON.stringify(listajobint));
    }; // Ricaricare (potrebbe essere stata modificata in altre finestre!)
    if (iOut == 1) {
      dataout = DataOutNew.concat(listajobint);
      Lunghezza = dataout.length;
    }; // Aggiungere (in testa) la nuova riga
    if (iOut == 2) {
      listajobintstring = JSON.stringify(dataout);
      //alert(listajobintstring);
      (GM_setValue('ListaJob', listajobintstring));
    }; // Scrivere il nuovo valore
  };
  //alert('Data Lavoro salvati. \n La lista contiene ' + Lunghezza + ' lavori');
  document.getElementById('Saaalva').innerHTML = ('Offerta salvata. La lista contiene ' + Lunghezza + ' offerte');
};

$("body").append ( '                                     	    	\
    <div id="gmPopupContainer3">                          		  \
        <button id="TabHTML">Tabella in HTML</button>           \
        </br>                                                   \
        <button id="Saaalva">Salva</button>                     \
    </div>                                                      \
' );
GM_addStyle ( '                                                 \
    #gmPopupContainer3 {                                        \
        position:               fixed;                          \
        top:                     5%;                            \
        right:                   0%;                            \
        padding:                1em;                            \
        background:             Aqua;                    		    \
        border:                 3px double Black;               \
        border-radius:          2ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer3 button{                                  \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
' );
$("#Saaalva").click ( function () {Aggiorna3()} );
$("#TabHTML").click ( function () {alert(TabellaCompleta)} );
