import { Inject } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/Models/contacto.model';
import { ApiService } from 'src/app/Util/api.service';

export interface ContactoObj {
  title: string;
  isNew: boolean;
  prevContacto: any;
}


@Component({
  selector: 'app-modal-contacto',
  templateUrl: './modal-contacto.component.html',
  styleUrls: ['./modal-contacto.component.css']
})



export class ModalContactoComponent implements OnInit, AfterViewInit {




  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public contacto: ContactoObj,
    private dialogRef: MatDialogRef<ModalContactoComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public apiService: ApiService) { }

  addForm = this.fb.group({
    NombreCompleto: new FormControl({ value: '', disabled: false }, Validators.required),
    Direccion: new FormControl({ value: '', disabled: false }),
    Telefono: new FormControl({ value: '', disabled: false }, Validators.required),
    CURP: new FormControl({ value: '', disabled: false }, Validators.required)
  });



  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    console.log(this.contacto);
    if (!this.contacto.isNew) {
      this.addForm.patchValue({
        ...this.contacto.prevContacto
      });
    }
  }

  validarNumero(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  validarCurp(): boolean {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = this.addForm.get('CURP')!.value.match(re);

    if (!validado)
      return false;


    function digitoVerificador(curp17: any) {

      var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma = 0.0,
        lngDigito = 0.0;
      for (var i = 0; i < 17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
      lngDigito = 10 - lngSuma % 10;
      if (lngDigito == 10) return 0;
      return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
      return false;

    return true;
  }

  openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar');

  }




  sendContact() {
    if (this.addForm.get('Telefono')!.value.length != 10) {
      this.openSnackBar("Formato de telefono incorrecto");

    } else if (!this.validarCurp()) {
      this.openSnackBar("Formato de CURP incorrecto");
    } else {
      if (this.contacto.isNew) {
        //POST
        let reqContacto = {...this.addForm.value};
        this.apiService.addContacto(reqContacto).subscribe((resp: any) => {
          this.dialogRef.close({newArray: resp});
        });

      } else {
        //PUT
        let reqContacto = {...this.addForm.value};     
        this.apiService.updateContacto(this.contacto.prevContacto.Id,reqContacto).subscribe((resp: any) => {
          this.dialogRef.close({newArray: resp});
        });
      }
    }

  }





}
