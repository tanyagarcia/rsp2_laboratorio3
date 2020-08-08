namespace recuperatorio{

    window.addEventListener("load", function(){

        var elemento1 = document.getElementById("btnAgregar");
        if(elemento1 != null)
        {
            elemento1.addEventListener("click", agregar);
        }
        var elemento2 = document.getElementById("btnEliminar");
        if(elemento2 != null)
        {
            elemento2.addEventListener("click", eliminar);
        }
        var elemento3 = document.getElementById("comboFiltro");
        if(elemento3 != null)
        {
            elemento3.addEventListener("change", filtrado);
        }
        var elemento4 =  document.getElementById("btnPromedio");
        if(elemento4 != null)
        {
            elemento4.addEventListener("click", sacarPromedio);
        }
        var elemento5 = document.getElementById("nombreCheck");
        if(elemento5 != null)
        {
            elemento5.addEventListener("change", camposMostrados);
        }
        var elemento6 = document.getElementById("apellidoCheck");
        if(elemento6 != null)
        {
            elemento6.addEventListener("change", camposMostrados);
        }
        var elemento7 = document.getElementById("edadCheck");
        if(elemento7 != null)
        {
            elemento7.addEventListener("change", camposMostrados);
        }
        var elemento8 = document.getElementById("legajoCheck");
        if(elemento8 != null)
        {
            elemento8.addEventListener("change", camposMostrados);
        }
        var elemento9 = document.getElementById("horarioCheck");
        if(elemento9 != null)
        {
            elemento9.addEventListener("change", camposMostrados);
        }
        var elemento10 = document.getElementById("btnModificar");
        if(elemento10 != null)
        {
            elemento10.addEventListener("click", modificar);
        }

    });

    var arrayPersonas:Array<persona> = new Array<persona>();
    var filaSeleccionada:any;

    export function agregar(){

        var nombre = (<HTMLInputElement>document.getElementById("inputNombre")).value;
        var apellido = (<HTMLInputElement>document.getElementById("inputApellido")).value;
        var edad = parseInt((<HTMLInputElement>document.getElementById("inputEdad")).value);
        var legajo = parseInt((<HTMLInputElement>document.getElementById("inputLegajo")).value);
        var horario = (<HTMLInputElement>document.getElementById("comboAlta")).value;

        var unEmpleado:empleado = new empleado(nombre, apellido, edad, legajo, horario);
        arrayPersonas.push(unEmpleado);

        agregarItem(unEmpleado.getNombre(), unEmpleado.getApellido(), unEmpleado.getEdad().toString(), unEmpleado.getLegajo().toString(), unEmpleado.getHorario().toString());
        restablecerCampos();

    }

    function restablecerCampos()
    {
        (<HTMLInputElement>document.getElementById("inputNombre")).value = "";
        (<HTMLInputElement>document.getElementById("inputApellido")).value = "";
        (<HTMLInputElement>document.getElementById("inputEdad")).value = "";
        (<HTMLInputElement>document.getElementById("inputLegajo")).value = "";
        (<HTMLInputElement>document.getElementById("comboAlta")).value = "Mañana";
    }

    export function agregarItem(nombre:string, apellido:string, edad:string, legajo:string, horario:string)
    {
        var cuerpo = document.getElementById("tCuerpo");
        var row = document.createElement("tr");
        var td2 = document.createElement("td");
        td2.setAttribute("name", "nombreTabla");
        var tdText2 = document.createTextNode(nombre);
        td2.appendChild(tdText2);
        row.appendChild(td2);

        var td3 = document.createElement("td");
        td3.setAttribute("name", "apellidoTabla");
        var tdText3 = document.createTextNode(apellido);
        td3.appendChild(tdText3);
        row.appendChild(td3);

        var td4 = document.createElement("td");
        td4.setAttribute("name", "edadTabla");
        var tdText4 = document.createTextNode(edad);
        td4.appendChild(tdText4);
        row.appendChild(td4);

        var td5 = document.createElement("td");
        td5.setAttribute("name", "legajoTabla");
        var tdText5 = document.createTextNode(legajo);
        td5.appendChild(tdText5);
        row.appendChild(td5);

        var td6 = document.createElement("td");
        td6.setAttribute("name", "horarioTabla");
        var tdText6 = document.createTextNode(horario);
        td6.appendChild(tdText6);
        row.appendChild(td6);

        row.addEventListener("click", completarCampos);

        if(cuerpo != null)
        {
            cuerpo.appendChild(row);
        }
        
    }

    export function completarCampos(e:any)
    {
        var tr = e.target.parentNode;
        filaSeleccionada = tr;
        (<HTMLInputElement>document.getElementById("inputNombre")).value = tr.childNodes[0].textContent;
        (<HTMLInputElement>document.getElementById("inputApellido")).value = tr.childNodes[1].textContent;
        (<HTMLInputElement>document.getElementById("inputEdad")).value = tr.childNodes[2].textContent;
        (<HTMLInputElement>document.getElementById("inputLegajo")).value = tr.childNodes[3].textContent;
        (<HTMLInputElement>document.getElementById("comboAlta")).value = tr.childNodes[4].textContent;
    }

    export function eliminar()
    {
        var unaPersona:any | undefined;

        if( (<HTMLInputElement>document.getElementById("inputNombre")).value != "" && (<HTMLInputElement>document.getElementById("inputApellido")).value != "" 
            &&  (<HTMLInputElement>document.getElementById("inputEdad")).value != "" &&  (<HTMLInputElement>document.getElementById("inputLegajo")).value != "")
        {
            var nombre = (<HTMLInputElement>document.getElementById("inputNombre")).value;
           
            for(var i =0; i<arrayPersonas.length; i++)
            {
                if(arrayPersonas[i].getNombre() == nombre)
                {
                    unaPersona = arrayPersonas[i];
                }
            }

            var auxiliar;
            if(unaPersona != undefined)
            {
                auxiliar = unaPersona;
            }
            var indice:number = arrayPersonas.indexOf(unaPersona);
            
            arrayPersonas.splice(indice, 1);
            filaSeleccionada.remove();
            restablecerCampos();
        }
        else{
            alert("Selecciona una fila");
        }
        
    }

    export function filtrado()
    {
        var opcion = (<HTMLInputElement>document.getElementById("comboFiltro")).value;
        var arrayFiltrado;
        if(opcion == "Mañana"){
            arrayFiltrado = arrayPersonas.filter(function(item)
            {
                return (<empleado>item).getHorario() == "Mañana";
            });
        }else if(opcion == "Noche")
        {
            arrayFiltrado = arrayPersonas.filter(function(item)
            {
                return (<empleado>item).getHorario() == "Noche";
            });
        }else{
            arrayFiltrado = undefined;
        }
        
        borrarTabla();

        if(arrayFiltrado != undefined){
            rearmarTabla(arrayFiltrado);
        }else{
            rearmarTabla(arrayPersonas);
        }
        
    }

    function rearmarTabla(filtrado:Array<persona>)
    {
        var horario;
        var turno;
       
        filtrado.forEach(function(item){
            horario = (<empleado>item).getHorario().toString();
            if(horario == "Mañana"){
                turno = "Mañana";
            }else{
                turno = "Noche";
            }
            agregarItem(item.getNombre(), item.getApellido(), item.getEdad().toString(), (<empleado>item).getLegajo().toString(), turno);
        });
    }

    export function borrarTabla()
    {
        var tCuerpo = document.getElementById("tCuerpo");
        if(tCuerpo != null)
        {
            tCuerpo.innerHTML = "";
        }
        
    }

    export function sacarPromedio()
    {
        var promTotal:number;
        obtenerEdades(arrayPersonas).then(function(response:any)
        {
            calcularPromedio(response).then(function(response:any)
            {
                (<HTMLInputElement>document.getElementById("promedio")).value = (response/arrayPersonas.length).toString();
            });
        });
        
    }

    function obtenerEdades(arrayPersonas:Array<persona>)
    {
        return new Promise(function(resolve, reject)
        {
            var arrayEdades:Array<number> = arrayPersonas.map(function(item)
            {
                return item.getEdad();
            });
            resolve(arrayEdades);
        });
    }

    function calcularPromedio(arrayEdades:Array<number>)
    {
        return new Promise(function(resolve, reject)
        {
            var promedio = arrayEdades.reduce(function(total, num)
            {
                total += num;
                return total;
            },0);
            resolve(promedio);
        });
    }


    export function camposMostrados()
    {
        var nombre = (<HTMLInputElement>document.getElementById("nombreCheck"));
        var apellido = (<HTMLInputElement>document.getElementById("apellidoCheck"));
        var edad = (<HTMLInputElement>document.getElementById("edadCheck"));
        var legajo = (<HTMLInputElement>document.getElementById("legajoCheck"));
        var horario = (<HTMLInputElement>document.getElementById("horarioCheck"));

        if(nombre.checked)
        {
            var tablaNombres = document.getElementsByName("nombreTabla");
            tablaNombres.forEach( function(item){
                item.hidden = false;
            });
        }
        else{
             var tablaNombres =document.getElementsByName("nombreTabla");
             tablaNombres.forEach(function(item){
                 item.hidden = true;
             });
        }

        if(apellido.checked)
        {
            var tablaApellidos = document.getElementsByName("apellidoTabla");
            tablaApellidos.forEach( function(item){
                item.hidden = false;
            });
        }
        else{
             var tablaApellidos =document.getElementsByName("apellidoTabla");
             tablaApellidos.forEach(function(item){
                 item.hidden = true;
             });
        }

        if(edad.checked)
        {
            var tablaEdades = document.getElementsByName("edadTabla");
            tablaEdades.forEach( function(item){
                item.hidden = false;
            });
        }
        else{
             var tablaEdades =document.getElementsByName("edadTabla");
             tablaEdades.forEach(function(item){
                 item.hidden = true;
             });
        }

        if(legajo.checked)
        {
            var tablaIds = document.getElementsByName("legajoTabla");
            tablaIds.forEach( function(item){
                item.hidden = false;
            });
        }
        else{
             var tablaIds =document.getElementsByName("legajoTabla");
             tablaIds.forEach(function(item){
                 item.hidden = true;
             });
        }

        if(horario.checked)
        {
            var tablaIds = document.getElementsByName("horarioTabla");
            tablaIds.forEach( function(item){
                item.hidden = false;
            });
        }
        else{
             var tablaIds =document.getElementsByName("horarioTabla");
             tablaIds.forEach(function(item){
                 item.hidden = true;
             });
        }

    }

    export function modificar()
    {
        var nombre =  (<HTMLInputElement>document.getElementById("inputNombre")).value;
        var apellido =  (<HTMLInputElement>document.getElementById("inputApellido")).value;
        var edad =  parseInt((<HTMLInputElement>document.getElementById("inputEdad")).value);
        var legajo =  parseInt((<HTMLInputElement>document.getElementById("inputLegajo")).value);
        var horario = (<HTMLInputElement>document.getElementById("comboAlta")).value;

        if( (<HTMLInputElement>document.getElementById("inputNombre")).value != "" && (<HTMLInputElement>document.getElementById("inputApellido")).value != "" 
            &&  (<HTMLInputElement>document.getElementById("inputEdad")).value != "" &&  (<HTMLInputElement>document.getElementById("inputLegajo")).value != "")
        {
            
            var nombreABuscar = filaSeleccionada.childNodes[0].textContent;
           
            for(var i =0; i<arrayPersonas.length; i++)
            {
                if(arrayPersonas[i].getNombre() == nombreABuscar)
                {
                    arrayPersonas[i].setNombre(nombre);
                    arrayPersonas[i].setApellido(apellido);
                    arrayPersonas[i].setEdad(edad);
                    (<empleado>arrayPersonas[i]).setLegajo(legajo);
                    (<empleado>arrayPersonas[i]).setHorario(horario);

                }
            }
        }
        else{
            alert("Selecciona una fila");
        }

        borrarTabla();
        rearmarTabla(arrayPersonas);
        restablecerCampos();
        
    }


}
