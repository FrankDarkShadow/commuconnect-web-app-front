import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { jwtDecode } from 'jwt-decode';

export interface UserTokenPayload {
  sub: string;
  nombre: string;
  apellido: string;
  email: string;
  // agrega más
}
export interface Plan {
  id_plan: number;
  titulo: string;
  descripcion: string;
  topes: number;
  precio: number;
}


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  //para planes
  getPlanesPorComunidad(idComunidad: number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/billing/por-comunidad/${idComunidad}`);
  }

  
  registrarInscripcion(id_comunidad: number, id_plan?: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });

    let params = new HttpParams().set('id_comunidad', id_comunidad.toString());

    if (id_plan !== undefined) {
      params = params.set('id_plan', id_plan.toString());
    }

    // id_pago ya no se necesita, el backend lo maneja internamente

    return this.http.post(
      `${this.baseUrl}/billing/inscripcion`,
      {},  // body vacío
      { headers, params }
    );
  }


  pagarComunidad(id_comunidad: number): Observable<any> {
    const token_type = localStorage.getItem('token_type') || 'Bearer';
    const access_token = localStorage.getItem('access_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `${token_type} ${access_token}`
    });


    return this.http.post(`${this.baseUrl}/billing/comunidades/${id_comunidad}/pagar`, {}, { headers });
  }



}
