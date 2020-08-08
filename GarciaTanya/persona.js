"use strict";
var recuperatorio;
(function (recuperatorio) {
    var persona = /** @class */ (function () {
        function persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        persona.prototype.personaToJson = function () {
            var json = { "nombre:": this.nombre, "apellido:": this.apellido, "edad :": this.edad };
            return json;
        };
        persona.prototype.getNombre = function () {
            return this.nombre;
        };
        persona.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        persona.prototype.getApellido = function () {
            return this.apellido;
        };
        persona.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        persona.prototype.getEdad = function () {
            return this.edad;
        };
        persona.prototype.setEdad = function (edad) {
            this.edad = edad;
        };
        return persona;
    }());
    recuperatorio.persona = persona;
})(recuperatorio || (recuperatorio = {}));
