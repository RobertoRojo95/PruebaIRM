import { APP_ID, Component, OnInit } from '@angular/core';
import {ApiService} from '../../Util/api.service'; 
import {debounceTime, startWith, switchMap, takeUntil} from 'rxjs/operators';
import{ModalContactoComponent} from '../modal-contacto/modal-contacto.component'
import { MatDialog } from '@angular/material/dialog';


let csvToJson = require('convert-csv-to-json');



export interface Contacto {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  curp: string;
  fechaRegistro: string;
}

export interface ContactoCSV {
  NombreCompleto: string;
  Direccion: string;
  Telefono: string;
  CURP: string;
}


@Component({
  selector: 'app-pagina-crud',
  templateUrl: './pagina-crud.component.html',
  styleUrls: ['./pagina-crud.component.css']
})



export class PaginaCrudComponent implements OnInit{

  public contactData!: any[];
  public dataMostrar : any;
  filtro: String = "";
  

  constructor(public apiService: ApiService,public dialog: MatDialog) { 

  }


  ngOnInit(): void {
    this.getContacts();
  
  }

  getContacts(): void {
    this.apiService.getAll().subscribe((resp: any) => {
      this.contactData = resp;
      this.dataMostrar = this.contactData;
      
    });

  }

  nuevoContacto(): void{
    const dialogRef = this.dialog.open( ModalContactoComponent, {
      data: {
        title:"Nuevo Contacto",
        isNew:true,
        prevContacto: {}
      },
      autoFocus: false,
      width: '800px'
    });
    dialogRef.afterClosed().pipe().subscribe((output) => {
      console.log("Cerró el modal");
      if (output  && output.newArray) {
        this.contactData = output.newArray
        this.dataMostrar = this.contactData;
      }
      
    });
  }

  public importar(event: any){
    let files : FileList = event.target.files;
    console.log(files);
   

    if(files && files.length > 0) {
      let file : File | null = files.item(0); 
        console.log(file?.name);
        console.log(file?.size);
        console.log(file?.type);
        let reader: FileReader = new FileReader();
        reader.readAsText(file!);
        reader.onload = (e) => {
           let csv: string = reader.result as string;
           console.log(csv);
           var array=[];
           array = csv.split('\n');
           console.log(array);
           
           var contactosArray = [];
           for (let i = 1; i < array.length; i++) {
            if(array[i] != ""){ var linea = array[i].split(',');
            var contTemp: ContactoCSV ={
            NombreCompleto : linea[0].trim(),
            Direccion : linea[1].trim(),
            Telefono : linea[2].trim(),
            CURP : linea[3].trim(),
            }
            contactosArray.push(contTemp);
            console.log(contactosArray);
            
            }

            
           }
           if(confirm("¿Desea subir los "+contactosArray.length+ " registro encontrados?")){
              
            this.apiService.addMultipleContacto(contactosArray).subscribe((resp: any) => {
              this.contactData = resp;
              this.dataMostrar = this.contactData;
            });
          }
        }
     }
  }
  

  openContactDialog(element: any) {
    const dialogRef = this.dialog.open( ModalContactoComponent, {
      data: {
        title:"Editar Contacto",
        isNew:false,
        prevContacto: element
      },
      autoFocus: false,
      width: '800px'
    });
    dialogRef.afterClosed().pipe().subscribe((output) => {
      if (output  && output.newArray) {
        this.contactData = output.newArray
        this.dataMostrar = this.contactData;
      }
      
    });

  }

  deleteContact(id: any){
if(confirm("¿Seguro que desea borrar el contacto seleccionado?")){
this.apiService.deleteContacto(id).subscribe((resp: any) => {
  this.contactData = resp;
  this.dataMostrar = this.contactData;
});
}
  }

  

  
  displayedColumns: string[] = ['ID', 'Nombre', 'Direccion', 'Telefono','CURP','Fecha de Registro','Editar','Borrar'];

  applyFilter(event: any) {
    if(event.target.value != ""){
    this.dataMostrar = this.contactData.filter(x => (x.Id.toString().includes(event.target.value) || x.NombreCompleto.includes(event.target.value) || x.Direccion.includes(event.target.value) || x.Telefono.includes(event.target.value) || x.CURP.includes(event.target.value)));
    }else{
      this.dataMostrar = this.contactData;
    }
  
    
    
  }

}
