'use strict';

const http = require("http");
const debug = require("debug")("nodestr:server");
const app = require('../src/serverapp');


let porta = 3000;
porta = normalizarPorta(process.env.PORT,porta);
app.set("port",porta);

const servidor = http.createServer(app);

servidor.listen(porta);
servidor.on('listening',onListening);
console.log("Servidor Inicializado na porta " + porta);

//Recebe uma porta sugerida pelo ambiente e uma porta constante e decide qual colocar no servidor
function normalizarPorta(ambiente,porta){

    const tcp = require("tcp-port-used")
    //Tenta colocar a constante

    if(tcp.check(porta)) return porta;

    else{

    const testavalido = parseInt(ambiente,10);
    //Se a porta do ambiente, não é um int, retorna ela como string 
    if (isNaN(testavalido)) return ambiente;
    //Se e numérica, retorna ela mesmo assim
    else if (testavalido>=0) return testavalido;

    }
    //Se deu erro, e o ambiente não retornou uma porta válida, abre numa constante
    return false; // Deu erro
};

function onListening(){
    const addr = servidor.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on' + bind);
}