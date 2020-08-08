namespace recuperatorio{

    export class empleado extends persona{
        
        private legajo:number;
        private horario:string;

        constructor(nombre:string, apellido:string, edad:number, legajo:number, horario:string)
        {
            super(nombre, apellido, edad);
            this.legajo = legajo;
            this.horario = horario;
        }

        public empleadoToJson():any{
            var stringCadena;
            stringCadena = this.personaToJson() + {"legajo: " : this.legajo, "horario:" : this.horario}
            return stringCadena;
        }

        public getLegajo():number{
            return this.legajo;
        }

        public setLegajo(legajo:number){
            this.legajo = legajo;
        }

        public getHorario():string{
            return this.horario;
        }

        public setHorario(horario:string){
            this.horario = horario;
        }
    }
}