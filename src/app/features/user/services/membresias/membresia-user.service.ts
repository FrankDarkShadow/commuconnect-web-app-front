import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InfoInscripcion {
  id_inscripcion: number;
  estado: number;
  titulo: string;
  descripcion_plan: string; 
  precio: number;
  periodo: string;
  fecha_inicio: string;
  fecha_fin: string;
}
export interface EsConTopesResponse {
  esPlanConTopes: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MembresiaUserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  obtenerInfoInscripcion(idComunidad: number): Observable<InfoInscripcion> {
    return this.http.get<InfoInscripcion>(`${this.baseUrl}/billing/usuario/comunidad/${idComunidad}/info-inscripcion`);
  }

  esPlanConTopes(idInscripcion: number): Observable<EsConTopesResponse> {
    return this.http.get<EsConTopesResponse>(`${this.baseUrl}/billing/usuario/plan/${idInscripcion}/es-con-topes`);
  }
//suspender membresia
  congelarMembresiaConFormulario(idInscripcion: number, datos: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/inscripcion/${idInscripcion}/solicitar-congelamiento`, datos);
  }

  reactivarMembresia(idInscripcion: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/inscripcion/${idInscripcion}/reactivar`, {});
  }
  // membresia-user.service.ts
  cancelarMembresia(idInscripcion: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/billing/inscripcion/${idInscripcion}/cancelar`, {});
  }
  pagarMembresia(idComunidad: number) {
    return this.http.post(`${this.baseUrl}/billing/comunidades/${idComunidad}/pagar`, {});
  }



}
