import { Component, OnInit } from '@angular/core';
import { RoverService } from '../../services/rover-service/rover.service';

@Component({
  selector: 'app-rover',
  standalone: false,
  templateUrl: './rover.component.html',
  styleUrl: './rover.component.css'
})
export class RoverComponent implements OnInit {
  roverNames: string[] = ["curiosity", "opportunity", "spirit", "perseverance"];
  selectedRover: string = "";
  roverManifest: any = null;
  selectedSol: number = 0;
  showManifest: boolean = false;
  currentPage: number = 1;
  loadedRoverImages: any[] = [];
  loaded: boolean = false;

  constructor(private roverService: RoverService) { }

  ngOnInit(): void {

  }

  // Obtiene el manifiesto del rover seleccionado desde el servicio
  loadRoverManifest(): void {
    if (!this.roverNames.includes(this.selectedRover)) {
      this.resetRoverManifest();
      this.resetSelectedSol();
      this.resetShowManifest();
      this.resetLoadedRoverImages();
      this.resetLoaded();
      this.resetCurrentPage();
      return;
    }

    this.resetLoadedRoverImages();
    this.resetLoaded();
    this.resetCurrentPage();

    if (this.selectedSol) {
      this.resetSelectedSol();
    }

    this.roverService.getRoverManifest(this.selectedRover).subscribe({
      next: (response) => {
        this.roverManifest = response.photo_manifest;
        console.log(JSON.stringify(this.roverManifest, null, 2));
      }
    })
  }

  // Obtiene las imagenes de rover seleccionado desde el servicio
  loadRoverImages(): void {
    this.resetLoaded();

    this.roverService.getRoverImages(this.selectedRover, this.selectedSol, this.currentPage).subscribe({
      next: (response) => {
        this.loadedRoverImages = response.photos;
        this.loaded = true;
      }
    })
  }

  openPhotoInNewTab(photoUrl: string) {
    console.log(photoUrl);
    window.open(photoUrl, '_blank', 'noopener,noreferrer');
  }

  // Paginación
  nextPage() {
    this.currentPage++;
    this.loadRoverImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    this.currentPage--;
    this.loadRoverImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Resets
  resetRoverManifest(): void {
    this.roverManifest = null;
  }

  resetSelectedSol(): void {
    this.selectedSol = 0;
  }

  resetShowManifest(): void {
    this.showManifest = false;
  }

  resetLoadedRoverImages(): void {
    this.loadedRoverImages = [];
  }

  resetLoaded() {
    this.loaded = false;
  }

  resetCurrentPage() {
    this.currentPage = 1;
  }
}
