function SeleccionarProveedor() {
    var list_gama = document.getElementById("list_gama");
    var MarcaA = JSON.parse(localStorage.getItem(document.getElementById("list_marcaA").value + document.getElementById("list_type").value));
    var array_gama = []
    list_gama.innerHTML = ""
    for (i = 0; i < MarcaA.length; i++) {
        if (array_gama.includes(MarcaA[i]['Gama'])) {} else {
            var option_gama = document.createElement("option");
            option_gama.text = MarcaA[i]['Gama'];
            option_gama.value = MarcaA[i]['Gama'];
            list_gama.add(option_gama, list_gama[0]);
            array_gama[i] = MarcaA[i]['Gama']
        }
    }
    SeleccionarGama()
}

function SeleccionarGama() {
    var MarcaA = JSON.parse(localStorage.getItem(document.getElementById("list_marcaA").value + document.getElementById("list_type").value));
    var list_modelo = document.getElementById("list_modelo");
    list_modelo.innerHTML = ""
    for (i = 0; i < MarcaA.length; i++) {
        if (document.getElementById("list_gama").value == MarcaA[i]['Gama']) {
            var option_modelo = document.createElement("option");
            option_modelo.text = MarcaA[i]['Ref'];
            list_modelo.add(option_modelo, list_modelo[0])
        }
    }
    SeleccionarModelo()
}

function SeleccionarModelo() {
    var MarcaA = JSON.parse(localStorage.getItem(document.getElementById("list_marcaA").value + document.getElementById("list_type").value));
    var MarcaB = JSON.parse(localStorage.getItem(document.getElementById("list_marcaB").value + document.getElementById("list_type").value));
    var SelectedMarca;
    ClearTable('table_type')
    document.getElementById("list_equivalencia").innerHTML = ""
    for (i = 0; i < MarcaA.length; i++) {
        if (document.getElementById("list_modelo").value == MarcaA[i]['Ref']) {
            SelectedMarca = i;
            for (j = 0; j < MarcaB.length; j++) {
                if (Object.getOwnPropertyNames(MarcaA[i]).includes("Config1") && MarcaA[i]['Config1'] != "") {
                    if (MarcaA[i]['Config1'] == MarcaB[j]['Config1']) {
                        if (Object.getOwnPropertyNames(MarcaA[i]).includes("Config2") && MarcaA[i]['Config2'] != "") {
                            if (MarcaA[i]['Config2'] == MarcaB[j]['Config2']) {
                                Equivalencia(i, j, MarcaA, MarcaB)
                            }
                        } else {
                            Equivalencia(i, j, MarcaA, MarcaB)
                        }
                    }
                } else {
                    Equivalencia(i, j, MarcaA, MarcaB)
                }
            }
        }
    }
    for (i = 1; i < 5; i++) {
        if (Object.getOwnPropertyNames(MarcaA[SelectedMarca]).includes("Config" + i)) {
            if (MarcaA[SelectedMarca]['Config' + i] != null) {
                document.getElementById("table_type").insertRow(-1).insertCell(-1).appendChild(document.createTextNode(MarcaA[SelectedMarca]['Config' + i]))
            }
        }
    }
    sortSelect(document.getElementById('list_equivalencia'))
    document.getElementById("list_equivalencia").selectedIndex = 0
    DatosEquivalencia()
}

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i = 0; i < selElem.options.length; i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort((a, b) => {
        if (parseFloat(a[0].split(" ")[2]) > parseFloat(b[0].split(" ")[2])) {
            return -1
        }
        if (parseFloat(a[0].split(" ")[2]) < parseFloat(b[0].split(" ")[2])) {
            return 1
        }
        return 0
    });

    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i = 0; i < tmpAry.length; i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }

    if (document.getElementById("list_equivalencia").length == 0) {
        option_modelo.text = "Modelo no disponible"
        document.getElementById("list_equivalencia").add(option_modelo, document.getElementById("list_equivalencia")[0])
    }
    return;
}

