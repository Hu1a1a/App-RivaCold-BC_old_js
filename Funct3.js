function Display_Tabla(Table, j) {
    var len = document.getElementById(Table).getElementsByTagName('textarea').length
    if (document.getElementById(Table).getElementsByTagName("th")[j].style.display == "none") {
        document.getElementById(Table).getElementsByTagName("th")[j].style.display = ""
        for (k = 0; k < len; k++) {
            document.getElementById(Table).getElementsByTagName('td')[j + 7 * k].style.display = ""
        }
    } else {
        document.getElementById(Table).getElementsByTagName("th")[j].style.display = "none"
        for (k = 0; k < len; k++) {
            document.getElementById(Table).getElementsByTagName('td')[j + 7 * k].style.display = "none"
        }
    }
}

function Display_DescuentoPP() {
    if (document.getElementById("DescuentoPPC").style.display == "none") {
        document.getElementById("DescuentoPPC").style.display = ""
        document.getElementById("tdDescuentoPP").style.display = ""
    } else {
        document.getElementById("DescuentoPPC").style.display = "none"
        document.getElementById("tdDescuentoPP").style.display = "none"
    }
}

function Display_Impuesto() {
    if (document.getElementById("Table_Impuesto").style.display == "none") {
        document.getElementById("Table_Impuesto").style.display = ""
        document.getElementById("PrecioTotalIva").style.display = ""
        document.getElementById("LineaDivisionImpuesto").style.visibility = ""
    } else {
        document.getElementById("Table_Impuesto").style.display = "none"
        document.getElementById("PrecioTotalIva").style.display = "none"
        document.getElementById("LineaDivisionImpuesto").style.visibility = "hidden"
    }
}

function DisableInput(idcheck, iddisable) {
    if (document.getElementById(idcheck).checked) {
        document.getElementById(iddisable).disabled = true
    } else {
        document.getElementById(iddisable).disabled = false
    }
}

function SeleccionarModelo() {
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    var list_gama = document.getElementById("list_Gama");
    var array_gama = []
    list_gama.innerHTML = ""
    for (i = 0; i < RivaColdDB.length; i++) {
        if (!array_gama.includes(RivaColdDB[i]['Gama']) && RivaColdDB[i]['Gama']) {
            var option_gama = document.createElement("option");
            option_gama.text = RivaColdDB[i]['Gama'];
            list_gama.add(option_gama, list_gama[0]);
            array_gama[i] = RivaColdDB[i]['Gama']
        }
    }
    SeleccionarGama()
}

function SeleccionarGama() {
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    var list_modelo = document.getElementById("list_modelo");
    list_modelo.innerHTML = ""
    for (i = 0; i < RivaColdDB.length; i++) {
        if (document.getElementById("list_Gama").value == RivaColdDB[i]['Gama']) {
            option_modelo = document.createElement("option");
            option_modelo.text = RivaColdDB[i]['Ref'];
            list_modelo.add(option_modelo, list_modelo[0])
        }
    }
    SeleccionarProducto()
}

function SeleccionarProducto() {
    document.getElementById("Precio").value = ""
    document.getElementById("Cantidad").value = "1"
    document.getElementById("PrecioNeto").value = ""
    document.getElementById("RefModelo").value = document.getElementById("list_modelo").value
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    for (i = 0; i < RivaColdDB.length; i++) {
        if (document.getElementById("list_modelo").value == RivaColdDB[i]['Ref']) {
            document.getElementById("Precio").value = RivaColdDB[i]['Precio']
            document.getElementById("textoModelo").innerText = RivaColdDB[i]['Descripción']
            break
        }
    }
    document.getElementById("ComplementoModelo").innerHTML = ""
    CalculoPrecio()
}

function CalculoDescuento() {
    var dto1, dto2, dto3
    dto1 = parseFloat(document.getElementById("dto1").value) / 100
    dto2 = parseFloat(document.getElementById("dto2").value) / 100
    dto3 = parseFloat(document.getElementById("dto3").value) / 100
    if (isNaN(dto1)) { dto1 = 0 } else {
        document.getElementById("dto1").value = (dto1 * 100).toFixed(2) + " %"
    }
    if (isNaN(dto2)) { dto2 = 0 } else {
        document.getElementById("dto2").value = (dto2 * 100).toFixed(2) + " %"
    }
    if (isNaN(dto3)) { dto3 = 0 } else {
        document.getElementById("dto3").value = (dto3 * 100).toFixed(2) + " %"
    }
    document.getElementById("dto.Final").value = ((1 - (1 - dto1) * (1 - dto2) * (1 - dto3)) * 100).toFixed(2) + " %"
    if (parseFloat(document.getElementById("dto.Final").value) > 100 || parseFloat(document.getElementById("dto.Final").value) < 0) { document.getElementById("dto.Final").value = "100 %" }
    CalculoPrecio()
}

