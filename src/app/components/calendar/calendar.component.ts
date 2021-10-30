import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DonationsService } from 'src/app/services/donations.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import { HoursService } from 'src/app/services/hours.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input('idUsers') idUserTab: any;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);

        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);

        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events2: CalendarEvent[] = []
  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: startOfDay(new Date("Sat Oct 30 2021 00:00:00 GMT-0500")),
      title: 'Checar',
      color: colors.yellow,
      actions: this.actions,
    },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  donationStatus: boolean = false;
  petitionStatus: boolean = false;
  hourStatus: boolean = false;

  constructor(
    private modal: NgbModal,
    private _donation: DonationsService,
    private _petition: PetitionsService,
    private _hours: HoursService
  ) {
    console.log(new Date());

  }

  ngOnInit() {
    this.getDonationUser();
    this.getPetitionUser();
    this.getHorasUser()
  }

  actualiza(){
    this.getDonationUser();
    this.getPetitionUser();
    this.getHorasUser()
  }

  getDonationUser() {
    this.events2 =[]

    this.donationStatus = false;

    this._donation.getDonationListByUser(this.idUserTab).subscribe((res => {
      console.log('sdas');
      this.donationStatus = false;
      if (res[0]) {
        res.map(async element => {
          let date = element.created_at.toDate()
          let date2 = new Date(date).toLocaleString()

          this.events2.push(
            {
              start: date,
              title: 'Donación del dia ' + date2,
              color: colors.yellow,
              actions: this.actions
            }
          )
        });
        this.donationStatus = true;
      } else {
        this.donationStatus = true;
      }
    }))
  }

  getPetitionUser() {
    this.petitionStatus = false;

    this._petition.getPetitionsListUser(this.idUserTab).subscribe((res => {
      this.petitionStatus = false;
      if (res[0]) {
        res.map(async element => {
          let date = element.created_at.toDate()
          let date2 = new Date(date).toLocaleString()

          this.events2.push(
            {
              start: date,
              title: 'Petición ' + 'item ' + element.nameObject + ' ' + date2,
              color: colors.red,
              actions: this.actions,
            }
          )
        });
        this.petitionStatus = true;

      } else {
        this.petitionStatus = true;
      }
    }))
  }

  getHorasUser() {
    this.hourStatus = false;
    this._hours.getHoursUser(this.idUserTab).subscribe(res => {
      this.hourStatus = false;


      if (res[0]) {
        console.log('Tengo datos');
        res.map(async element => {
          let date = element.created_at.toDate()
          let date2 = new Date(date).toLocaleString()
          let datedate_end = element.date_end.toDate()
          let date2date_endlabel = new Date(datedate_end).toLocaleString()
          this.events2.push(
            {
              start: date,
              title: 'Estuvo activo ' + date2 + '----' + date2date_endlabel,
              color: colors.blue,
              actions: this.actions,
            }
          )
        });
        this.hourStatus = true;

      } else {
        this.hourStatus = true;
        console.log('no teengo datos');
      }
      console.log('Los petition', res);
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);

    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
