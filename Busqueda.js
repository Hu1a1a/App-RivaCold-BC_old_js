var ArrayDB = ["RivaColdEq",
    "RivaColdEvap",
    "RivaColdCond",
    "RivaColdCentral",
    "IntarConEq",
    "IntarConEvap",
    "IntarConCond",
    "IntarConCentral",
    "ZanottiEq",
    "ZanottiEvap",
    "ZanottiCond",
    "ZanottiCentral",
    "KideEq",
    "KideEvap",
    "KideCond",
    "KideCentral"
]
var ArrayRivaCold = ["RivaColdEq",
    "RivaColdEvap",
    "RivaColdCond",
    "RivaColdCentral",
    "RivaColdOPT",
    "RivaColdTarifa0000"
]
var ArrayCliente = ["RivaColdCliente"]

function Busqueda1(idsearch, idresult) {
    var RegLocal = []
    var i = 0
    document.getElementById(idresult).innerHTML = ""
    sp = document.getElementById(idsearch).value
    for (n = 0; n < ArrayDB.length; n++) {
        DB = JSON.parse(localStorage.getItem(ArrayDB[n]))
        for (j = 0; j < DB.length; j++) {
            var list_modelo = document.getElementById(idresult)
            if ((DB[j]['Ref']).toLowerCase().indexOf((sp).toLowerCase()) > -1) {
                var option_modelo = document.createElement("option");
                option_modelo.text = DB[j]['Ref'];
                list_modelo.add(option_modelo, list_modelo[-1])
                RegLocal[i] = n + "_" + DB[j]['Gama']
                i += 1
            }
        }
    }
    sessionStorage.setItem("SearchRegister1", JSON.stringify(RegLocal))
}

function Busqueda2(idsearch, idresult) {
    var RegLocal = []
    var i = 0
    document.getElementById(idresult).innerHTML = ""
    sp = document.getElementById(idsearch).value
    for (n = 0; n < ArrayRivaCold.length; n++) {
        DB = JSON.parse(localStorage.getItem(ArrayRivaCold[n]))
        for (j = 0; j < DB.length; j++) {
            var list_modelo = document.getElementById(idresult)
            if (('x' + DB[j]['Ref']).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1) {
                var option_modelo = document.createElement("option");
                option_modelo.text = DB[j]['Ref'];
                list_modelo.add(option_modelo, list_modelo[-1])
                RegLocal[i] = DB[j]['Descripción'] + "_" + DB[j]['Precio']
                i += 1
            }
        }
    }
    sessionStorage.setItem("SearchRegister2", JSON.stringify(RegLocal))
}

function Busqueda3(idsearch, idresult) {
    var RegLocal = []
    var i = 0
    document.getElementById(idresult).innerHTML = ""
    sp = document.getElementById(idsearch).value
    for (n = 0; n < ArrayCliente.length; n++) {
        DB = JSON.parse(localStorage.getItem(ArrayCliente[n]))
        for (j = 0; j < DB.length; j++) {
            var list_modelo = document.getElementById(idresult)
            if (('x' + DB[j]['Cliente']).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1 || ('x' + DB[j]['C#I#F#']).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1 || ('x' + DB[j]['Nombre']).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1 || ('x' + DB[j]['Razón Social']).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1 || ('x' + parseFloat(DB[j]['Teléfono'])).toUpperCase().indexOf(('x' + sp).toUpperCase()) > -1) {
                var option_modelo = document.createElement("option");
                option_modelo.text = DB[j]['Razón Social'];
                list_modelo.add(option_modelo, list_modelo[-1])
                RegLocal[i] = DB[j]['Cliente'] + "_" + DB[j]['C#I#F#'] + "_" + DB[j]['Razón Social'] + "_" + DB[j]['Dirección'] + "_" + DB[j]['C#P'] + "_" + DB[j]['Población'] + "_" + DB[j]['Provincia'] + "_" + DB[j]['Teléfono'] + "_" + DB[j]['Pais'] + "_" + DB[j]['Forma PAGO'] + "_" + DB[j]['Observaciones']
                i += 1
            }
        }
    }
    sessionStorage.setItem("SearchRegister3", JSON.stringify(RegLocal))
}

