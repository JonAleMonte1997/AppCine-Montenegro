import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss']
})
export class DeleteAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAlertComponent>)
     { }

  ngOnInit(): void {
  }

}