function CalculoPrecio() {
    if (isNaN(parseFloat(document.getElementById("Precio").value))) {
        document.getElementById("Precio").value = ""
    } else {
        document.getElementById("Precio").value = parseFloat(document.getElementById("Precio").value).toFixed(2) + "€"
        var len = document.getElementById("ComplementoModelo").getElementsByTagName("input").length
        var inp = document.getElementById("ComplementoModelo").getElementsByTagName("input")
        var Precio = parseFloat(document.getElementById("Precio").value)
        for (i = 0; i < len / 2; i++) {
            if (inp[2 * i + 1].value != "") {
                Precio += parseFloat(inp[2 * i + 1].value)
            }
        }
        document.getElementById("PrecioNeto").value = (Precio * (1 - parseFloat(document.getElementById("dto.Final").value) / 100)).toFixed(2) + " €"
        if (isNaN(parseFloat(document.getElementById("Cantidad").value))) {} else {
            document.getElementById("PrecioNetoTotal").value = (parseFloat(document.getElementById("PrecioNeto").value) * parseFloat(document.getElementById("Cantidad").value)).toFixed(2) + " €"
        }
    }

}


function RegistrarModelo() {
    var Table = JSON.parse(localStorage.getItem("TableOferta"))
    var Reference = JSON.parse(localStorage.getItem("TextoModelo"))
    if (Table == null) {
        var Table = [
            []
        ];
        var Reference = []
    }
    j = parseFloat(document.getElementById("Table_Detalle").getElementsByTagName("tbody")[0].getElementsByTagName("th").length)
    Table[j] = ([document.getElementById("RefModelo").value, document.getElementById("Cantidad").value, document.getElementById("Precio").value, document.getElementById("dto.Final").value, document.getElementById("PrecioNeto").value, document.getElementById("PrecioNetoTotal").value])
    var len = document.getElementById("ComplementoModelo").getElementsByTagName("input").length
    var inp = document.getElementById("ComplementoModelo").getElementsByTagName("input")
    Reference[j] = (document.getElementById("textoModelo").value)
    for (i = 0; i < len / 2; i++) {
        Reference[j] = Reference[j] + "\r" + inp[2 * i].value
    }
    localStorage.setItem("TableOferta", JSON.stringify(Table))
    localStorage.setItem("TextoModelo", JSON.stringify(Reference))
    PushDB()
}

