import { Component, OnInit } from '@angular/core';
import { NeoService } from '../../services/neo-service/neo.service';
import { Neo } from '../../models/neo.model';

@Component({
  selector: 'app-neo',
  standalone: false,
  templateUrl: './neo.component.html',
  styleUrl: './neo.component.css'
})
export class NeoComponent implements OnInit {
  neoData: any[] = [];
  pastDate: boolean = false;
  dangerCount: number = 0;
  filteredNeo: any[] = [];
  isFiltered: boolean = false;
  selectedAction: string = "";
  deleteId: string = "";
  showDeleteSuccess: boolean = false;
  showDeleteFail: boolean = false;
  deleteMessage: string = '';
  checkDelete: boolean = false;
  selectedId: string = "";
  neoToUpdate: Partial<Neo> = {};
  updateMessage: string = "";
  showUpdateSuccess: boolean = false;
  showUpdateFail: boolean = false;

  constructor(private neoService: NeoService) { }

  // Cargamos el JSON al cargarse la página
  ngOnInit(): void {
    this.loadNeoData();
  }

  // Obtiene y carga el JSON con los objetos neo
  loadNeoData(): void {
    this.resetIsFiltered();
    this.neoService.getNeoData().subscribe({
      next: (response) => {
        this.neoData = response.objetos;
      }
    })
  }

  // Comparar fechas
  isPastDate(dateString: string): boolean {
    return new Date(dateString) < new Date();
  }

  // Calcula la cantidad de neos con un tipo de peligrosidad dado
  getDangerCount(peligrosidad: string) {
    return this.neoData.filter(neo => neo.peligrosidad === peligrosidad).length;
  }

  // Guarda en un array los neos con un tipo de peligrosidad dado
  filterByDanger(peligrosidad: string): void {
    this.isFiltered = true;
    this.filteredNeo = this.neoData.filter(neo => neo.peligrosidad === peligrosidad);
  }

  // Mostrar todos los objetos neo cuando estamos en modo filtro
  showAllNeos(): void {
    this.resetIsFiltered();
  }

  // Lógica para el borrado de objetos neo según su ID
  onDeleteNeo(): void {
    this.resetCheckDelete();

    this.neoService.deleteNeo().subscribe({
      next: () => {
        const index = this.neoData.findIndex(neo => neo.id === this.deleteId);
        const indexFiltered = this.filteredNeo.findIndex(neo => neo.id === this.deleteId);

        if (index !== -1 || indexFiltered !== -1) {
          this.neoData.splice(index, 1);
          this.filteredNeo.splice(indexFiltered, 1);

          this.deleteMessage = 'El registro se ha eliminado correctamente.';
          this.showDeleteSuccess = true;

          setTimeout(() => {
            this.resetShowDeleteSuccess();
            this.deleteMessage = '';
          }, 3000);

          this.resetDeleteId();

        } else {
          this.deleteMessage = `No se ha encontrado un registro identificador indicado -- ${this.deleteId} --`;
          this.showDeleteFail = true;

          setTimeout(() => {
            this.resetShowDeleteFail();
            this.deleteMessage = '';
          }, 3000);
        }
      }
    })
  }

  // Lógica para el update de objetos neo según su ID
  onUpdateNeo() {
    this.neoService.updateNeo(this.selectedId, this.neoToUpdate).subscribe({
      next: () => {
        const index = this.neoData.findIndex(neo => neo.id === this.selectedId);
        const indexFiltered = this.filteredNeo.findIndex(neo => neo.id === this.selectedId);

        if (index !== -1) {
          this.neoData[index] = {
            ...this.neoData[index],
            peligrosidad: this.neoToUpdate.peligrosidad
          }

          this.updateMessage = "El registro se ha modificado correctamente";
          this.showUpdateSuccess = true;

          setTimeout(() => {
            this.resetShowUpdateSuccess();
            this.updateMessage = '';
          }, 3000)

          this.resetSelectedId();

        } else {
          this.updateMessage = `No se ha encontrado un registro identificador indicado -- ${this.selectedId} --`
          this.showUpdateFail = true;

          setTimeout(() => {
            this.resetShowUpdateFail();
            this.updateMessage = '';
          }, 3000);
        }

        if (indexFiltered !== -1) {
          this.filteredNeo[indexFiltered] = {
            ...this.filteredNeo[indexFiltered],
            peligrosidad: this.neoToUpdate.peligrosidad
          }

          this.updateMessage = "El registro se ha modificado correctamente";
          this.showUpdateSuccess = true;

          setTimeout(() => {
            this.resetShowUpdateSuccess();
            this.updateMessage = '';
          }, 3000)

          this.resetSelectedId();

        } else {
          this.updateMessage = `No se ha encontrado un registro identificador indicado -- ${this.selectedId} --`
          this.showUpdateFail = true;

          setTimeout(() => {
            this.resetShowUpdateFail();
            this.updateMessage = '';
          }, 3000);
        }
      }
    })
  }

  // Scroll Up cuando estemos al final de la tabla
  toUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Resets
  resetIsFiltered(): void {
    this.isFiltered = false;
  }

  resetDeleteId(): void {
    this.deleteId = "";
  }

  resetShowDeleteSuccess(): void {
    this.showDeleteSuccess = false;
  }

  resetShowDeleteFail(): void {
    this.showDeleteFail = false;
  }

  confirmarBorrado(): void {
    this.checkDelete = true;
  }

  resetCheckDelete(): void {
    this.checkDelete = false;
  }

  resetSelectedId(): void {
    this.selectedId = "";
  }

  resetShowUpdateSuccess(): void {
    this.showUpdateSuccess = false;
  }

  resetShowUpdateFail(): void {
    this.showUpdateFail = false;
  }

  resetUpdateMessage(): void {
    this.updateMessage = '';
  }

  resetDeleteMessage(): void {
    this.deleteMessage = '';
  }
}
