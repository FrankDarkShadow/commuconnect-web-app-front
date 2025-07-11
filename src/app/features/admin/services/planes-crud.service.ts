import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Asegúrate de importar esto

export interface Plan {
  id_plan: number;
  titulo: string;
  duracion: number;
  descripcion: string;
  topes: number;
  precio: number;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class PlanesCrudService {
  private readonly baseUrl = environment.apiUrl; // Usa la url base del environment
  private apiUrl = `${this.baseUrl}/billing/planes`;
  constructor(private http: HttpClient) {}

  getPlanes(): Observable<Plan[]> {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    if (!tokenType || !accessToken) {
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Plan[]>(this.apiUrl, { headers });
  }

  eliminarPlan(id_plan: number) {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    if (!tokenType || !accessToken) {
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/${id_plan}`, { headers });
  }

  obtenerPlanPorId(id_plan: number) {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    if (!tokenType || !accessToken) {
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Plan>(`${this.apiUrl}/${id_plan}`, { headers });
  }

  actualizarPlan(plan: Plan) {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    if (!tokenType || !accessToken) {
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    // Asegura que los tipos sean correctos
    const body = {
      titulo: plan.titulo,
      descripcion: plan.descripcion,
      duracion: Number(plan.duracion),
      topes: Number(plan.topes),
      precio: Number(plan.precio),
      estado: Number(plan.estado)
    };

    return this.http.put<Plan>(`${this.apiUrl}/${plan.id_plan}`, body, { headers });
  }

  crearPlan(plan: { titulo: string; descripcion: string; duracion: number; topes: number; precio: number }) {
    const tokenType = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');

    if (!tokenType || !accessToken) {
      throw new Error('No se encontraron tokens de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Plan>(this.apiUrl, plan, { headers });
  }
}