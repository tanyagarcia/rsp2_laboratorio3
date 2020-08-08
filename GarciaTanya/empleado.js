"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var recuperatorio;
(function (recuperatorio) {
    var empleado = /** @class */ (function (_super) {
        __extends(empleado, _super);
        function empleado(nombre, apellido, edad, legajo, horario) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.legajo = legajo;
            _this.horario = horario;
            return _this;
        }
        empleado.prototype.empleadoToJson = function () {
            var stringCadena;
            stringCadena = this.personaToJson() + { "legajo: ": this.legajo, "horario:": this.horario };
            return stringCadena;
        };
        empleado.prototype.getLegajo = function () {
            return this.legajo;
        };
        empleado.prototype.setLegajo = function (legajo) {
            this.legajo = legajo;
        };
        empleado.prototype.getHorario = function () {
            return this.horario;
        };
        empleado.prototype.setHorario = function (horario) {
            this.horario = horario;
        };
        return empleado;
    }(recuperatorio.persona));
    recuperatorio.empleado = empleado;
})(recuperatorio || (recuperatorio = {}));