function Seleccionar1(idresult) {
    var Register = JSON.parse(sessionStorage.getItem("SearchRegister1"))
    var i = document.getElementById(idresult).selectedIndex
    var split = Register[i].split("_")
    document.getElementById("BusquedaMarca").innerText = (split[0] / 4).toFixed(0)
    document.getElementById("BusquedaTipo").innerText = split[0] - (split[0] / 4).toFixed(0) * 4
    document.getElementById("BusquedaGama").innerText = split[1]
}

function Seleccionar2(idresult) {
    var Register = JSON.parse(sessionStorage.getItem("SearchRegister2"))
    var i = document.getElementById(idresult).selectedIndex
    var split = Register[i].split("_")
    document.getElementById("RefModelo").value = document.getElementById(idresult).value
    document.getElementById("textoModelo").innerText = split[0]
    document.getElementById("Precio").value = parseFloat(split[1]).toFixed(2) + "€"
}

function Seleccionar3(idresult) {
    var Register = JSON.parse(sessionStorage.getItem("SearchRegister3"))
    var i = document.getElementById(idresult).selectedIndex
    var split = Register[i].split("_")
    document.getElementById("DatosCliente").innerHTML = "Numero de cliente: " + split[0]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nC.I.F.: " + split[1]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nRazón Social: " + split[2]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nDirección: " + split[3]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nC.P: " + split[4]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nPoblación: " + split[5]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nProvincia: " + split[6]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nTeléfono: " + split[7]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nPais: " + split[8]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nForma de Pago: " + split[9]
    document.getElementById("DatosCliente").innerHTML = document.getElementById("DatosCliente").innerHTML + "\nObservación: " + split[10]
    document.getElementById('DatosCliente').rows = 0
    document.getElementById('DatosCliente').rows = parseFloat(document.getElementById('DatosCliente').scrollHeight / 24).toFixed(0)

}

function Aplicar1(idresult) {
    document.getElementById("list_marcaA").selectedIndex = document.getElementById("BusquedaMarca").innerText
    document.getElementById("list_type").selectedIndex = document.getElementById("BusquedaTipo").innerText
    SeleccionarProveedor()
    document.getElementById("list_gama").value = document.getElementById("BusquedaGama").innerText
    SeleccionarGama()
    document.getElementById("list_modelo").value = document.getElementById(idresult).value
    SeleccionarModelo()
}

function Aplicar2(idresult) {
    var Register = JSON.parse(sessionStorage.getItem("SearchRegister3"))
    var i = document.getElementById(idresult).selectedIndex
    var split = Register[i].split("_")
    document.getElementById("Oferta_NCliente").value = split[0]
    document.getElementById("Oferta_CIF").value = split[1]
    document.getElementById("Oferta_RazónSocial").value = split[2].toUpperCase()
    document.getElementById("Oferta_Dirección").value = split[3].toUpperCase()
    document.getElementById("Oferta_CP").value = split[4] + " - " + split[5].toUpperCase()
    document.getElementById("Oferta_Pais").value = split[6].toUpperCase() + " - " + split[8].toUpperCase()
    document.getElementById("Oferta_Telf").value = split[7]
    document.getElementById("Oferta_FormaPago").value = split[9]
}

function AppereSearch() {
    if (document.getElementById("ModalBuscador").style.display == 'none') {
        document.getElementById("ModalBuscador").style.display = ''
        document.getElementById("ModalOpcion").style.display = 'none'
    } else {
        document.getElementById("ModalBuscador").style.display = 'none'
        document.getElementById("ModalOpcion").style.display = ''
    }
}