function ClearTable(id) {
    len = document.getElementById(id).rows.length
    for (i = 1; i < len; i++) { document.getElementById(id).deleteRow(1) }
}

function Equivalencia(i, j, MarcaA, MarcaB) {
    var Registro1 = 0
    var Registro2 = 0
    var MarcaAField = Object.getOwnPropertyNames(MarcaA[i])
    var MarcaBField = Object.getOwnPropertyNames(MarcaB[j])
    for (l = 0; l < MarcaAField.length; l++) {
        var MarcaAPF = parseFloat(MarcaA[i][MarcaAField[l]])
        if (MarcaAField[l].startsWith("PC_") && MarcaA[i][MarcaAField[l]]) {
            for (k = 0; k < MarcaBField.length; k++) {
                var MarcaBPF = parseFloat(MarcaB[j][MarcaBField[k]])
                if (MarcaBField[k].startsWith("PC_") && MarcaB[j][MarcaBField[k]]) {
                    if (parseFloat(MarcaBField[k].split("_")[2]) == parseFloat(MarcaAField[l].split("_")[2])) {
                        if (parseFloat(MarcaBField[k].split("_")[1]) > 20) {
                            for (m = -3; m < 3; m++) {
                                if (parseFloat(MarcaBField[k].split("_")[1]) + m == parseFloat(MarcaAField[l].split("_")[1])) {
                                    Registro1 += MarcaBPF
                                    Registro2 += MarcaAPF
                                }
                            }
                        } else {
                            if (parseFloat(MarcaBField[k].split("_")[1]) == parseFloat(MarcaAField[l].split("_")[1])) {
                                Registro1 += MarcaBPF
                                Registro2 += MarcaAPF
                            }
                        }
                    }
                }
            }
        }
    }
    option_modelo = document.createElement("option");
    if (MarcaB[j]['Ficha producto_Stock'] == "Si") { var CheckStock = "✓ " } else { var CheckStock = "✕ " }
    if (((Registro1 / Registro2) - 1) > parseFloat(document.getElementById("RangoNeg").value) / 100 && ((Registro1 / Registro2) - 1) < parseFloat(document.getElementById("RangoPos").value) / 100) {
        option_modelo.text = CheckStock + MarcaB[j]['Ref'] + " " + (((Registro1 / Registro2) - 1) * 100).toFixed(2) + " %";
        document.getElementById("list_equivalencia").add(option_modelo, document.getElementById("list_equivalencia")[0])
    }
}


function DatosEquivalencia() {
    ClearTable('table_PF')
    ClearTable('table_price')
    var MarcaA = JSON.parse(localStorage.getItem(document.getElementById("list_marcaA").value + document.getElementById("list_type").value));
    var MarcaB = JSON.parse(localStorage.getItem(document.getElementById("list_marcaB").value + document.getElementById("list_type").value));
    for (i = 0; i < MarcaB.length; i++) {
        if (MarcaB[i]['Ref'] == document.getElementById("list_equivalencia").value.split(" ")[1]) {
            var MarcaBField = Object.getOwnPropertyNames(MarcaB[i]).sort(function(a, b) {
                if (a.split("_")[1] > b.split("_")[1]) {
                    return -1
                } else if (a.split("_")[1] < b.split("_")[1]) {
                    return 1
                } else {
                    if (parseFloat(a.split("_")[2]) > parseFloat(b.split("_")[2])) {
                        return -1
                    } else if (parseFloat(a.split("_")[2]) < parseFloat(b.split("_")[2])) {
                        return 1
                    }
                }
            })
            for (j = 0; j < MarcaA.length; j++) {
                if (MarcaA[j]['Ref'] == document.getElementById("list_modelo").value) {
                    var MarcaAField = Object.getOwnPropertyNames(MarcaA[j]).sort().reverse()
                    if (MarcaA[j]['Precio']) { var MarcaAPrecio = parseFloat(MarcaA[j]['Precio']) + " €" } else { var MarcaAPrecio = "No disponible" }
                    if (MarcaB[i]['Precio']) { var MarcaBPrecio = parseFloat(MarcaB[i]['Precio']) + " €" } else { var MarcaBPrecio = "No disponible" }
                    document.getElementById('table_price').getElementsByTagName('tbody')[0].insertRow().innerHTML = "<th scope='row'>" + MarcaAPrecio + "</th><td>" + MarcaBPrecio + "</td>"
                    for (k = 0; k < MarcaAField.length; k++) {
                        if (MarcaAField[k].startsWith("PC_") && MarcaA[j][MarcaAField[k]]) {
                            Tamb = MarcaAField[k].split("_")[1]
                            Tcamara = MarcaAField[k].split("_")[2]
                            PFModelo = parseFloat(MarcaA[j][MarcaAField[k]]) + " W"
                            PFEq = Interpol(MarcaAField[k], MarcaB, MarcaB[i], i)
                            Diff = ((parseFloat(PFEq) / parseFloat(PFModelo) - 1) * 100).toFixed(2) + " %"
                            if (PFEq != "-" && Tamb != "25°C" || document.getElementById("MostrarPF").checked) {
                                document.getElementById('table_PF').getElementsByTagName('tbody')[0].insertRow().innerHTML = "<th scope='row'>" + Tamb + "</th><td>" + Tcamara + "</th><td>" + PFModelo + "</th><td>" + PFEq + "</th><td>" + Diff + "</td>"
                            }
                        }
                    }
                }
            }
        }
    }
    if (document.getElementById("list_equivalencia").length > 8) {
        document.getElementById("list_equivalencia").size = 8
        document.getElementById("list_equivalencia").size = document.getElementById("list_equivalencia").length
    }
}

