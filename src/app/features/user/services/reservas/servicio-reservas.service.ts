// src/app/features/user/services/reservas/servicio-reservas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Interfaz que modela cada sesión presencial que viene:
 * GET /api/reservations/sesiones-presenciales?...
 */
export interface SesionPresencial {
  fecha: string;           // "YYYY-MM-DD"
  ubicacion: string;       // nombre del local o distrito
  responsable: string;     // nombre del profesional responsable
  hora_inicio: string;     // "HH:MM"
  hora_fin: string;        // "HH:MM"
  vacantes_totales: number;
  vacantes_libres: number;
  // Si el backend envía id_sesion o id_local, añádelos también:
  // id_sesion?: number;
  // id_local?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioReservasService {
  // Base de la URL: “http://127.0.0.1:8000/api/reservations”
  private readonly baseApi = environment.apiUrl + '/reservations';

  constructor(private readonly http: HttpClient) { }

  /**
   * 1) GET /api/reservations/fechas-presenciales
   *    → El backend responde { "fechas": string[] }.
   *    Necesitamos extraer “fechas” y devolver solo string[].
   */
  getFechasPresenciales(
    idServicio: number,
    idDistrito: number,
    idLocal: number
  ): Observable<string[]> {
    const url = `${this.baseApi}/fechas-presenciales`;
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const params = new HttpParams()
      .set('id_servicio', idServicio.toString())
      .set('id_distrito', idDistrito.toString())
      .set('id_local', idLocal.toString());

    // Aquí usamos get<{ fechas: string[] }>, y luego map(res => res.fechas)
    return this.http
      .get<{ fechas: string[] }>(url, { headers, params })
      .pipe(map(res => res.fechas));
  }

  /**
   * 2) GET /api/reservations/horas-presenciales
   *    → Supongamos que el backend responde { "horas": string[] }.
   *    Extraemos “horas” y devolvemos string[].
   */
  getHorasPresenciales(
    idServicio: number,
    idDistrito: number,
    idLocal: number,
    fecha: string  // formato "YYYY-MM-DD"
  ): Observable<string[]> {
    const url = `${this.baseApi}/horas-presenciales`;
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const params = new HttpParams()
      .set('id_servicio', idServicio.toString())
      .set('id_distrito', idDistrito.toString())
      .set('id_local', idLocal.toString())
      .set('fecha', fecha);

    // Ajusta aquí si tu backend realmente responde { "horas": ["09:00", ...] }
    return this.http
      .get<{ horas: string[] }>(url, { headers, params })
      .pipe(map(res => res.horas));
  }

  /**
   * 3) GET /api/reservations/sesiones-presenciales
   *    → Supongamos que el backend responde { "sesiones": SesionPresencial[] }.
   *    Extraemos “sesiones” y devolvemos SesionPresencial[].
   */
  getSesionesPresenciales(
    idServicio: number,
    idDistrito: number,
    idLocal: number,
    fecha: string,     // "YYYY-MM-DD"
    hora: string       // "HH:MM"
  ): Observable<SesionPresencial[]> {
    const url = `${this.baseApi}/sesiones-presenciales`;
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const params = new HttpParams()
      .set('id_servicio', idServicio.toString())
      .set('id_distrito', idDistrito.toString())
      .set('id_local', idLocal.toString())
      .set('fecha', fecha)
      .set('hora', hora);

    // Ajusta aquí si tu backend responde { "sesiones": [ {fecha, ubicacion, …}, … ] }
    return this.http
      .get<{ sesiones: SesionPresencial[] }>(url, { headers, params })
      .pipe(map(res => res.sesiones));
  }

  /**
   * 4) GET /api/reservations/fechas-sesiones_virtuales_por_profesional/{id_profesional}
   *    → Respuesta esperada: { "fechas": string[] }.
   */
  getFechasVirtualesPorProfesional(
    idProfesional: number
  ): Observable<string[]> {
    const url = `${this.baseApi}/fechas-sesiones_virtuales_por_profesional/${idProfesional}`;
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<{ fechas: string[] }>(url, { headers })
      .pipe(map(res => res.fechas));
  }

  /**
   * 5) GET /api/reservations/reserva-existe/{id_sesion}
   *    → Supongamos que el backend responde { "existe": boolean }.
   */
  reservaExiste(idSesion: number): Observable<boolean> {
    const url = `${this.baseApi}/reserva-existe/${idSesion}`;
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    // Si el servidor responde { "existe": true/false }:
    return this.http.get<{ existe: boolean }>(url, { headers }).pipe(
      map(res => res.existe)
    );

    // Si respondiera un booleano “puro” (200 OK con body: true o false),
    // podrías usar: return this.http.get<boolean>(url, { headers });
  }
}
