import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para crear formularios reactivos
import { Router } from '@angular/router'; // Para redireccionar al usuario
import { AuthService } from '../../auth.service'; // Servicio de autenticación (registro, login, etc.)
import { environment } from 'src/environments/environment'; // Para obtener la URL base del backend

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  apiUrl = environment.apiUrl; // URL base del backend desde environment.ts
  registroForm: FormGroup; // El formulario reactivo
  errorMessage: string = ''; // Para mostrar errores
  successMessage: string = ''; // Para mostrar mensaje de éxito

  constructor(
    private fb: FormBuilder, // Para crear el formulario
    private authService: AuthService, // Servicio donde se hace la llamada HTTP
    private router: Router // Para redirigir al usuario luego del registro
  ) {
    // Aquí se define cada campo del formulario y sus validaciones
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      repetirContrasena: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required]
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.registroForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const formValues = this.registroForm.value;

    // Validamos que las contraseñas coincidan
    if (formValues.contrasena !== formValues.repetirContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Armamos el objeto que se enviará al backend (sin repetir la contraseña)
    const requestBody = {
      nombres: formValues.nombres,
      apellidos: formValues.apellidos,
      email: formValues.correo,
      password: formValues.contrasena,
      fechaNacimiento: formValues.fechaNacimiento,
      departamento: formValues.departamento,
      ciudad: formValues.ciudad,
      direccion: formValues.direccion,
      telefono: formValues.telefono,
      genero: formValues.genero,
      peso: formValues.peso,
      talla: formValues.talla
    };

    // Llamamos al método `register()` del AuthService para enviar los datos al backend
    this.authService.register(requestBody).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito', res);
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/']); // Redirige al home
        }, 1500);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        this.errorMessage = 'Error al registrarse. Verifica tus datos.';
      }
    });
  }
}