function Interpol(PFHead, MarcaB, DB, i) {
    var MarcaBField = Object.getOwnPropertyNames(DB).sort(function(a, b) {
        if (a.split("_")[1] > b.split("_")[1]) {
            return -1
        } else if (a.split("_")[1] < b.split("_")[1]) {
            return 1
        } else {
            if (parseFloat(a.split("_")[2]) > parseFloat(b.split("_")[2])) {
                return -1
            } else if (parseFloat(a.split("_")[2]) < parseFloat(b.split("_")[2])) {
                return 1
            }
        }
    }).reverse()
    var MarcaBFieldR = Object.getOwnPropertyNames(DB).sort(function(a, b) {
        if (a.split("_")[1] > b.split("_")[1]) {
            return -1
        } else if (a.split("_")[1] < b.split("_")[1]) {
            return 1
        } else {
            if (parseFloat(a.split("_")[2]) > parseFloat(b.split("_")[2])) {
                return -1
            } else if (parseFloat(a.split("_")[2]) < parseFloat(b.split("_")[2])) {
                return 1
            }
        }
    })
    var Tamb = PFHead.split("_")[1]
    var Tcamara = PFHead.split("_")[2]
    for (var m = 0; m < MarcaBField.length; m++) {
        if (MarcaB[i][MarcaBField[m]]) {
            if (MarcaBField[m] == PFHead) {
                return MarcaB[i][MarcaBField[m]] + " W"
            }
        }
    }
    for (var Int = 0; Int < MarcaBField.length; Int++) {
        if (Tcamara == MarcaBField[Int].split("_")[2] && MarcaBField[Int].startsWith("PC_")) {
            for (var iamb = 1; iamb < 30; iamb++) {
                if (parseFloat(Tamb) + iamb == parseFloat(MarcaBField[Int].split("_")[1]) && MarcaB[i][MarcaBField[Int]] && !positive) {
                    var Tambip = parseFloat(Tamb) + iamb
                    var PFeqip = parseFloat(MarcaB[i][MarcaBField[Int]])
                    var positive = 1
                }
            }
        }
        if (Tcamara == MarcaBFieldR[Int].split("_")[2] && MarcaBFieldR[Int].startsWith("PC_")) {
            for (var iamb = 1; iamb < 30; iamb++) {
                if (parseFloat(Tamb) - iamb == parseFloat(MarcaBFieldR[Int].split("_")[1]) && MarcaB[i][MarcaBFieldR[Int]] && !negative) {
                    var Tambin = parseFloat(Tamb) - iamb
                    var PFeqin = parseFloat(MarcaB[i][MarcaBFieldR[Int]])
                    var negative = 1
                }
            }
        }
    }

    if (positive && negative) {
        return Interpolacion(parseFloat(Tamb), Tambip, Tambin, PFeqip, PFeqin) + "W (*)";
    } else if (positive && !negative) {
        for (var Int = 0; Int < MarcaBField.length; Int++) {
            if (Tcamara == MarcaBField[Int].split("_")[2] && MarcaBField[Int].startsWith("PC_")) {
                for (var iamb = 1; iamb < 30; iamb++) {
                    if (parseFloat(Tambip) + iamb == parseFloat(MarcaBField[Int].split("_")[1]) && MarcaB[i][MarcaBField[Int]]) {
                        var Tambin = parseFloat(Tamb) + iamb
                        var PFeqin = parseFloat(MarcaB[i][MarcaBField[Int]])
                        return Interpolacion(parseFloat(Tamb), Tambip, Tambin, PFeqip, PFeqin) + "W (+)";
                    }
                }
            }
        }
    } else if (!positive && negative) {
        for (var Int = 0; Int < MarcaBField.length; Int++) {
            if (Tcamara == MarcaBFieldR[Int].split("_")[2] && MarcaBFieldR[Int].startsWith("PC_")) {
                for (var iamb = 1; iamb < 30; iamb++) {
                    if (parseFloat(Tambin) + iamb == parseFloat(MarcaBFieldR[Int].split("_")[1]) && MarcaB[i][MarcaBFieldR[Int]]) {
                        var Tambip = parseFloat(Tamb) + iamb
                        var PFeqip = parseFloat(MarcaB[i][MarcaBFieldR[Int]])
                        return Interpolacion(parseFloat(Tamb), Tambip, Tambin, PFeqip, PFeqin) + "W (-)";
                    }
                }
            }
        }
    } else {
        positive = 0;
        negative = 0;
        for (var Int = 0; Int < MarcaBField.length; Int++) {
            if (Tamb == MarcaBField[Int].split("_")[1] && MarcaBField[Int].startsWith("PC_")) {
                for (var icamara = 1; icamara < 30; icamara++) {
                    if (parseFloat(Tcamara) + icamara == parseFloat(MarcaBField[Int].split("_")[2]) && MarcaB[i][MarcaBField[Int]] && !positive) {
                        var Tcamaraip = parseFloat(Tcamara) + icamara
                        var PFeqip = parseFloat(MarcaB[i][MarcaBField[Int]])
                        var positive = 1
                    }
                }
            }

            if (Tamb == MarcaBFieldR[Int].split("_")[1] && MarcaBFieldR[Int].startsWith("PC_")) {
                for (var icamara = 1; icamara < 30; icamara++) {
                    if (parseFloat(Tcamara) - icamara == parseFloat(MarcaBFieldR[Int].split("_")[2]) && MarcaB[i][MarcaBFieldR[Int]] && !negative) {
                        var Tcamarain = parseFloat(Tcamara) - icamara
                        var PFeqin = parseFloat(MarcaB[i][MarcaBFieldR[Int]])
                        var negative = 1
                    }
                }
            }
        }

        if (positive && negative) {
            returnInterpolacion(parseFloat(Tamb), Tcamaraip, Tcamarain, PFeqip, PFeqin) + "W (*)";
        } else if (positive && !negative) {
            for (var Int = 0; Int < MarcaBField.length; Int++) {
                if (Tamb == MarcaBField[Int].split("_")[1] && MarcaBField[Int].startsWith("PC_")) {
                    for (var icamara = 1; icamara < 30; icamara++) {
                        if (parseFloat(Tcamaraip) + icamara == parseFloat(MarcaBField[Int].split("_")[2]) && MarcaB[i][MarcaBField[Int]]) {
                            var Tcamarain = parseFloat(Tcamaraip) + icamara
                            var PFeqin = parseFloat(MarcaB[i][MarcaBField[Int]])
                            return Interpolacion(parseFloat(Tcamara), Tcamaraip, Tcamarain, PFeqip, PFeqin) + "W (+)";
                        }
                    }
                }
            }
        } else if (!positive && negative) {
            for (var Int = 0; Int < MarcaBField.length; Int++) {
                if (Tamb == MarcaBFieldR[Int].split("_")[1] && MarcaBFieldR[Int].startsWith("PC_")) {
                    for (var icamara = 1; icamara < 30; icamara++) {
                        if (parseFloat(Tcamarain) - icamara == parseFloat(MarcaBFieldR[Int].split("_")[2]) && MarcaB[i][MarcaBFieldR[Int]]) {
                            var Tcamaraip = parseFloat(Tcamarain) - icamara
                            var PFeqip = parseFloat(MarcaB[i][MarcaBFieldR[Int]])
                            return Interpolacion(parseFloat(Tcamara), Tcamaraip, Tcamarain, PFeqip, PFeqin) + "W (-)";
                        }
                    }
                }
            }
        }
    }
    return "-"
}


