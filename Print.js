function PrintListEquivalencia() {
    window.print()
    location.reload()
}

function PrintOferta() {
    var tamañopapel = 40
    var Table = JSON.parse(localStorage.getItem("TableOferta"))
    var Reference = JSON.parse(localStorage.getItem("TextoModelo"))
    var RowTable = 0
    var n = 0
    var len = document.getElementById("Table_Detalle").getElementsByTagName('textarea').length
    for (i = 0; i < len; i++) {
        RowTable += document.getElementById("Table_Detalle").getElementsByTagName('textarea')[i].rows
    }
    var pagina = ~~(RowTable / tamañopapel + 1)
    if (pagina > 1) {
        if (document.getElementById("Table_Detalle").getElementsByTagName("th")[4].style.display == "none") {
            var OcultarPrecio = true
        }
        if (document.getElementById("Table_Detalle").getElementsByTagName("th")[5].style.display == "none") {
            var OcultarDescuento = true
        }
        var thead = document.getElementById("Table_Detalle").getElementsByTagName('thead')[0].innerHTML
        document.getElementById("Oferta_Tabla").innerHTML = ""
        var RowTable = 0
        var Count = 0
        for (i = 0; i < len; i++) {
            if (RowTable == 0) {
                document.getElementById("Oferta_Tabla").insertAdjacentHTML('beforebegin', '<div class="row" id="Table_row_Detalle' + n + '"><div class="col-6"><label style="font: bolder 10pt Arial;">DETALLE:</label></div><div class="col-6" style="text-align:right"><label style="font: bolder 10pt Arial;">Página ' + (n + 1) + ' de ' + parseFloat(pagina) + '</label></div><table id="Table_Detalle' + n + '"><thead class = "table-group-divider"> ' + thead + '</thead><tbody class="table-group-divider"><tr><td></td></tr></tbody></table></div>')
            }
            document.getElementById(['Table_Detalle' + n]).getElementsByTagName('tbody')[0].insertRow().innerHTML = "<th scope='row' style='text-align:center'>" + ("00" + (i + 1)).slice(-3) + "</th><td><input></td><td><textarea></textarea></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td><td><input style='text-align:center'></td>"
            for (j = 0; j < 6; j++) {
                document.getElementById(['Table_Detalle' + n]).getElementsByTagName('input')[j + 6 * Count].value = Table[i][j]
            }
            document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count].innerHTML = Reference[i]
            document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count].rows = 0
            document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count].rows = parseFloat(document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count].textContent.split("\n").length + 1)
            RowTable += document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count].rows
            Count += 1;
            if (RowTable > tamañopapel || ((i + 2) == len && Count > 15)) {
                document.getElementById(['Table_row_Detalle' + n]).insertAdjacentHTML('afterend', '<header>' + document.getElementsByTagName('header')[0].innerHTML + '</header>')
                CloneHTML('header', 'input', n)
                CloneHTML('header', 'textarea', n)
                document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count - 1].rows = tamañopapel - RowTable - document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count - 1].rows + 10
                document.getElementById(['Table_row_Detalle' + n]).insertAdjacentHTML('afterend', '<p style="text-align:right;font: bolder 10pt Arial;">Suma y Sigue</p>')
                n += 1;
                RowTable = 0;
                Count = 0;

            }
        }
    }
    if (pagina == 1) {
        var n = ''
        Count = len
    } else {
        for (i = 0; i < pagina; i++) {
            if (OcultarPrecio) { OcultarDisplayTabla(['Table_Detalle' + i], 4) }
            if (OcultarDescuento) { OcultarDisplayTabla(['Table_Detalle' + i], 5) }
        }
    }
    document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count - 1].rows = tamañopapel - RowTable - document.getElementById(['Table_Detalle' + n]).getElementsByTagName('textarea')[Count - 1].rows + 7
    window.print()
    location.reload()
}

function CloneHTML(Tag, Element, n) {
    var lenheader = document.getElementsByTagName(Tag)[0].getElementsByTagName(Element).length
    for (l = 0; l < lenheader; l++) {
        document.getElementsByTagName(Tag)[n + 1].getElementsByTagName(Element)[l].value = document.getElementsByTagName(Tag)[0].getElementsByTagName(Element)[l].value
    }
}

function OcultarDisplayTabla(Table, j) {
    document.getElementById(Table).getElementsByTagName("th")[j].style.display = "none"
    for (k = 0; k < document.getElementById(Table).getElementsByTagName('textarea').length; k++) {
        document.getElementById(Table).getElementsByTagName('td')[j + 7 * k].style.display = "none"
    }
}