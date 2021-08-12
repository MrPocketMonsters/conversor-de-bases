/*
AUTOR:      Nicolás David Sabogal Velásquez
PROGRAMA:   Conversor de números naturales entre bases 2-36, versión JavaScript
FECHA:      11 de agosto de 2021
*/

//---------------------------------Constantes-----------------------------------
const SYMS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //Caracteres reconocibles.

//---------------------------------Funciones------------------------------------
function checkBase(baseA, num)//------------------------------------------------
{
    //Se repite para cada caracter de la cadena num
    for (let i = 0; i < num.length; i++)
    {
        //Controla si se encontró el caracter actual.
        let encontrada = false;

        //Compara el caracter con los primeros ${baseA} carácteres de la cadena SYMS.
        for (let j = 0; j < baseA; j++)
            if (num[i] == SYMS[j])
            {
                //Si lo encuentra, encontrada se hace real.
                encontrada = true;
                break;
            }

        //Si no encontró el caracter actual, retorna false.
        if (!encontrada) return false;
    }

    //Si encontró todos los carácteres de la cadena, retorna true.
    return true;
}

function invertir(str)//--------------------------------------------------------
{
    if (typeof str != "string") return str; //Recibe únicamente strings
    
    let array = str.split("");  //El método split convierte la cadena a arreglo
    array = array.reverse();    //El método reverse invierte la posición de los elementos
    str = array.join("");       //El método join convierte un arreglo a cadena

    return str;
}

function convertir(baseA, baseB, num)//-----------------------------------------
{
    //Iniciar guardando la cadena entrante en la cadena resultante.
    let numCon = num;

    //El algoritmo se ejecuta si las bases son diferentes
    if (baseA != baseB)
    {
        //Si la base original no es diez, se realiza el proceso de conversión.
        if (baseA != 10)
        {
            let numConInt = 0;

            //Para cada caracter en la cadena a convertir:
            for (let i = 0; i < num.length; i++)
                //Pada cada caracter de la cadena de símbolos:
                for (let j = 0; j < SYMS.length; j++)
                    //Cuando Si los carácteres coinciden...
                    if (num[i] == SYMS[j])
                    {
                        //Se suma el producto del valor decimal del símbolo en la poosición j de SYMS
                        //por la potencia de la base elevada a la posición de derecha a izquierda.
                        //Ej. i=3, num.length=4 => 4-1-i=0 (i va de desde 0 hasta num.length-1)
                        numConInt += j * parseInt(baseA ** (num.length - 1 - i));
                        break;
                    }

            //La sumatoria resultante se guarda como cadena en numCon.
            numCon = numConInt.toString();
        }

        //Si la base objetivo no es 10, se realiza el proceso de conversión.
        if (baseB != 10)
        {
            //Se guarda el número obtenido en el proceso anterior como entero.
            let dividendo = parseInt(numCon);
            //Se vacía la cadena numCon.
            numCon = "";

            //Se divide el número entre la base objetivo sucesivamente y se concatena el resto
            //en la cadena resultante hasta que el número a dividir sea menor que la base objetivo.
            while (dividendo >= baseB)
            {
                numCon = numCon.toString() + SYMS[dividendo % baseB];
                dividendo = Math.trunc(dividendo / baseB);
            }
            //Se concatena el dividendo final en la cadena resultante.
            numCon = numCon + SYMS[dividendo];

            //Finalmente se invierte el orden de la cadena.
            numCon = invertir(numCon);
        }
    }

    //Se envía la cadena resultante.
    return numCon;
}

//-------Esta función se ejecuta desde la página html al oprimir el botón-------
function doIt()
{
    //Este bloque de variables guarda las variables en la forma de la página html
    let num = document.getElementById("numero").value.toUpperCase();
    let baseA = document.getElementById("baseA").value;
    let baseB = document.getElementById("baseB").value;
    let respuesta = document.getElementById("respuesta");
    let error = document.getElementById("error");


    if (num == "")
    {
        error.innerHTML = "Por favor escriba un número.";
        respuesta.value = "<ERROR>";
    }    
    else if (baseA < 2 || baseA > 36 || baseB < 2 || baseB > 36)
    {
        error.innerHTML = "Las bases deben ser mayores a 1 y menores a 37.";
        respuesta.innerHTML = "<ERROR>";
    }
    else if (!checkBase(baseA, num))
    {
        error.innerHTML = "La cadena ingresada no corresponde a un número escrito en esa cadena.";
        respuesta.innerHTML = "<ERROR>";
    }
    else
    {
        error.innerHTML = "";
        respuesta.innerHTML = convertir (baseA, baseB, num);
    }
}

function intercambiar ()
{
    let baseA = document.getElementById("baseA").value;
    let baseB = document.getElementById("baseB").value;

    document.getElementById("baseA").value = baseB;
    document.getElementById("baseB").value = baseA;
}