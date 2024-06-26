function SeleccionarProveedor() {
    var list_gama = document.getElementById("S_Gama_A");
    var DBMarca = JSON.parse(localStorage.getItem(document.getElementById("S_Marca_A").value + document.getElementById("S_Tipo_A").value));
    var array_gama = []
    list_gama.innerHTML = ""
    for (i = 0; i < DBMarca.length; i++) {
        if (array_gama.includes(DBMarca[i]['Gama'])) {} else {
            var option_gama = document.createElement("option");
            option_gama.text = DBMarca[i]['Gama'];
            option_gama.value = DBMarca[i]['Gama'];
            list_gama.add(option_gama, list_gama[0]);
            array_gama[i] = DBMarca[i]['Gama']
        }
    }
    var list_gama = document.getElementById("S_Gama_B");
    var DBMarca = JSON.parse(localStorage.getItem(document.getElementById("S_Marca_B").value + document.getElementById("S_Tipo_B").value));
    var array_gama = []
    list_gama.innerHTML = ""
    for (i = 0; i < DBMarca.length; i++) {
        if (array_gama.includes(DBMarca[i]['Gama'])) {} else {
            var option_gama = document.createElement("option");
            option_gama.text = DBMarca[i]['Gama'];
            option_gama.value = DBMarca[i]['Gama'];
            list_gama.add(option_gama, list_gama[0]);
            array_gama[i] = DBMarca[i]['Gama']
        }
    }
    ListadoModelo()
}

function ListadoModelo() {
    var DBMarcaA = JSON.parse(localStorage.getItem(document.getElementById("S_Marca_A").value + document.getElementById("S_Tipo_A").value)).sort();
    var DBMarcaB = JSON.parse(localStorage.getItem(document.getElementById("S_Marca_B").value + document.getElementById("S_Tipo_B").value)).sort();
    document.getElementById("TablaEq").getElementsByTagName("tbody")[0].innerHTML = ""
    for (i = 0; i < DBMarcaA.length; i++) {
        if (document.getElementById("S_Gama_A").value == DBMarcaA[i]['Gama']) {
            document.getElementById("TablaEq").getElementsByTagName("tbody")[0].insertRow().innerHTML = "<td>" + DBMarcaA[i]['Ref'] + "</td><td><select id='S_CondTrabajo_" + DBMarcaA[i]['Ref'] + "'></select></td><td id='S_PF_" + DBMarcaA[i]['Ref'] + "'></td><td><select></select></td><td></td><td></td>"
            var PFField = Object.getOwnPropertyNames(DBMarcaA[i]).sort().reverse()
            var list_gama = document.getElementById("S_CondTrabajo_" + DBMarcaA[i]['Ref']);
            for (j = 0; j < PFField.length; j++) {
                if (PFField[j].startsWith("PC_") && DBMarcaA[i][PFField[j]]) {
                    var option_gama = document.createElement("option");
                    option_gama.text = PFField[j];
                    option_gama.value = parseFloat(DBMarcaA[i][PFField[j]]);
                    list_gama.add(option_gama, list_gama[0]);
                }
            }
        }
    }
    var TablaLen = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length
    for (j = 0; j < TablaLen; j++) {
        var list_gama = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[j].getElementsByTagName("select")[1]
        list_gama.innerHTML = ""
        for (i = 0; i < DBMarcaB.length; i++) {
            if (document.getElementById("S_Gama_B").value == DBMarcaB[i]['Gama']) {
                var option_gama = document.createElement("option");
                option_gama.text = DBMarcaB[i]['Ref'];
                option_gama.value = i
                list_gama.add(option_gama, list_gama[0]);
            }
        }
    }
    MarcaA_CondTrabajo()
    MarcaB_Equivalencia()
}

function MarcaA_CondTrabajo() {
    var TablaLen = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length
    for (i = 0; i < TablaLen; i++) {
        document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("select")[0].value + " W"
    }

}

function MarcaB_Equivalencia() {
    var TablaLen = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length
    for (i = 0; i < TablaLen; i++) {
        document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML = MarcaB_PFEquivalente(i)
        document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML = ((parseFloat(document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML) / parseFloat(document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML) - 1) * 100).toFixed(2) + " %"
    }
}

function MarcaB_PFEquivalente(i) {
    var DBMarcaB = JSON.parse(localStorage.getItem(document.getElementById("S_Marca_B").value + document.getElementById("S_Tipo_B").value)).sort();
    var j = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("select")[1].value
    var PFHead = document.getElementById("TablaEq").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("select")[0].selectedOptions[0].innerHTML
    return Interpol(PFHead, DBMarcaB, DBMarcaB[0], j)
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

SeleccionarProveedor()