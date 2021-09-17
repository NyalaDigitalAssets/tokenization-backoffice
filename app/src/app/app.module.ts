import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SVGLibraryService } from './core/services/svg-library.service';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { NgxCsvParserModule } from 'ngx-csv-parser';


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    NgxCsvParserModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private svgLibrary: SVGLibraryService) {
    // Initialize Custom SVG Library
    this.svgLibrary.init();
  }
}