function PushDB() {
    ClearTable()
    var TotalOfertaPrecio = 0
    var Table = JSON.parse(localStorage.getItem("TableOferta"))
    var Reference = JSON.parse(localStorage.getItem("TextoModelo"))
    var itemCount = '001'
    if (Table) {
        for (i = 0; i < Table.length; i++) {
            if (Table[i][0]) {
                item = itemCount;
                itemCount = ("00" + (parseFloat(itemCount) + 1)).slice(-3)
            } else { item = '' }
            document.getElementById('Table_Detalle').getElementsByTagName('tbody')[0].insertRow().innerHTML = "<th scope='row' style='text-align:center'>" + item + "</th><td><input></td><td><textarea></textarea></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td>"
            document.getElementById('Table_Detalle').getElementsByTagName('th')[i + 8].insertAdjacentHTML('beforeend', "<button><i class='bi bi-x-octagon'style='color:red;font-size:12px;vertical-align:bottom' onclick='BorrarLinea(" + [i] + ")'></i></button>")
            if (i) { document.getElementById('Table_Detalle').getElementsByTagName('td')[7 * i + 1].insertAdjacentHTML('beforeend', "<button><i class='bi bi-arrow-up-square'style='color: green;font-size:12px;margin-right:10px' onclick='MoveItem(" + [i] + ",+1)'></i></button>") }
            if (i < Table.length - 1) {
                document.getElementById('Table_Detalle').getElementsByTagName('td')[7 * i + 1].insertAdjacentHTML('beforeend', "<button><i class='bi bi-arrow-down-square'style='color: green;font-size:12px;margin-right:10px' onclick='MoveItem(" + [i] + ",-1)'></i></button>")
            }
            for (j = 0; j < 6; j++) {
                document.getElementById('Table_Detalle').getElementsByTagName('input')[j + 6 * i].value = Table[i][j]
            }
            if (isNaN(parseFloat(Table[i][5]))) {} else {
                TotalOfertaPrecio += parseFloat(Table[i][5])
            }
            document.getElementById('Table_Detalle').getElementsByTagName('textarea')[i].innerHTML = Reference[i]
            document.getElementById('Table_Detalle').getElementsByTagName('textarea')[i].rows = 0
            document.getElementById('Table_Detalle').getElementsByTagName('textarea')[i].rows = parseFloat(document.getElementById('Table_Detalle').getElementsByTagName('textarea')[i].textContent.split("\n").length + 1)
            CheckStock(i)
        }
    }
    if (!document.getElementById("DescuentoPP").value) { document.getElementById("DescuentoPP").value = 0 + " %" }
    if (!document.getElementById("IVA").value) { document.getElementById("IVA").value = 21 + " %" }
    document.getElementById("DescuentoPP").value = parseFloat(document.getElementById("DescuentoPP").value).toFixed(0) + " %"
    document.getElementById("IVA").value = parseFloat(document.getElementById("IVA").value).toFixed(0) + " %"
    document.getElementById("TotalOferta").textContent = TotalOfertaPrecio.toFixed(2) + " €"
    document.getElementById("BaseImponible").textContent = (TotalOfertaPrecio * (1 - (parseFloat(document.getElementById("DescuentoPP").value) / 100))).toFixed(2) + " €"
    document.getElementById("ImpuestoIVA").textContent = (parseFloat(document.getElementById("BaseImponible").textContent) * (parseFloat(document.getElementById("IVA").value) / 100)).toFixed(2) + " €"
    document.getElementById("TotalOfertaIVA").textContent = (parseFloat(document.getElementById("BaseImponible").textContent) * ((1 + parseFloat(document.getElementById("IVA").value) / 100))).toFixed(2) + " €"
}

function CheckStock(i) {
    var DBStock = JSON.parse(localStorage.getItem("RivaColdStock"))
    var DBGama = JSON.parse(localStorage.getItem("RivaColdGama"))
    for (j = 0; j < DBStock.length; j++) {
        if (document.getElementById('Table_Detalle').getElementsByTagName('input')[6 * i].value == DBStock[j]['Ref']) {
            var Plazo = ""
            for (k = 0; k < DBGama.length; k++) {

                if (document.getElementById('Table_Detalle').getElementsByTagName('input')[6 * i].value.startsWith(DBGama[k]['Gama'])) {
                    var Plazo = "s" + DBGama[k]['Plazo_Entrega']
                }
            }
            if (DBStock[j]['Total'] > 0) {
                document.getElementById('Table_Detalle').getElementsByTagName('td')[7 * i + 1].insertAdjacentHTML('beforeend', '<i class="bi bi-cart-check" style="color: green;font-size:12px">' + Plazo + '</i>')
            } else {
                document.getElementById('Table_Detalle').getElementsByTagName('td')[7 * i + 1].insertAdjacentHTML('beforeend', '<i class="bi bi-cart-x" style="color: red;font-size:12px">' + Plazo + '</i>')
            }
            return


        }
    }
}

function ClearDB() {
    ClearTable()
    localStorage.removeItem("TableOferta")
    localStorage.removeItem("TextoModelo")
    localStorage.removeItem("DatosOferta")
    DatosCabecera()
    ModifTable()
    var NOfertaCheck = 0
    var Registro = JSON.parse(localStorage.getItem("RegOferta")).sort()
    for (n = 1; n < 1000; n++) {
        for (i = 0; i < Registro.length; i++) {
            if (Registro[i]['NOferta'] == require('os').userInfo().username + ("000" + n).slice(-4)) {
                NOfertaCheck = 1
                break
            }
        }
        if (NOfertaCheck == 0) {
            document.getElementById("Oferta_NumOferta").value = require('os').userInfo().username + ("000" + n).slice(-4)
            break
        }
        NOfertaCheck = 0
    }
}

function ClearTable() {
    len = document.getElementById("Table_Detalle").rows.length
    for (i = 2; i < len; i++) {
        document.getElementById("Table_Detalle").deleteRow(2)
    }

}

