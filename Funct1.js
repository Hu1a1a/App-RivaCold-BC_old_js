function SeleccionarGama(){
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    var array_gama=[]
    var list_gama = document.getElementById("list_gama");
    list_gama.innerHTML = ""
    for (i=0;i<RivaColdDB.length;i++){
        if (array_gama.includes(RivaColdDB[i]['Gama'])){}
        else {
            if (RivaColdDB[i]['Gama']){
                var option_gama = document.createElement("option");
                option_gama.text=RivaColdDB[i]['Gama'];
                list_gama.add(option_gama,list_gama[0]);
                array_gama[i]=RivaColdDB[i]['Gama']
            }
        }
    }
    SeleccionarModelo()
}
function SeleccionarModelo(){
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    var list_modelo = document.getElementById("list_modelo");
    list_modelo.innerHTML = ""
    for (i=0;i<RivaColdDB.length;i++){ 
        if (document.getElementById("list_gama").value == RivaColdDB[i]['Gama']){
            option_modelo = document.createElement("option");
            option_modelo.text=RivaColdDB[i]['Ref'];
            list_modelo.add(option_modelo,list_modelo[0])
        }
    }   
    FichaTecnica()
}
function FichaTecnica(){
    ClearTable('table_PC',0)
    ClearTable('table_FT',0)
    var RivaColdDB = JSON.parse(localStorage.getItem("RivaCold" + document.getElementById("list_type").value));
    var PF = ['PC','DC']
    var CountPF = 0, CountDC = 0
    var RegPF=[], RegDC=[]
    for (i=0;i<RivaColdDB.length;i++){
        var RivaColdField = Object.getOwnPropertyNames(RivaColdDB[i])
        if (document.getElementById("list_modelo").value == RivaColdDB[i]['Ref']){
            for (j=0;j<RivaColdField.length;j++){
                if (RivaColdDB[i][RivaColdField[j]]){
                    if (RivaColdField[j].startsWith(PF[0])){RegPF[CountPF]=j;CountPF += 1}  
                    else if (RivaColdField[j].startsWith(PF[1])){RegDC[CountDC]=j;CountDC += 1} 
                    else {
                        document.getElementById('table_FT').getElementsByTagName('tbody')[0].insertRow().innerHTML ="<th scope='row'>" + RivaColdField[j] + "</th><td>" + RivaColdDB[i][RivaColdField[j]] + "</td>"
                    }
                }
            }      
            document.getElementById('table_PC').getElementsByTagName('thead')[0].insertRow().innerHTML = "<th scope='col'>Tamb\\Tc</th>"
            var RegTc=[],CountRegTc=0, RegTamb=[], CountRegTamb=0
            for (j=0;j<CountPF;j++){
                if (RegTc.includes(RivaColdField[RegPF[j]].split("_")[2])){}
                else {document.getElementById('table_PC').getElementsByTagName('tr')[0].insertAdjacentHTML("beforeend","<th scope='col'>" + RivaColdField[RegPF[j]].split("_")[2] + "</th>")
                RegTc[CountRegTc]=RivaColdField[RegPF[j]].split("_")[2]
                CountRegTc +=1
                }
                if (RegTamb.includes(RivaColdField[RegPF[j]].split("_")[1])){}
                else{document.getElementById('table_PC').getElementsByTagName('tbody')[0].insertRow().innerHTML = "<th scope='row'>" + RivaColdField[RegPF[j]].split("_")[1] + "</th>"
                RegTamb[CountRegTamb]=RivaColdField[RegPF[j]].split("_")[1]
                CountRegTamb +=1
                }
            } 
            for (col=0;col<CountRegTc;col++){
                for (row=0;row<CountRegTamb;row++){
                    for (j=0;j<CountPF;j++){
                        if (RivaColdField[RegPF[j]].split("_")[1]==RegTamb[row] && RivaColdField[RegPF[j]].split("_")[2]==RegTc[col]){
                            if(RivaColdDB[i][RivaColdField[RegPF[j]]]){
                                var ValueDC =""
                                for (k=0;k<CountDC;k++){
                                    if (RivaColdField[RegPF[j]].split("_")[1]==RivaColdField[RegDC[k]].split("_")[1] && RivaColdField[RegPF[j]].split("_")[2]==RivaColdField[RegPF[k]].split("_")[2]){
                                        ValueDC=" (" + parseFloat(RivaColdDB[i][RivaColdField[RegPF[k]]]) + "m3)"
                                    }
                                }
                                document.getElementById('table_PC').getElementsByTagName('tr')[row+1].insertAdjacentHTML("beforeend","<td>" + parseFloat(RivaColdDB[i][RivaColdField[RegPF[j]]]) + "W" + ValueDC + "</td>")
                                break
                            }
                        }
                    }
                }
            }
            break
        }
    }
}
function ClearTable(id,n){
    len = document.getElementById(id).rows.length
    for (i=n;i<len;i++){document.getElementById(id).deleteRow(n)}
}

SeleccionarGama()