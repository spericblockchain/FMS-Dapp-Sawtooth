import { NgModule } from '@angular/core'
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCardModule,
  MatGridListModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs'

const MatModules = [
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatGridListModule,
  MatCardModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  BrowserAnimationsModule,
  MatTabsModule
]
@NgModule( {
  imports: MatModules,
  exports: MatModules
} )
export class MaterialModule { }