function ModifTable() {
    var Table = JSON.parse(localStorage.getItem("TableOferta"))
    var Reference = JSON.parse(localStorage.getItem("TextoModelo"))
    if (document.getElementById("Table_Detalle").rows.length > 2 && Table) {
        for (i = 0; i < Table.length; i++) {
            for (j = 0; j < 6; j++) {
                Table[i][j] = document.getElementById('Table_Detalle').getElementsByTagName('input')[j + 6 * i].value
            }
            if (Table[i][1]) { Table[i][1] = parseFloat(Table[i][1]) }
            if (Table[i][2]) { Table[i][2] = (parseFloat(Table[i][2])).toFixed(2) + "€" }
            if (Table[i][3]) { Table[i][3] = (parseFloat(Table[i][3])).toFixed(2) + "%" }
            if (Table[i][4]) { Table[i][4] = (parseFloat(Table[i][2]) * (1 - parseFloat(Table[i][3]) / 100)).toFixed(2) + "€" }
            if (Table[i][5]) { Table[i][5] = (parseFloat(Table[i][4]) * parseFloat(Table[i][1])).toFixed(2) + "€" }
            Reference[i] = document.getElementById('Table_Detalle').getElementsByTagName('textarea')[i].value
        }
    }
    localStorage.setItem("TableOferta", JSON.stringify(Table))
    localStorage.setItem("TextoModelo", JSON.stringify(Reference))
    PushDB()
}


function AñadirComplemento() {
    document.getElementById('ComplementoModelo').insertAdjacentHTML("afterbegin", "<div class='row' id='RowComplemento'><div class='col-6'><input type='text' class='form-control' placeholder='Complemento'></div><div class='col-6'><input onchange='ModifComplemento()' type='text' class='form-control' placeholder='Precio (€ o %)'></div></div>")
    ModifComplemento()
}

function ModifComplemento() {
    var len = document.getElementById("ComplementoModelo").getElementsByTagName("input").length
    var inp = document.getElementById("ComplementoModelo").getElementsByTagName("input")
    for (i = 0; i < len / 2; i++) {
        if (inp[2 * i + 1].value == "") {} else if (inp[2 * i + 1].value.endsWith("%")) {
            if (document.getElementById("Precio").value != "") {
                inp[2 * i + 1].value = (parseFloat(inp[2 * i + 1].value) / 100 * parseFloat(document.getElementById("Precio").value)).toFixed(2) + " €"
            }
        } else {
            inp[2 * i + 1].value = parseFloat(inp[2 * i + 1].value) + " €"
        }
    }
    CalculoPrecio()
}

function CondicionEntrega() {
    if (document.getElementById("EntregaInmediata").checked) {
        document.getElementById("Oferta_PlazoEntrega").value = "Entrega Inmediata"
    } else {
        document.getElementById("Oferta_PlazoEntrega").value = document.getElementById("PlazoEntrega").value
    }
    document.getElementById("Oferta_Portes").value = document.getElementById("list_Portes").value
    document.getElementById("Oferta_Embalaje").value = document.getElementById("list_Embalaje").value
    document.getElementById("Oferta_FormaPago").value = document.getElementById("list_FormadePago").value
    document.getElementById("Oferta_Dir1").innerHTML = document.getElementById("list_DireccionEnvio").value
}

function BorrarLinea(n) {
    var Table1 = JSON.parse(localStorage.getItem("TableOferta"))
    var Table2 = JSON.parse(localStorage.getItem("TextoModelo"))
    Table1.splice(n, 1)
    Table2.splice(n, 1)
    localStorage.setItem("TableOferta", JSON.stringify(Table1))
    localStorage.setItem("TextoModelo", JSON.stringify(Table2))
    PushDB()
}

function MoveItem(n, dir) {
    var Table1 = JSON.parse(localStorage.getItem("TableOferta"))
    var Table2 = JSON.parse(localStorage.getItem("TextoModelo"))
    var TempArray = []
    for (j = 0; j < 6; j++) {
        TempArray[j] = Table1[n][j]
        Table1[n][j] = Table1[n - dir][j]
        Table1[n - dir][j] = TempArray[j]
    }
    TempArray[0] = Table2[n]
    Table2[n] = Table2[n - dir]
    Table2[n - dir] = TempArray[0]
    localStorage.setItem("TableOferta", JSON.stringify(Table1))
    localStorage.setItem("TextoModelo", JSON.stringify(Table2))
    PushDB()
}
var Campo = [
    "Oferta_NumOferta", "Oferta_CIF", "Oferta_NCliente",
    "Oferta_RazónSocial", "Oferta_Dirección", "Oferta_CP", "Oferta_Pais", "Oferta_Telf", "Oferta_Fax",
    "Oferta_Email", "Oferta_Solicitante",
    "Oferta_Situacion", "Oferta_Solicitud",
    "Oferta_Referencia", "Oferta_Referencia2", "Oferta_Referencia3",
    "Oferta_Solicitado",
    "Oferta_PlazoEntrega", "Oferta_Portes", "Oferta_Embalaje", "Oferta_FormaPago", "Oferta_Observacion",
    "Oferta_Dir1", "Oferta_Dir2", "Oferta_Dir3", "Oferta_Tel2", "Oferta_Fax2", "DescuentoPP", "IVA"
]

