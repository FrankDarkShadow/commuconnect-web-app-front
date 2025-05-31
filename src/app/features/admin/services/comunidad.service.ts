import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { environment } from 'src/environments/environment';




export interface Comunidad {
 id_comunidad?: number;
  nombre: string;
  slogan?: string;
   imagen?: string;

  // No incluimos el archivo aquí porque se enviará en FormData
}



@Injectable({
  providedIn: 'root'
})


export class ComunidadService {


   private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }






crearComunidad(comunidad: Comunidad, logo?: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', comunidad.nombre);
    if (comunidad.slogan) {
      formData.append('slogan', comunidad.slogan);
    }


    if (logo) {
      //formData.append('logo', logo, logo.name);
      formData.append('imagen', logo, logo.name); // ✅ debe coincidir con el backend

    }

     const token = localStorage.getItem('access_token');

     return this.http.post(`${this.baseUrl}/comunidades/crear_comunidad`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  }



//  listarComunidades(): Observable<any[]> {
 //   return this.http.get<any[]>(this.baseUrl);
  //}


  listarComunidades(): Observable<Comunidad[]> {
    const url = `${this.baseUrl}/comunidades/listar_comunidad`;
    return this.http.get<Comunidad[]>(url).pipe(
      map((data: any[]) =>
        data.map(c => ({
          id_comunidad: c.id_comunidad,
          nombre: c.nombre,
          slogan: c.slogan,
          imagen: c.imagen
        }))
      )
    )};









  eliminarComunidad(id: number): Observable<any> {


  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete(`${this.baseUrl}/comunidades/eliminar_comunidad/${id}`, { headers });
}


}
