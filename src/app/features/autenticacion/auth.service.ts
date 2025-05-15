import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cliente HTTP de Angular
import { Observable } from 'rxjs'; // Para manejar respuestas asincrónicas
import { environment } from 'src/environments/environment'; // Para obtener la URL base del backend





interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface RegisterRequest {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  genero: string;
  peso: string;
  talla: string;
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {
       const body = {
      email: email,
      password: password,
    };

      return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);
    }
    // Método para registrar un nuevo usuario
    register(data: RegisterRequest): Observable<any> {
    // Hacemos una petición POST a la URL: https://tu-api.com/usuarios/register
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data);
    }
  
}
