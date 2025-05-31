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
  /*
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
*/

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

    // Validar que las contraseñas coincidan
    if (formValues.password !== formValues.repetir_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Validar fecha de nacimiento coherente y mayor de edad
    const fechaNac = new Date(formValues.fecha_nac);
    const hoy = new Date();
    const edadMinima = 18;
    const edadMaxima = 120;

    if (fechaNac > hoy) {
      this.errorMessage = 'Fecha de nacimiento inválida.';
      return;
    }
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();
    if (
      edad < edadMinima ||
      (edad === edadMinima && (mes < 0 || (mes === 0 && dia < 0)))
    ) {
      this.errorMessage = 'Debes ser mayor de 18 años.';
      return;
    }
    if (edad > edadMaxima) {
      this.errorMessage = 'Fecha de nacimiento inválida.';
      return;
    }

    // Validar número de teléfono peruano (+51 y 9 dígitos)
    let telefono = formValues.numero_telefono;
    // Remover espacios, guiones u otros caracteres para validar solo números
    telefono = telefono.replace(/[\s\-]/g, '');
    // Permitir que ingrese con o sin +51, normalizamos
    if (telefono.startsWith('+51')) {
      telefono = telefono.slice(3);
    }
    if (!/^\d{9}$/.test(telefono)) {
      this.errorMessage = 'El número de teléfono debe tener 9 dígitos válidos en Perú.';
      return;
    }

    // Validar peso coherente (30 kg a 300 kg)
    const peso = parseFloat(formValues.peso);
    if (isNaN(peso) || peso < 30 || peso > 300) {
      this.errorMessage = 'Ingresa un peso válido entre 30 y 300 kg.';
      return;
    }

    // Validar talla coherente (0.5 m a 2.5 m)
    const talla = parseFloat(formValues.talla);
    if (isNaN(talla) || talla < 0.5 || talla > 2.5) {
      this.errorMessage = 'Ingresa una talla válida entre 0.5 y 2.5 metros.';
      return;
    }

    // Si pasa todas las validaciones, se construye el requestBody y se envía
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
      peso: peso,
      talla: talla,
    };

    this.authService.register(requestBody).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito', res);
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/presentacion/confirmar-correo']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        this.errorMessage = 'Error al registrarse. Verifica tus datos.';
      },
    });
  }
}