function Interpolacion(x, x1, x2, y1, y2) {
    var y = y1 - ((y1 - y2) * (x1 - x) / (x1 - x2))
    return y.toFixed(0)
}

function RangoEq(Direccion, Rango) {
    Simbolo = ""
    ValueRango = parseFloat(document.getElementById(Rango).value)
    if ((ValueRango + Direccion) > 0) { Simbolo = "+" }
    document.getElementById(Rango).value = Simbolo + parseFloat(ValueRango + Direccion) + "%"
    SeleccionarModelo()
}

function ComparativaParametro() {
    var Marca = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_comparativa_typo").value));
    var listConfig1 = document.getElementById("Comparativo_Config1")
    var listConfig2 = document.getElementById("Comparativo_Config2")
    listConfig1.innerHTML = ""
    listConfig2.innerHTML = ""
    var ArrayConfig1 = []
    var ArrayConfig2 = []
    for (i = 0; i < Marca.length; i++) {
        if (ArrayConfig1.includes(Marca[i]['Config1']) || Marca[i]['Config1'] == null) {} else {
            var optionConfig1 = document.createElement("option");
            optionConfig1.text = Marca[i]['Config1'];
            listConfig1.add(optionConfig1, listConfig1[0]);
            ArrayConfig1[i] = Marca[i]['Config1']
        }
        if (ArrayConfig2.includes(Marca[i]['Config2']) || Marca[i]['Config2'] == null) {} else {
            var optionConfig2 = document.createElement("option");
            optionConfig2.text = Marca[i]['Config2'];
            listConfig2.add(optionConfig2, listConfig2[0]);
            ArrayConfig2[i] = Marca[i]['Config2']
        }
    }
    var optionConfig1 = document.createElement("option");
    optionConfig1.text = " "
    listConfig1.add(optionConfig1, listConfig1[0]);
    var optionConfig2 = document.createElement("option");
    optionConfig2.text = " "
    listConfig2.add(optionConfig2, listConfig2[0]);
    document.getElementById("Comparativo_Config1").selectedIndex = 0
    document.getElementById("Comparativo_Config2").selectedIndex = 0
}

function RealizarComparativa() {
    Config1 = document.getElementById("Comparativo_Config1").value
    Config2 = document.getElementById("Comparativo_Config2").value
    Tamb = document.getElementById("Temp_Amb").value
    Tcamara = document.getElementById("Temp_Cam").value
    PC = document.getElementById("Pot_Frig").value
    var Head = "PC_" + Tamb + "_" + Tcamara
    let array = [{
        'Ref': 'Personalizado',
        'Config1': Config1,
        'Config2': Config2,
        [Head]: PC,
        'Gama': 'Personalizado'
    }]
    localStorage.setItem("Personalizado" + document.getElementById("list_comparativa_typo").value, JSON.stringify(array))
    document.getElementById("list_marcaA").value = "Personalizado"
    SeleccionarProveedor()
}
SeleccionarProveedor()