function DatosCabecera() {

    const date = new Date()
    const Today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    const ValidDay = date.getDate(date.setDate(date.getDate() + 60)) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    document.getElementById("FechaActual").value = Today
    document.getElementById("FechaValidez").value = ValidDay
    var Cabecera = JSON.parse(localStorage.getItem("DatosOferta"))
    for (i = 0; i < Campo.length; i++) {
        if (Cabecera) {
            document.getElementById([Campo[i]]).value = Cabecera[i]
        } else {
            document.getElementById([Campo[i]]).value = ""
        }
    }
    GuardarDatos()
}

function GuardarDatos() {
    var Storage = []
    for (i = 0; i < Campo.length; i++) {
        Storage[i] = document.getElementById([Campo[i]]).value
    }
    localStorage.setItem("DatosOferta", JSON.stringify(Storage))
}

function AltaTexto() {
    var Table = JSON.parse(localStorage.getItem("TableOferta"))
    var Reference = JSON.parse(localStorage.getItem("TextoModelo"))
    j = parseFloat(document.getElementById("Table_Detalle").getElementsByTagName("tbody")[0].getElementsByTagName("th").length)
    Table[j] = (["", "", "", "", "", ""])
    Reference[j] = ""
    localStorage.setItem("TableOferta", JSON.stringify(Table))
    localStorage.setItem("TextoModelo", JSON.stringify(Reference))
    PushDB()
}

function RegistroOferta() {
    ActualizaDBOferta()
    document.getElementById('table_registro_oferta').getElementsByTagName('tbody')[0].innerHTML = ''
    var Registro = JSON.parse(localStorage.getItem("RegOferta")).sort()
    var Count = 5
    var j = -1
    for (i = 0; i < Registro.length; i++) {
        if (i == 0 || Registro[i - 1]['NOferta'] != Registro[i]['NOferta']) {
            document.getElementById('table_registro_oferta').getElementsByTagName('tbody')[0].insertRow().innerHTML = "<td scope='row'></td><td></td><td></td><td></td><td style='text-align:center'></td>"
            j += 1;
            document.getElementById('table_registro_oferta').getElementsByTagName('td')[j * Count + 0].innerText = j + 1
            document.getElementById('table_registro_oferta').getElementsByTagName('td')[j * Count + 1].innerText = Registro[i]['Cabecera'].split(";")[0]
            document.getElementById('table_registro_oferta').getElementsByTagName('td')[j * Count + 2].innerText = Registro[i]['Cabecera'].split(";")[13]
            document.getElementById('table_registro_oferta').getElementsByTagName('td')[j * Count + 3].innerText = Registro[i]['Cabecera'].split(";")[3]
            document.getElementById('table_registro_oferta').getElementsByTagName('td')[j * Count + 4].insertAdjacentHTML('beforeend', "<button><i class='bi bi-clipboard-plus'style='color:green;font-size:15px;' onclick='AccederRegistro(" + JSON.stringify(Registro[i]['Cabecera'].split(";")[0]) + ")'></i></button><label style='width:30%'></label><button><i class='bi bi-backspace'style='color:red;font-size:15px' onclick='BorrarRegistro(" + JSON.stringify(Registro[i]['Cabecera'].split(";")[0]) + ")'></i></button>")
        }
    }
}

function BorrarRegistro(j) {
    'use strict';
    const oledb = require('node-adodb');
    oledb.PATH = './resources/adodb.js';
    var connection2
    connection2 = oledb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\\\call-bc\\Carpetas Publicas\\TECNIC\\RivaColdSelect\\RivaColdOferta.accdb;', process.arch.includes('64'));
    connection2.execute('DELETE FROM RegOferta WHERE NOferta="' + j + '"')
    ActualizaDBOferta()
    RegistroOferta()
}

