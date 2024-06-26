'use strict';
const oledb = require('node-adodb');
oledb.PATH = './resources/adodb.js';
var connection, connection2
let wait = 0;
//var Directorio=__dirname
//console.log('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=' + Directorio + '\\BaseDatos\\RivaColdSelect.accdb;')
async function oledb_open() {
    connection = oledb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\\\albertb63034227.sharepoint.com@SSL\\DavWWWRoot\\sites\\RivaColdDBServer\\Documentos compartidos\\RivaColdSelect.accdb;', process.arch.includes('64'));
    return connection;
}
async function oledb_open2() {
    connection2 = oledb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\\\albertb63034227.sharepoint.com@SSL\\DavWWWRoot\\sites\\RivaColdDBServer\\Documentos compartidos\\RivaColdOferta.accdb;', process.arch.includes('64'));
    return connection2;
}
async function SQL_Connection(StringDB, connection) {
    try {
        var Query = await connection.query('SELECT * from ' + StringDB);
        console.log("Success with DB conection: " + StringDB);
        wait = wait + 1;
    } catch (error) {
        console.log("Retrying");
        SQL_Connection(StringDB, connection);
    };
    var array = await Promise.all(Query);
    localStorage.setItem(StringDB, JSON.stringify(array))
    return array;
};
oledb_open();
oledb_open2();
SQL_Connection("RivaColdEq", connection)
SQL_Connection("RivaColdEvap", connection)
SQL_Connection("RivaColdCond", connection)
SQL_Connection("RivaColdCentral", connection)
SQL_Connection("RivaColdOPT", connection)
SQL_Connection("RivaColdTarifa0000", connection)
SQL_Connection("RivaColdStock", connection)
SQL_Connection("RivaColdCliente", connection)
SQL_Connection("RivaColdGama", connection)

SQL_Connection("IntarConEq", connection)
SQL_Connection("IntarConEvap", connection)
SQL_Connection("IntarConCond", connection)
SQL_Connection("IntarConCentral", connection)

SQL_Connection("ZanottiEq", connection)
SQL_Connection("ZanottiEvap", connection)
SQL_Connection("ZanottiCond", connection)
SQL_Connection("ZanottiCentral", connection)

SQL_Connection("KideEq", connection)
SQL_Connection("KideEvap", connection)
SQL_Connection("KideCond", connection)
SQL_Connection("KideCentral", connection)

SQL_Connection("OtroEq", connection)
SQL_Connection("OtroEvap", connection)
SQL_Connection("OtroCond", connection)
SQL_Connection("OtroCentral", connection)

SQL_Connection("RegOferta", connection2)