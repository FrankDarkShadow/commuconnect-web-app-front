import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router
import { environment } from 'src/environments/environment'; // Importa el archivo de configuración del entorno

@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.component.html',
  styleUrls: ['./mis-reservaciones.component.css']
})
export class MisReservacionesComponent implements OnInit {

  currentWeekKeys: string[] = []; // ['2024-06-24', ..., '2024-06-30']
  selectedDate: Date = new Date(); // Usamos esta en lugar de currentDate

  currentDate = new Date();
  monthIndex = this.currentDate.getMonth();

  monthName = this.getMonthName(this.currentDate.getMonth());
  year = this.currentDate.getFullYear();
  daysInMonth: number[] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  hours: string[] = [
    '04:00', '05:00', '06:00',
    '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00',
    '22:00'
  ];

  reservedSlots: any[] = []; // Array de objetos que contienen información de las reservas

  constructor(private http: HttpClient, private router: Router) {}

  idComunidad: number = 3;

  ngOnInit(): void {
    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
    if (comunidadGuardada) {
      const comunidad = JSON.parse(comunidadGuardada);
      const id = comunidad.id_comunidad;
      this.idComunidad = id;
    }

    this.generateDaysInMonth();
    this.currentWeekKeys = this.getWeekDates(this.currentDate); // ⬅️ Mostrar semana actual
    this.loadReservations();
  }

  generateDaysInMonth(): void {
    const daysInMonth = new Date(this.year, this.currentDate.getMonth() + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.monthIndex = this.currentDate.getMonth(); // Agrega esto
    this.monthName = this.getMonthName(this.monthIndex);
    this.year = this.currentDate.getFullYear();
    this.generateDaysInMonth();
    this.loadReservations();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.monthIndex = this.currentDate.getMonth(); // Agrega esto
    this.monthName = this.getMonthName(this.monthIndex);
    this.year = this.currentDate.getFullYear();
    this.generateDaysInMonth();
    this.loadReservations();
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return monthNames[monthIndex];
  }

  loadReservations(): void {
    // Obtener el id_comunidad desde el localStorage o algún otro valor dinámico
    const comunidadGuardada = localStorage.getItem('comunidad_seleccionada');
    if (!comunidadGuardada) {
      console.error('No se ha seleccionado una comunidad');
      return;
    }
    
    const comunidad = JSON.parse(comunidadGuardada);
    const idComunidad = comunidad.id_comunidad; // id_comunidad dinámico

    // Obtener la fecha seleccionada en formato dd/mm/yyyy
    const day = `${this.selectedDate.getDate()}`.padStart(2, '0');
    const month = `${this.selectedDate.getMonth() + 1}`.padStart(2, '0');
    const year = this.selectedDate.getFullYear();

    const fecha = `${day}/${month}/${year}`; // Formato de fecha dinámico

    // Generar la URL de la API de forma dinámica con id_comunidad y fecha usando la configuración de entorno
    const url = `${environment.apiUrl}/reservations/by-user-community?id_comunidad=${idComunidad}&fecha=${fecha}`;
    console.log('Cargando reservas desde la URL:', url);

    // Hacer la solicitud HTTP
    this.http.get<any>(url).subscribe(
      response => {
        console.log('Respuesta de la API:', response);
        this.reservedSlots = this.parseReservedSlots(response);
        console.log('Reservas parseadas:', this.reservedSlots);
      },
      error => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  parseReservedSlots(response: any): any[] {
    const reservedSlots: any[] = [];
    response.reservas.forEach((reserva: any) => {
      const [day, month, year] = reserva.fecha.split('/');
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const reservationDate = new Date(`${dateStr}T${reserva.hora_inicio}:00`);

      reservedSlots.push({
        id_reserva: reserva.id_reserva,
        fecha_key: this.formatDateKey(reservationDate),
        hora: reserva.hora_inicio.padStart(5, '0'),
        hora_fin: reserva.hora_fin.padStart(5, '0'),
        servicio: reserva.nombre_servicio
      });
    });
    return reservedSlots;
  }

  isReservedForHour(dayKey: string, hour: string): boolean {
    return this.reservedSlots.some(reserva => {
      if (reserva.fecha_key !== dayKey) return false;

      const reservaHoraInicio = parseInt(reserva.hora.split(':')[0], 10);
      const reservaHoraFin = parseInt(reserva.hora_fin.split(':')[0], 10);
      const horaActual = parseInt(hour.split(':')[0], 10);

      return horaActual >= reservaHoraInicio && horaActual < reservaHoraFin;
    });
  }

  getServiceForTime(dayKey: string, hour: string): string {
    const reserva = this.reservedSlots.find(r => r.fecha_key === dayKey && r.hora === hour);
    return reserva ? reserva.servicio : '';
  }

  isReserved(day: number): boolean {
    const key = this.formatDateKeyFromDay(day);
    return this.reservedSlots.some(reserva => reserva.fecha === key);
  }

  selectDay(day: number): void {
    const selectedDate = new Date(this.year, this.monthIndex, day);
    this.selectedDate = selectedDate;
    this.currentDate = selectedDate;

    console.log('📌 Fecha seleccionada:', selectedDate.toDateString());

    const weekDates: string[] = [];
    const baseTime = selectedDate.getTime();

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseTime + i * 24 * 60 * 60 * 1000);
      const key = this.formatDateKey(date);
      weekDates.push(key);
    }

    this.currentWeekKeys = weekDates;
    this.loadReservations();
  }

  formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateKeyFromDay(day: number): string {
    const date = new Date(this.year, this.currentDate.getMonth(), day);
    return this.formatDateKey(date);
  }

  getWeekDates(centerDate: Date): string[] {
    const weekDates: string[] = [];
    const dayOfWeek = centerDate.getDay();
    const startOfWeek = new Date(centerDate);
    startOfWeek.setDate(centerDate.getDate() - dayOfWeek + 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(this.formatDateKey(date));
    }

    return weekDates;
  }

  formatDateToLabel(key: string): string {
    const [year, month, day] = key.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayName = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()];
    return `${dayName} ${date.getDate()}`;
  }

  onCellClick(dayKey: string, hour: string): void {
    const horaActual = parseInt(hour.split(':')[0], 10);

    const reserva = this.reservedSlots.find(r => {
      if (r.fecha_key !== dayKey) return false;
      const horaInicio = parseInt(r.hora.split(':')[0], 10);
      const horaFin = parseInt(r.hora_fin.split(':')[0], 10);
      return horaActual >= horaInicio && horaActual < horaFin;
    });

    if (reserva) {
      console.log('Redirigiendo a detalle de reserva con ID:', reserva.id_reserva);
      this.router.navigate(['/user/reserva-detalle', reserva.id_reserva]);
    }
  }
}
