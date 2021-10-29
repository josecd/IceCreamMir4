import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalCreatePetitionComponent } from '../petitions/modal-create-petition/modal-create-petition.component';
import { PetitionsService } from 'src/app/services/petitions.service';
import { ObjectCreateModalComponent } from '../objects/object-create-modal/object-create-modal.component';
import Swal from 'sweetalert2'
import { DonationsService } from 'src/app/services/donations.service';
import { formatDate } from '@angular/common';
import { ActiveHoursService } from 'src/app/services/active-hours.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('usuario') || '{}')
  donationUser: boolean = false;
  dateNow: any;
  donationDayUser: any;
  dateDonationDay: any;
  //Active hours
  statusActieHour:boolean=false;
  activeHours:any;
  dateEndActiveHour:any;
  constructor(
    public dialog: MatDialog,
    private _petition: PetitionsService,
    private _donation: DonationsService,
    private _activeHours: ActiveHoursService
  ) {
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en_US')

    this.getDonationUser()
    this.getActiveHoursUser()
  }

  ngOnInit(): void {
  }

  registerDonationv2() {
    Swal.fire({
      title: '¿Donaste hoy?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, done!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._donation.registerDonation().then(res => {
          Swal.fire(
            '¡Donación registrada!',
            'Tu donación fue registrada.',
            'success'
          )

        })
          .catch(error => {
            Swal.fire(
              '¡No se guardaron los cambios!',
              'Tu donación no se registro',
              'error'
            )
          })
      }
    })
  }

  registerActiveHours() {
    Swal.fire({
      title: '¿Desea iniciar un contador de horas?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, inciar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._activeHours.registerHourStart().then(res => {
          Swal.fire(
            '¡Hora de inicio registrado!',
            'Tu cotador fue resgistrado.',
            'success'
          )

        })
          .catch(error => {
            Swal.fire(
              '¡No se registron los cambios!',
              'Tu no se registro',
              'error'
            )
          })
      }
    })
  }

  getHors() {

  }

  getDonationUser() {
    this._donation.getDonationUser().subscribe(res => {
      let donationExtract = res[0];
      this.donationDayUser = res[0];
      if (donationExtract) {
        let dateAttended = donationExtract.created_at.toDate() || null
        let date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        let date2 = formatDate(new Date(dateAttended), 'yyyy-MM-dd', 'en_US');
        this.dateDonationDay = dateAttended
        if (date1 === date2) {
          this.donationUser = true;
        } else {
          this.donationUser = false;
        }
      } else {
        this.donationUser = false;
      }
    })
  }

  getActiveHoursUser() {
    this._activeHours.getActiveHoursUser().subscribe(res => {
      let activeHoursxtract = res[0];
      if (activeHoursxtract) {
        this.activeHours = res[0];
        this.dateEndActiveHour = res[0].created_at.toDate() || null
        this.statusActieHour = true;
      }else{
        this.statusActieHour = false;
      }
    })
  }

  registerDeactiveHours(item:any) {
    Swal.fire({
      title: '¿Desea terminar el contador de horas?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, terminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._activeHours.updateHourStatus(item.uid).then(res => {
          Swal.fire(
            '¡Horas registradas!',
            'Tu cotador fue resgistrado.',
            'success'
          )

        })
          .catch(error => {
            Swal.fire(
              '¡No se registron los cambios!',
              'Tu no se registro',
              'error'
            )
          })
      }
    })
  }



  goToPetition() {
    this.dialog.open(ModalCreatePetitionComponent, {
      width: "500px"
    })
  }

  goToObject() {
    this.dialog.open(ObjectCreateModalComponent, {
      width: "500px"
    })
  }
  rolActive() {

  }

}
