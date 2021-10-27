import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule,} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ApiBasic } from './services/api-basic';
import { HeaderComponent } from './components/header/header.component';
import { LocalstorageService } from './services/localstorage.service';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { DonationListComponent } from './pages/donations/donation-list/donation-list.component';
import { DonationDetailComponent } from './pages/donations/donation-detail/donation-detail.component';
import { PetitionListComponent } from './pages/petitions/petition-list/petition-list.component';
import { PetitionListObjectsComponent } from './pages/petitions/petition-list-objects/petition-list-objects.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalCreatePetitionComponent } from './pages/petitions/modal-create-petition/modal-create-petition.component';
import { MaterialModule } from './material-module';
import { DatePipe } from '@angular/common';
import { ModalDetailPetitionComponent } from './pages/petitions/modal-detail-petition/modal-detail-petition.component';
import { ObjectListsComponent } from './pages/objects/object-lists/object-lists.component';
import { ObjectCreateModalComponent } from './pages/objects/object-create-modal/object-create-modal.component';
import { ObjectDetailModalComponent } from './pages/objects/object-detail-modal/object-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    UserListComponent,
    UserProfileComponent,
    DonationListComponent,
    DonationDetailComponent,
    PetitionListComponent,
    PetitionListObjectsComponent,
    ModalCreatePetitionComponent,
    ModalDetailPetitionComponent,
    ObjectListsComponent,
    ObjectCreateModalComponent,
    ObjectDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() => initializeApp( environment.firebaseConfig )),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AngularFirestore, ApiBasic,LocalstorageService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
