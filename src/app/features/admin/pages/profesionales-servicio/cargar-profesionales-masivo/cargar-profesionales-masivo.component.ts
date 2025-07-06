import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-profesionales-masivo',
  templateUrl: './cargar-profesionales-masivo.component.html',
  styleUrls: ['./cargar-profesionales-masivo.component.css']
})
export class CargarProfesionalesMasivoComponent {
  archivoSeleccionado: File | null = null;
  excelData: any[] = [];
  excelHeaders: string[] = [];
  datosValidos = false;
  isHovering = false;
  procesando = false;
  resumenCarga: any = null;

  // Notificación
  showNotification = false;
  notificationData: { type: 'error' | 'success' | 'warning' | 'info', message: string, title: string } = {
    type: 'info',
    message: '',
    title: ''
  };

  columnasRequeridas = [
    'nombre_completo',
    'email',
    'id_servicio',
    'formulario'
  ];

  idServicio!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Obtiene el id del servicio desde la ruta
    this.route.paramMap.subscribe(params => {
      this.idServicio = Number(params.get('id'));
    });
  }

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

    this.http.post(`${environment.apiUrl}/services/carga-masiva`, formData)
      .subscribe({
        next: (resp: any) => {
          // Guardar resumen para mostrarlo en la vista
          this.resumenCarga = resp.resumen;
          // Notificación simple
          this.notificationData = {
            type: 'success',
            title: resp.mensaje || 'Carga masiva completada',
            message: 'Revisa el resumen de la carga más abajo.'
          };
          this.showNotification = true;
          //this.eliminarArchivo();
        },
        error: (err) => {
          this.notificationData = {
            type: 'error',
            title: 'Error',
            message: err?.error?.mensaje || 'Error al cargar profesionales.'
          };
          this.showNotification = true;
        }
      }).add(() => this.procesando = false);
  }

  onNotificationClose() {
    this.showNotification = false;
  }

  volver() {
    this.router.navigate(['/admin/gestion-servicios']);
  }
}
