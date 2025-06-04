import { Component, OnInit } from '@angular/core';
import {
  ServicioReservasService,
  SesionPresencial
} from 'src/app/features/user/services/reservas/servicio-reservas.service';

@Component({
  selector: 'app-reservas-disponibles',
  templateUrl: './reservas-disponibles.component.html',
  styleUrls: ['./reservas-disponibles.component.css']
})
export class ReservasDisponiblesComponent implements OnInit {
  // Control de pasos
  step: number = 1;

  // IDs de servicio, distrito y local (valores de ejemplo)
  idServicioElegido: number = 10;  // Cambié el valor para reflejar tu configuración actual
  idDistritoElegido: number = 39;  // Cambié el valor para reflejar tu configuración actual
  idLocalElegido: number = 5;     // Cambié el valor para reflejar tu configuración actual

  // Datos que trae el servidor:
  availableDates: string[] = [];
  fechaSeleccionada: string = '';

  availableHours: string[] = [];
  horaSeleccionada: string = '';

  sesionesDisponibles: SesionPresencial[] = [];
  sesionSeleccionadaIndex: number | null = null;

  // Flags para manejar estados de carga y “sin resultados”
  cargandoFechas: boolean = true;
  sinFechas: boolean = false;

  cargandoHoras: boolean = false;
  sinHoras: boolean = false;

  cargandoSesiones: boolean = false;
  sinSesiones: boolean = false;

  // Nuevas variables
  serviciosDisponibles: any[] = [];
  localesDisponibles: any[] = [];

  constructor(
    private readonly reservasService: ServicioReservasService
  ) { }

  ngOnInit(): void {
    // Cargar los servicios y locales disponibles
    this.cargarServiciosLocales();
    
    // Paso 1: obtener fechas disponibles
    this.cargarFechas();
  }

  cargarServiciosLocales(): void {
    // Aquí cargamos los servicios y locales. Este ejemplo asume que tienes endpoints para ello.
    // Si no tienes estos endpoints, deberías implementarlos en el servicio correspondiente.

    // Ejemplo para cargar servicios:
    this.serviciosDisponibles = [
      { id: 10, nombre: 'Gym' }, // Reemplazado "Servicio 1" por "Gym"
      { id: 20, nombre: 'Yoga' },
      { id: 30, nombre: 'Nutrición' }
    ];

    // Ejemplo para cargar locales:
    this.localesDisponibles = [
      { id: 5, nombre: 'La Molina' }, 
      { id: 6, nombre: 'San Isidro' }  
    ];
  }

  cargarFechas(): void {
    // Llamar al servicio para obtener las fechas disponibles con los valores de idServicioElegido, idDistritoElegido y idLocalElegido
    this.cargandoFechas = true;
    this.reservasService
      .getFechasPresenciales(
        this.idServicioElegido,
        this.idDistritoElegido,
        this.idLocalElegido
      )
      .subscribe({
        next: (fechas: string[]) => {
          this.availableDates = fechas;
          this.cargandoFechas = false;
          this.sinFechas = fechas.length === 0;
        },
        error: err => {
          console.error('Error obteniendo fechas:', err);
          this.cargandoFechas = false;
          this.sinFechas = true;
        }
      });
  }

  /** 1) El usuario hace clic en una fecha */
  elegirFecha(fecha: string) {
    this.fechaSeleccionada = fecha;
    this.step = 2;

    // Paso 2: obtener horas disponibles para la fecha seleccionada
    this.cargandoHoras = true;
    this.reservasService
      .getHorasPresenciales(
        this.idServicioElegido,
        this.idDistritoElegido,
        this.idLocalElegido,
        this.fechaSeleccionada
      )
      .subscribe({
        next: horas => {
          this.availableHours = horas;
          this.cargandoHoras = false;
          this.sinHoras = horas.length === 0;
        },
        error: err => {
          console.error('Error horas:', err);
          this.cargandoHoras = false;
          this.sinHoras = true;
        }
      });
  }

  /** 2) El usuario hace clic en una hora */
  elegirHora(hora: string) {
    this.horaSeleccionada = hora;
    this.step = 3;

    // Paso 3: obtener sesiones disponibles para fecha + hora seleccionadas
    this.cargandoSesiones = true;
    this.reservasService
      .getSesionesPresenciales(
        this.idServicioElegido,
        this.idDistritoElegido,
        this.idLocalElegido,
        this.fechaSeleccionada,
        this.horaSeleccionada
      )
      .subscribe({
        next: sesiones => {
          this.sesionesDisponibles = sesiones;
          this.cargandoSesiones = false;
          this.sinSesiones = sesiones.length === 0;
        },
        error: err => {
          console.error('Error sesiones:', err);
          this.cargandoSesiones = false;
          this.sinSesiones = true;
        }
      });
  }

  /** 3) El usuario marca una fila de la tabla */
  seleccionarSesion(idx: number) {
    this.sesionSeleccionadaIndex = idx;
  }

  /** Método para avanzar de paso 1→2 o 2→3 al hacer clic en “Continuar” */
  continuar() {
    if (this.step === 1 && this.fechaSeleccionada) {
      this.step = 2;
    } else if (this.step === 2 && this.horaSeleccionada) {
      this.step = 3;
    }
  }

  /** 4) Botón “‹” para retroceder */
  retroceder() {
    if (this.step > 1) {
      this.step--;
      if (this.step === 2) {
        this.sesionSeleccionadaIndex = null;
      }
      if (this.step === 1) {
        this.horaSeleccionada = '';
        this.sesionSeleccionadaIndex = null;
      }
    }
  }

  /** 5) Botón “Reservar” en el paso 3 */
  reservar() {
    if (this.sesionSeleccionadaIndex === null) {
      return;
    }
    const seleccion = this.sesionesDisponibles[this.sesionSeleccionadaIndex];
    console.log('Reservar esta sesión:', seleccion);
    // Aquí podrías invocar reservaExiste() y luego crear la reserva
  }
}
