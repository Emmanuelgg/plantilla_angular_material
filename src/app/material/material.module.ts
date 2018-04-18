import { NgModule } from '@angular/core';

import {
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatTableModule,
      MatCheckboxModule,
      MatGridListModule
} from '@angular/material';

import {
    MatMenuModule
} from '@angular/material/menu';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    MatDialogModule
} from '@angular/material/dialog';


@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule
    ]
})
export class MaterialModule { }
