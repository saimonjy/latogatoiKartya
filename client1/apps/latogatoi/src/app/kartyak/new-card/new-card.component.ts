import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { DbServiceService } from '../../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'client1-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public id: String;
  public cardForm = new FormGroup({
    vezeteknev: new FormControl(null),
    keresztnev: new FormControl(null),
    rendfokozat: new FormControl(null),
    img: new FormControl(null),
  });
  public fotoKeszites = false;
  public trigger = new Subject<void>();
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public nextWebcam = new Subject<boolean | string>();
  public deviceId: string;
  public errors: WebcamInitError[] = [];

  constructor(
    private dbService: DbServiceService, 
    private route: ActivatedRoute, 
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.subscription.add(this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.subscription.add(this.dbService.get(this.id).subscribe((result) => {
          this.cardForm.setValue({
            vezeteknev: result[0].vezeteknev,
            keresztnev: result[0].keresztnev,
            rendfokozat: result[0].rendfokozat,
            img: result[0].img,
          });
        }));
      }
    }));
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit(): void {
    if (!this.id) {
      this.subscription.add(this.dbService.save(this.cardForm).subscribe((result) => {
        this.handleRequest(result);
      }));
    }
    else {
      this.subscription.add(this.dbService.update(this.id, this.cardForm).subscribe((result) => {
        this.handleRequest(result);
      }));
    }
  }

  public handleRequest(result: any) {
    if (result.error) {
      alert(result.error.message);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.cardForm.controls['img'].setValue(webcamImage.imageAsDataUrl);
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
