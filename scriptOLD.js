/*
AUTOR:      Nicolás David Sabogal Velásquez
PROGRAMA:   Conversor de números naturales entre bases 2-36, versión JavaScript
FECHA:      11 de agosto de 2021
*/

//---------------------------------Constantes-----------------------------------
const SYMS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //Caracteres reconocibles.

//---------------------------------Funciones------------------------------------
function esInt (str)//---------------------------------------------------
{
    //Revisa si todos los carácteres de la cadena son números.
    for (let i of str)
        if (+parseInt(i) !== +parseInt(i)) return false;
    return true;
}

function checkBase(baseA, num)//------------------------------------
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

function invertir(str)//-----------------------------------------
{
    if (typeof str != "string") return str;
    //Intercambia cada caracter de la primera mita de las posiciones con su
    //posición complemento correspondiente.
    let array = str.split("");
    array = array.reverse();
    str = array.join("");

    return str;
}

function convertir(baseA, baseB, num)//------------------
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
                console.log(dividendo + " " + dividendo % baseB);
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

//------------------------------------Main--------------------------------------

alert("Bienvenido. En este programa podrá convertir de manera exacta " +
      "números naturales hasta 2^53 - 1 (base 10) entre bases del 2 al 36.");

while (true)
{
    let baseA = 0, baseB = 0;
    let resp = "", num = "";

    //Para este input se comprueba si es un número entero y luego si está entre 2 y 36.
    while (true)
    {
        resp = prompt("Por favor ingrese la base de su número:");

        if (typeof resp === "string" && esInt(resp))
        {
            baseA = parseInt(resp);

            if (baseA > 1 && baseA < 37)
                break;
        }
        alert("ERROR: Se esperaba un entero entre 2 y 36. inténtelo de nuevo.");
    }

    //Para este input se comprueba que todos los carácteres necesarios estén en el umbral
    //0-${baseA} de los carácteres de la cadena SYMS.
    while (true)
    {
        num = prompt("Por favor ingrese el número a convertir:");
        if (typeof num === "string") num.toUpperCase();

        if (num != "" && checkBase(baseA, num))
            break;
        else
            alert("ERROR: La cadena ingresada no corresponde a un número en la base, inténtelo de nuevo.");
    }

    //Mismas comprobaciones que baseA.
    while (true)
    {
        resp = prompt("Por favor ingrese la base a la que desea convertir:");
        
        if (typeof resp === "string" && esInt(resp))
        {
            baseB = parseInt(resp);

            if (baseB > 1 && baseB < 37)
                break;
        }
        alert("ERROR: Se esperaba un entero entre 2 y 36. inténtelo de nuevo.");
    }

    //Finalmente se imprime directamente el resultado de la función convertir.
    document.write(`Convertir ${num} de base ${baseA} a base ${baseB}<br>`);
    document.write(`Resultado: ${convertir(baseA, baseB, num).toString()}<br>`);

    //---------------------------Salir--------------------------------------
    let salir = false;
    while (true)
    {
        resp = prompt("¿Desea convertir otro número? (S/N)");

        if (resp.toUpperCase() != 'S' && resp.toUpperCase() != 'N' || resp == null)
            alert("ERROR: Carácter inválido, inténtelo de nuevo.");
        else
        {
            //Si el usuario indica que quiere salir, salir se hace true.
            if (resp.toUpperCase() == 'N') salir = true;
            break;
        }
    }
    if (salir) break;
}