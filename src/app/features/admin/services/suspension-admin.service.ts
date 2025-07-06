import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SuspensionRequest {
  id_suspension: number;
  id_cliente: number;
  id_inscripcion: number;
  motivo: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado_bd: number;
  estado_visual: string;
  color: string;
  acciones_disponibles: string[];
  puede_modificar: boolean;
  dias_hasta_inicio?: number;
  mensaje?: string;
  nombres: string;
  apellidos: string;
  email: string;
  comunidad: string;
}

export interface SuspensionDetail {
  id_suspension: number;
  id_cliente: number;
  id_inscripcion: number;
  motivo: string;
  fecha_inicio: string;
  fecha_fin: string;
  archivo: string | null;
  fecha_creacion: string;
  creado_por: string;
  fecha_modificacion: string;
  modificado_por: string;
  estado_bd: number;
  estado_visual: string;
  color: string;
  acciones_disponibles: string[];
  puede_modificar: boolean;
  dias_restantes?: number;
  mensaje?: string;
  cliente_info: {
    nombres: string;
    apellidos: string;
    email: string;
  };
  comunidad_info: {
    nombre: string;
  };
}

export interface ApiResponse {
  ok: boolean;
  message: string;
  id_suspension?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SuspensionAdminService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todas las suspensiones con estado
  obtenerTodasSuspensiones(): Observable<SuspensionRequest[]> {
    return this.http.get<SuspensionRequest[]>(`${this.baseUrl}/billing/suspensiones/todas-con-estado`);
  }

  // Obtener detalles de una suspensión específica
  obtenerDetalleSuspension(idSuspension: number): Observable<SuspensionDetail> {
    return this.http.get<SuspensionDetail>(`${this.baseUrl}/billing/suspension/${idSuspension}/detalles`);
  }

  // Aprobar una suspensión
  aprobarSuspension(idSuspension: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/billing/suspension/${idSuspension}/aceptar`, {});
  }

  // Rechazar una suspensión
  rechazarSuspension(idSuspension: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/billing/suspension/${idSuspension}/rechazar`, {});
  }
} 