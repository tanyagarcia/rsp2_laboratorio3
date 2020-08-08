"use strict";
var recuperatorio;
(function (recuperatorio) {
    window.addEventListener("load", function () {
        var elemento1 = document.getElementById("btnAgregar");
        if (elemento1 != null) {
            elemento1.addEventListener("click", agregar);
        }
        var elemento2 = document.getElementById("btnEliminar");
        if (elemento2 != null) {
            elemento2.addEventListener("click", eliminar);
        }
        var elemento3 = document.getElementById("comboFiltro");
        if (elemento3 != null) {
            elemento3.addEventListener("change", filtrado);
        }
        var elemento4 = document.getElementById("btnPromedio");
        if (elemento4 != null) {
            elemento4.addEventListener("click", sacarPromedio);
        }
        var elemento5 = document.getElementById("nombreCheck");
        if (elemento5 != null) {
            elemento5.addEventListener("change", camposMostrados);
        }
        var elemento6 = document.getElementById("apellidoCheck");
        if (elemento6 != null) {
            elemento6.addEventListener("change", camposMostrados);
        }
        var elemento7 = document.getElementById("edadCheck");
        if (elemento7 != null) {
            elemento7.addEventListener("change", camposMostrados);
        }
        var elemento8 = document.getElementById("legajoCheck");
        if (elemento8 != null) {
            elemento8.addEventListener("change", camposMostrados);
        }
        var elemento9 = document.getElementById("horarioCheck");
        if (elemento9 != null) {
            elemento9.addEventListener("change", camposMostrados);
        }
        var elemento10 = document.getElementById("btnModificar");
        if (elemento10 != null) {
            elemento10.addEventListener("click", modificar);
        }
    });
    var arrayPersonas = new Array();
    var filaSeleccionada;
    function agregar() {
        var nombre = document.getElementById("inputNombre").value;
        var apellido = document.getElementById("inputApellido").value;
        var edad = parseInt(document.getElementById("inputEdad").value);
        var legajo = parseInt(document.getElementById("inputLegajo").value);
        var horario = document.getElementById("comboAlta").value;
        var unEmpleado = new recuperatorio.empleado(nombre, apellido, edad, legajo, horario);
        arrayPersonas.push(unEmpleado);
        agregarItem(unEmpleado.getNombre(), unEmpleado.getApellido(), unEmpleado.getEdad().toString(), unEmpleado.getLegajo().toString(), unEmpleado.getHorario().toString());
        restablecerCampos();
    }
    recuperatorio.agregar = agregar;
    function restablecerCampos() {
        document.getElementById("inputNombre").value = "";
        document.getElementById("inputApellido").value = "";
        document.getElementById("inputEdad").value = "";
        document.getElementById("inputLegajo").value = "";
        document.getElementById("comboAlta").value = "Mañana";
    }
    function agregarItem(nombre, apellido, edad, legajo, horario) {
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
        if (cuerpo != null) {
            cuerpo.appendChild(row);
        }
    }
    recuperatorio.agregarItem = agregarItem;
    function completarCampos(e) {
        var tr = e.target.parentNode;
        filaSeleccionada = tr;
        document.getElementById("inputNombre").value = tr.childNodes[0].textContent;
        document.getElementById("inputApellido").value = tr.childNodes[1].textContent;
        document.getElementById("inputEdad").value = tr.childNodes[2].textContent;
        document.getElementById("inputLegajo").value = tr.childNodes[3].textContent;
        document.getElementById("comboAlta").value = tr.childNodes[4].textContent;
    }
    recuperatorio.completarCampos = completarCampos;
    function eliminar() {
        var unaPersona;
        if (document.getElementById("inputNombre").value != "" && document.getElementById("inputApellido").value != ""
            && document.getElementById("inputEdad").value != "" && document.getElementById("inputLegajo").value != "") {
            var nombre = document.getElementById("inputNombre").value;
            for (var i = 0; i < arrayPersonas.length; i++) {
                if (arrayPersonas[i].getNombre() == nombre) {
                    unaPersona = arrayPersonas[i];
                }
            }
            var auxiliar;
            if (unaPersona != undefined) {
                auxiliar = unaPersona;
            }
            var indice = arrayPersonas.indexOf(unaPersona);
            arrayPersonas.splice(indice, 1);
            filaSeleccionada.remove();
            restablecerCampos();
        }
        else {
            alert("Selecciona una fila");
        }
    }
    recuperatorio.eliminar = eliminar;
    function filtrado() {
        var opcion = document.getElementById("comboFiltro").value;
        var arrayFiltrado;
        if (opcion == "Mañana") {
            arrayFiltrado = arrayPersonas.filter(function (item) {
                return item.getHorario() == "Mañana";
            });
        }
        else if (opcion == "Noche") {
            arrayFiltrado = arrayPersonas.filter(function (item) {
                return item.getHorario() == "Noche";
            });
        }
        else {
            arrayFiltrado = undefined;
        }
        borrarTabla();
        if (arrayFiltrado != undefined) {
            rearmarTabla(arrayFiltrado);
        }
        else {
            rearmarTabla(arrayPersonas);
        }
    }
    recuperatorio.filtrado = filtrado;
    function rearmarTabla(filtrado) {
        var horario;
        var turno;
        filtrado.forEach(function (item) {
            horario = item.getHorario().toString();
            if (horario == "Mañana") {
                turno = "Mañana";
            }
            else {
                turno = "Noche";
            }
            agregarItem(item.getNombre(), item.getApellido(), item.getEdad().toString(), item.getLegajo().toString(), turno);
        });
    }
    function borrarTabla() {
        var tCuerpo = document.getElementById("tCuerpo");
        if (tCuerpo != null) {
            tCuerpo.innerHTML = "";
        }
    }
    recuperatorio.borrarTabla = borrarTabla;
    function sacarPromedio() {
        var promTotal;
        obtenerEdades(arrayPersonas).then(function (response) {
            calcularPromedio(response).then(function (response) {
                document.getElementById("promedio").value = (response / arrayPersonas.length).toString();
            });
        });
    }
    recuperatorio.sacarPromedio = sacarPromedio;
    function obtenerEdades(arrayPersonas) {
        return new Promise(function (resolve, reject) {
            var arrayEdades = arrayPersonas.map(function (item) {
                return item.getEdad();
            });
            resolve(arrayEdades);
        });
    }
    function calcularPromedio(arrayEdades) {
        return new Promise(function (resolve, reject) {
            var promedio = arrayEdades.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
            resolve(promedio);
        });
    }
    function camposMostrados() {
        var nombre = document.getElementById("nombreCheck");
        var apellido = document.getElementById("apellidoCheck");
        var edad = document.getElementById("edadCheck");
        var legajo = document.getElementById("legajoCheck");
        var horario = document.getElementById("horarioCheck");
        if (nombre.checked) {
            var tablaNombres = document.getElementsByName("nombreTabla");
            tablaNombres.forEach(function (item) {
                item.hidden = false;
            });
        }
        else {
            var tablaNombres = document.getElementsByName("nombreTabla");
            tablaNombres.forEach(function (item) {
                item.hidden = true;
            });
        }
        if (apellido.checked) {
            var tablaApellidos = document.getElementsByName("apellidoTabla");
            tablaApellidos.forEach(function (item) {
                item.hidden = false;
            });
        }
        else {
            var tablaApellidos = document.getElementsByName("apellidoTabla");
            tablaApellidos.forEach(function (item) {
                item.hidden = true;
            });
        }
        if (edad.checked) {
            var tablaEdades = document.getElementsByName("edadTabla");
            tablaEdades.forEach(function (item) {
                item.hidden = false;
            });
        }
        else {
            var tablaEdades = document.getElementsByName("edadTabla");
            tablaEdades.forEach(function (item) {
                item.hidden = true;
            });
        }
        if (legajo.checked) {
            var tablaIds = document.getElementsByName("legajoTabla");
            tablaIds.forEach(function (item) {
                item.hidden = false;
            });
        }
        else {
            var tablaIds = document.getElementsByName("legajoTabla");
            tablaIds.forEach(function (item) {
                item.hidden = true;
            });
        }
        if (horario.checked) {
            var tablaIds = document.getElementsByName("horarioTabla");
            tablaIds.forEach(function (item) {
                item.hidden = false;
            });
        }
        else {
            var tablaIds = document.getElementsByName("horarioTabla");
            tablaIds.forEach(function (item) {
                item.hidden = true;
            });
        }
    }
    recuperatorio.camposMostrados = camposMostrados;
    function modificar() {
        var nombre = document.getElementById("inputNombre").value;
        var apellido = document.getElementById("inputApellido").value;
        var edad = parseInt(document.getElementById("inputEdad").value);
        var legajo = parseInt(document.getElementById("inputLegajo").value);
        var horario = document.getElementById("comboAlta").value;
        if (document.getElementById("inputNombre").value != "" && document.getElementById("inputApellido").value != ""
            && document.getElementById("inputEdad").value != "" && document.getElementById("inputLegajo").value != "") {
            var nombreABuscar = filaSeleccionada.childNodes[0].textContent;
            for (var i = 0; i < arrayPersonas.length; i++) {
                if (arrayPersonas[i].getNombre() == nombreABuscar) {
                    arrayPersonas[i].setNombre(nombre);
                    arrayPersonas[i].setApellido(apellido);
                    arrayPersonas[i].setEdad(edad);
                    arrayPersonas[i].setLegajo(legajo);
                    arrayPersonas[i].setHorario(horario);
                }
            }
        }
        else {
            alert("Selecciona una fila");
        }
        borrarTabla();
        rearmarTabla(arrayPersonas);
        restablecerCampos();
    }
    recuperatorio.modificar = modificar;
})(recuperatorio || (recuperatorio = {}));
