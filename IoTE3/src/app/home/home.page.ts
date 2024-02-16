import { Component } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  rutaTabla: any;
  ledStatus: boolean = false;

  rutaTabla2: any;
  ledStatus2: boolean = false;

  rutaTabla3: any;
  ledStatus3: boolean = false;

  rutaTabla4: any;
  ledStatus4: boolean = false;

  constructor(private db: Firestore) { }

  async toogleState() {
    this.ledStatus = (!this.ledStatus);
    this.rutaTabla = doc(this.db, 'controlLed', 'LED1');
    await setDoc(this.rutaTabla, { encender: this.ledStatus });//CAMBIA EL ATRIBUTO DE LA TABLA
    console.log(this.ledStatus)
  }
  async toogleState2() {
    this.ledStatus2 = (!this.ledStatus2);
    this.rutaTabla2 = doc(this.db, 'controlLed', 'LED2');
    await setDoc(this.rutaTabla2, { encender: this.ledStatus2 });//CAMBIA EL ATRIBUTO DE LA TABLA
    console.log(this.ledStatus2)
  }
  async toogleState3() {
    this.ledStatus3 = (!this.ledStatus3);
    this.rutaTabla3 = doc(this.db, 'controlLed', 'LED3');
    await setDoc(this.rutaTabla3, { encender: this.ledStatus3 });//CAMBIA EL ATRIBUTO DE LA TABLA
    console.log(this.ledStatus3)
  }
  async toogleState4() {
    this.ledStatus4 = (!this.ledStatus4);
    this.rutaTabla4 = doc(this.db, 'controlLed', 'LED4');
    await setDoc(this.rutaTabla4, { encender: this.ledStatus4 });//CAMBIA EL ATRIBUTO DE LA TABLA
    console.log(this.ledStatus4)
  }
}
