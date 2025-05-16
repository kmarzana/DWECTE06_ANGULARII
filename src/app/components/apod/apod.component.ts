import { Component, OnInit } from '@angular/core';
import { ApodService } from '../../services/apod-service/apod.service';

@Component({
  selector: 'app-apod',
  standalone: false,
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent implements OnInit {
  title: string = 'Astronomy Picture of the Day';
  apodData: any = {};
  isRandom: boolean = false;

  constructor(private apodService: ApodService) { }

  ngOnInit(): void {
    this.loadTodayAPOD();
    console.log(this.apodData);
  }

  // Obtiene y carga la imagen astronómica del día (APOD) desde el servicio
  loadTodayAPOD(): void {
    this.apodService.getAPOD().subscribe({
      next: (response) => {
        this.apodData = response;
        this.isRandom = false;
      }
    })
  }

  // Obtiene y carga una imagen astronómica del día (APOD) aleatoria desde el servicio
  loadRandomAPOD() {
    this.apodService.getRandomAPOD().subscribe({
      next: (response) => {
        this.apodData = Array.isArray(response) ? response[0] : response;
        this.isRandom = true;
      }
    })
  }
}
