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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_documento: ['', Validators.required],     
      num_doc: ['', Validators.required],   
      password: ['', Validators.required],
      repetir_password: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      id_departamento: ['', Validators.required],
      id_distrito: ['', Validators.required],
      direccion: ['', Validators.required],
      numero_telefono: ['', Validators.required],
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
    if (formValues.password !== formValues.repetir_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Armamos el objeto que se enviará al backend (sin repetir la contraseña)
    const requestBody = {
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      email: formValues.email,
      tipo_documento: formValues.tipo_documento,       
      num_doc: formValues.num_doc,   
      password: formValues.password,
      repetir_password: formValues.repetir_password,
      fecha_nac: formValues.fecha_nac,
      id_departamento: parseInt(formValues.id_departamento),
      id_distrito: parseInt(formValues.id_distrito),
      direccion: formValues.direccion,
      numero_telefono: formValues.numero_telefono,
      genero: formValues.genero,
      peso: parseInt(formValues.peso),
      talla: parseInt(formValues.talla),
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
