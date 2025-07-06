import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-sesiones-masivo',
  templateUrl: './cargar-sesiones-masivo.component.html',
  styleUrls: ['./cargar-sesiones-masivo.component.css']
})
export class CargarSesionesMasivoComponent {
  archivoSeleccionado: File | null = null;
  excelData: any[] = [];
  excelHeaders: string[] = [];
  datosValidos = false;
  isHovering = false;
  procesando = false;
  resumenCarga: any = null;

  showNotification = false;
  notificationData: { type: 'error' | 'success' | 'warning' | 'info', message: string, title: string } = {
    type: 'info',
    message: '',
    title: ''
  };

  columnasRequeridas = [
  'id_servicio',
  'id_profesional',
  'fecha_inicio',
  'fecha_fin',
  'url_meeting',
  'url_archivo'
  ];

  columnasOpcionales = [
    'descripcion'
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.leerArchivo(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovering = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.leerArchivo(file);
    }
  }

  leerArchivo(file: File) {
    this.archivoSeleccionado = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      this.excelData = json;
      this.excelHeaders = this.excelData.length > 0 ? Object.keys(this.excelData[0]) : [];
      this.datosValidos = this.validarColumnas();
    };
    reader.readAsArrayBuffer(file);
  }

  validarColumnas(): boolean {
    if (this.excelData.length === 0) return false;
    return this.columnasRequeridas.every(col => this.excelHeaders.includes(col));
  }

  eliminarArchivo() {
    this.archivoSeleccionado = null;
    this.excelData = [];
    this.excelHeaders = [];
    this.datosValidos = false;
  }
  
async subirArchivo() {
  if (!this.archivoSeleccionado || !this.datosValidos) return;

  this.procesando = true;

  const formData = new FormData();
  formData.append('archivo', this.archivoSeleccionado);

  this.http.post(`${environment.apiUrl}/reservations/carga-masiva`, formData)
    .subscribe({
      next: (resp: any) => {
        console.log("✅ Respuesta exitosa:", resp);

        // Si todo salió bien, asignamos el resumen recibido
        this.resumenCarga = resp?.resumen ?? {
          insertados: 0,
          errores: []
        };

        // Eliminar archivo después de procesar
        this.eliminarArchivo();
      },
      error: (err) => {
        console.error("❌ Error de carga:", err);

        // Si el backend devuelve un resumen válido incluso en error
        const resumen = err?.error?.resumen;

        this.resumenCarga = resumen ?? {
          insertados: 0,
          errores: [err?.error?.mensaje || 'Error al cargar sesiones.']
        };
      }
    })
    .add(() => {
      this.procesando = false;
    });
}

get erroresComoArray(): string[] {
  const errores = this.resumenCarga?.errores;
  if (Array.isArray(errores)) return errores;
  if (typeof errores === 'string') return [errores];
  return ['Error al cargar sesiones.'];
}

  volver() {
    this.router.navigate(['/admin/gestion-servicios']);
  }
}
