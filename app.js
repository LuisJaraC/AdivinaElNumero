let numeroSecreto = 0
let intentos = 0
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //obtencion de valor
    
    if(numeroDeUsuario === numeroSecreto){; //se puede ocupar el === cuando son el mismo tipo de dato
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        //El usuario no acertó
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor')
        }else{
            asignarTextoElemento('p','El número secreto es mayor')
        }
        intentos++;
        console.log(intentos);
        limpiarInput();
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto()
    intentos = 1;
}

function nuevoJuego(){
    //limpiar input
    limpiarInput();
    //indicar mensaje de intervalo de numeros
    //generar nuevo numero secreto
    //reiniciar el numero de intentos
    condicionesIniciales()
    //deshabilitar boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function limpiarInput(){
    document.getElementById('valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //si ya sorteamos todos los numeros
    console.log(numeroGenerado);
    if (listaNumerosSorteados.length == numeroMaximo){
        peticionUsuario();
        listaNumerosSorteados = [];
        asignarTextoElemento('p', `indica un numero del 1 al ${numeroMaximo}`);
        return generarNumeroSecreto(); 
    }else{
        //si el numero generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto(); //funcion callback 
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }    
}

function peticionUsuario(){
    asignarTextoElemento('p', 'Has adivinado todos los numeros. ¿Hasta que numero deseas adivinar?');
    numeroMaximo = parseInt(prompt('Felicidades, adivinaste todos los numeros. ¿Hasta que numero deseas adivinar ahora?'));
}
condicionesIniciales();