function AccederRegistro(NOferta) {
    var Registro = JSON.parse(localStorage.getItem("RegOferta"))
    for (i = 0; i < Registro.length; i++) {
        if (Registro[i]['Cabecera'].split(";")[0] == NOferta) {
            for (n = 0; n < Registro[i]['Cabecera'].split(";").length - 1; n++) {
                document.getElementById([Campo[n]]).value = Registro[i]['Cabecera'].split(";")[n]
            }
        }
    }
    var Count = 0
    var Table = []
    var Reference = []
    for (i = 0; i < Registro.length; i++) {
        if (Registro[i]['NOferta'] == NOferta) {
            Table[Count] = []
            for (j = 0; j < 6; j++) {
                Table[Count][j] = Registro[i]['Oferta'].split(";")[j]
            }
            Reference[Count] = Registro[i]['Oferta'].split(";")[6]
            Count += 1
        }
    }
    localStorage.setItem("TableOferta", JSON.stringify(Table))
    localStorage.setItem("TextoModelo", JSON.stringify(Reference))
    PushDB()
    GuardarDatos()
}

async function GuardarRegistro() {
    'use strict';
    const oledb = require('node-adodb');
    oledb.PATH = './resources/adodb.js';
    var connection2
    connection2 = oledb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\\\call-bc\\Carpetas Publicas\\TECNIC\\RivaColdSelect\\RivaColdOferta.accdb;', process.arch.includes('64'));
    var TablaOferta = JSON.parse(localStorage.getItem("TableOferta"))
    var TextoModelo = JSON.parse(localStorage.getItem("TextoModelo"))
    var Cabecera = JSON.parse(localStorage.getItem("DatosOferta"))
    document.getElementById("progressdiv").style.display = ""
    await connection2.execute('DELETE FROM RegOferta WHERE NOferta="' + Cabecera[0] + '"')
    if (TablaOferta && TextoModelo && Cabecera) {
        for (i = 0; i < TablaOferta.length; i++) {
            await connection2.execute('INSERT INTO RegOferta (NOferta,Cabecera,Oferta) VALUES ("' + Cabecera[0] + '","' + Cabecera[0] + ';' + Cabecera[1] + ';' + Cabecera[2] + ';' + Cabecera[3] + ';' + Cabecera[4] + ';' + Cabecera[5] + ';' + Cabecera[6] + ';' + Cabecera[7] + ';' + Cabecera[8] + ';' + Cabecera[9] + ';' + Cabecera[10] + ';' + Cabecera[11] + ';' + Cabecera[11] + ';' + Cabecera[12] + ';' + Cabecera[13] + ';' + Cabecera[14] + ';' + Cabecera[15] + ';' + Cabecera[16] + ';' + Cabecera[17] + ';' + Cabecera[18] + ';' + Cabecera[19] + ';' + Cabecera[20] + ';' + Cabecera[21] + ';' + Cabecera[22] + ';' + Cabecera[23] + ';' + Cabecera[24] + ';' + Cabecera[25] + ';' + Cabecera[26] + ';' + Cabecera[27] + ';' + Cabecera[28] + '","' + TablaOferta[i][0] + ';' + TablaOferta[i][1] + ';' + TablaOferta[i][2] + ';' + TablaOferta[i][3] + ';' + TablaOferta[i][4] + ';' + TablaOferta[i][5] + ';' + TextoModelo[i] + '")')
            document.getElementById("progressbar").style = "Width: " + (i * 100 / TablaOferta.length).toFixed(2) + "%";
            document.getElementById("progressbar").innerText = "Registrando oferta: " + i + "   /   " + TablaOferta.length;
        }
        ActualizaDBOferta()
        RegistroOferta()
    }
    document.getElementById("progressdiv").style.display = "none"
}
async function ActualizaDBOferta() {
    'use strict';
    const oledb = require('node-adodb');
    oledb.PATH = './resources/adodb.js';
    var connection2
    connection2 = oledb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\\\call-bc\\Carpetas Publicas\\TECNIC\\RivaColdSelect\\RivaColdOferta.accdb;', process.arch.includes('64'));
    SQL_Connection("RegOferta", connection2)
    async function SQL_Connection(StringDB, connection) {
        try {
            var Query = await connection.query('SELECT * from ' + StringDB);
        } catch (error) {
            SQL_Connection(StringDB, connection);
        };
        var array = await Promise.all(Query);
        localStorage.setItem(StringDB, JSON.stringify(array))
        return array;
    };
}
DatosCabecera()
SeleccionarModelo()
ClearDB()