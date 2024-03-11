import { Component } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

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

  async ngOnInit() {
    // Obtener los estados iniciales de los LEDs desde la base de datos
    await this.updateLEDStatus();
  }

  async toogleState() {
    this.ledStatus = !this.ledStatus;
    await this.updateLEDState(this.rutaTabla, this.ledStatus);
  }

  async toogleState2() {
    this.ledStatus2 = !this.ledStatus2;
    await this.updateLEDState(this.rutaTabla2, this.ledStatus2);
  }

  async toogleState3() {
    this.ledStatus3 = !this.ledStatus3;
    await this.updateLEDState(this.rutaTabla3, this.ledStatus3);
  }

  async toogleState4() {
    this.ledStatus4 = !this.ledStatus4;
    await this.updateLEDState(this.rutaTabla4, this.ledStatus4);

    // Actualiza los estados locales de todos los LEDs
    this.ledStatus = this.ledStatus2 = this.ledStatus3 = this.ledStatus4;

    // Actualiza los estados de todos los LEDs en la base de datos
    const led1Ref = doc(this.db, 'controlLed', 'LED1');
    const led2Ref = doc(this.db, 'controlLed', 'LED2');
    const led3Ref = doc(this.db, 'controlLed', 'LED3');

    await Promise.all([
      this.updateLEDState(led1Ref, this.ledStatus4),
      this.updateLEDState(led2Ref, this.ledStatus4),
      this.updateLEDState(led3Ref, this.ledStatus4)
    ]);
  }

  private async updateLEDStatus() {
    this.rutaTabla = doc(this.db, 'controlLed', 'LED1');
    const led1Doc: any = await getDoc(this.rutaTabla);
    this.ledStatus = led1Doc.exists ? led1Doc.data().encender : false;

    this.rutaTabla2 = doc(this.db, 'controlLed', 'LED2');
    const led2Doc: any = await getDoc(this.rutaTabla2);
    this.ledStatus2 = led2Doc.exists ? led2Doc.data().encender : false;

    this.rutaTabla3 = doc(this.db, 'controlLed', 'LED3');
    const led3Doc: any = await getDoc(this.rutaTabla3);
    this.ledStatus3 = led3Doc.exists ? led3Doc.data().encender : false;

    this.rutaTabla4 = doc(this.db, 'controlLed', 'LED4');
    const led4Doc: any = await getDoc(this.rutaTabla4);
    this.ledStatus4 = led4Doc.exists ? led4Doc.data().encender : false;
  }

  private async updateLEDState(documentRef: any, status: boolean) {
    await setDoc(documentRef, { encender: status });
  }
}

