import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError,WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'client1-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit, OnDestroy{
  subscription = new Subscription();
  saveSubscription:Subscription;
  updateSubscription:Subscription;
  idSubscription: Subscription;
  id: String;
  cardForm = new FormGroup({
    elotag: new FormControl(null),
    vezeteknev: new FormControl(null),
    keresztnev: new FormControl(null),
    intezmeny_nev: new FormControl(null),
    rendfokozat: new FormControl(null),
    img: new FormControl(null),
  });
  fotoKeszites = false ;
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage = null;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  deviceId: string;
  // showWebcam = true;
  errors: WebcamInitError[] = [];

  constructor(private dbService:DbServiceService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    console.log('newCardComponent init');
    //feliraatkozom visszater azzal az idvel amit az app-routig moduleban kertem hogy adja hozza a cimsorba
    this.idSubscription= this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      console.log('parameterek: ' + params.get('id'));
      if(this.id){
        this.subscription.add(this.dbService.get(this.id).subscribe((result)=>{
          //a CardForm.setValue- nak atadhato a teljes json ha minden eleme benne van a formban.
          this.cardForm.setValue({
            elotag: result[0].elotag,
            vezeteknev: result[0].vezeteknev,
            keresztnev: result[0].keresztnev,
            intezmeny_nev: result[0].intezmeny_nev,
            rendfokozat: result[0].rendfokozat,
            img: result[0].img,
          });
        })); 
      }
    });
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }
  ngOnDestroy(): void {
    console.log('newCardComponent destroy');
    if(this.saveSubscription){
      this.saveSubscription.unsubscribe();
    }
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe();

    }
    if(this.idSubscription){
      this.idSubscription.unsubscribe();
    }
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
  }
  onSubmit(): void {
    if(!this.id){      
      this.saveSubscription = this.dbService.save(this.cardForm).subscribe(this.handleRequest);
      console.log('save');
    }
    else{
      this.updateSubscription = this.dbService.update(this.id, this.cardForm).subscribe(this.handleRequest);
    }   
  }
  handleRequest(result: any){
    console.log(result);
    if(result.error){
      alert(result.error.message);
    }
    else{
      // this.router.navigate(['foto'],{relativeTo: this.route});
    }
  }
  //kep kezelese : parameterken kap egy WabcamImage tipust
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    //itt mentjuk a formcontrolnak magat a kepet
    this.cardForm.controls['img'].setValue(webcamImage.imageAsDataUrl);
  }
  //ez figyelheti hogy van e tobb kamera csatlakoztatva
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public triggerSnapshot(): void {
    console.log(this.cardForm.controls['img'].value);
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
