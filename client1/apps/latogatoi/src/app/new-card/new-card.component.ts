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
  // subscription egy valtozo aminek a tipusa Subscription. ehhez a valtozohoz hozza tudom addni az'.add.'-al az osszes feliratkozast
  //amirol egyben le tudok iratkozni
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
  showWebcam = true;
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
    // this.subscription.add(this.route.paramMap.subscribe((params)=>{
    //   this.id = params.get('id');
    //   console.log(params.get('id'));
    // }));
  }
  ngOnDestroy(): void {
    console.log('newCardComponent destroy');
    // minden feliratkozasrol egyben leiratkozom
    // this.subscription.unsubscribe();
    if(this.saveSubscription){
      this.saveSubscription.unsubscribe();
    }
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe();

    }
    if(this.idSubscription){
      this.idSubscription.unsubscribe();
    }
    
  }
  onSubmit(): void {
    if(!this.id){
      // feliratkozom
      
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
      this.router.navigate(['foto'],{relativeTo: this.route});
    }
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.cardForm.controls['img'].setValue(webcamImage.imageAsDataUrl);
  }
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
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  
}
