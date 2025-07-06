import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// 📋 Interface para la respuesta de tu API (solo sesiones virtuales)
export interface SesionVirtualFormularioInfo {
  profesional_nombre: string;
  fecha_sesion: string;
  hora_inicio: string;
  hora_fin: string;
  url_formulario: string;
  formulario_completado: boolean;
}

export interface FormularioSesionVirtual {
  id_sesion: number;
  archivo: File;
}

@Injectable({
  providedIn: 'root'
})
export class SesionVirtualFormularioService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔒 Método privado para obtener headers con token
  private getAuthHeaders(): HttpHeaders {
    const tokenType = localStorage.getItem('token_type') || 'Bearer';
    const accessToken = localStorage.getItem('access_token') || '';
    
    return new HttpHeaders({
      'Authorization': `${tokenType} ${accessToken}`
    });
  }

  // 📋 Obtener información del formulario de sesión virtual
  obtenerInfoFormulario(idSesion: number): Observable<SesionVirtualFormularioInfo> {
    const headers = this.getAuthHeaders();
    return this.http.get<SesionVirtualFormularioInfo>(
      `${this.baseUrl}/reservations/formulario/${idSesion}`, 
      { headers }
    );
  }

  // 📤 Enviar formulario de sesión virtual
  enviarFormulario(formulario: FormularioSesionVirtual): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    
    formData.append('file', formulario.archivo);
    
    return this.http.post(
      `${this.baseUrl}/reservations/formulario/${formulario.id_sesion}/enviar`, 
      formData, 
      { headers }
    );
  }
}
