// Se importa el decorador Injectable de Angular para que el servicio pueda ser inyectado en otros componentes
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cliente HTTP de Angular
import { Observable } from 'rxjs'; // Para manejar respuestas asincrónicas
import { environment } from 'src/environments/environment'; // Para obtener la URL base del backend


// Define la estructura de la solicitud de login (qué datos se enviarán en el cuerpo de la solicitud)
interface LoginRequest {
  email: string;
  password: string;
}

// Define la estructura de la respuesta del servidor después de un login exitoso (qué datos esperamos recibir)
interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  repetir_password: string;
  tipo_documento: 'DNI' | 'CARNET DE EXTRANJERÍA'; // Debe coincidir con Literal
  num_doc: string;
  numero_telefono: string;
  id_departamento: number;
  id_distrito: number;
  direccion: string;
  fecha_nac: string; 
  genero: string;
  talla: number;
  peso: number;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // Define la URL base de la API, que proviene del archivo `environment`
  private readonly baseUrl = environment.apiUrl;


  // El constructor inyecta el servicio `HttpClient` para realizar solicitudes HTTP
  constructor(private readonly http: HttpClient) { }


    // Método para iniciar sesión, recibe el email y la contraseña del usuario
    // Retorna un Observable de tipo LoginResponse, que contiene el token de acceso

  login(email: string, password: string): Observable<LoginResponse> {

    // Crea el cuerpo de la solicitud, con los datos de login proporcionados
    const body = {
      email: email,
      password: password,
    };


      return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body);
    }
    // Método para registrar un nuevo usuario
    register(data: RegisterRequest): Observable<any> {
    // Hacemos una petición POST a la URL: https://tu-api.com/usuarios/register
    return this.http.post<any>(`${this.baseUrl}/usuarios/registrar-cliente`, data);
    }
  }
