import { AuthService } from '../auth/auth.service';
import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class S3ManagerService {
  private s3: any;

  constructor(private authService: AuthService) {
  }

  uploadFile(filename: string, content: string) {
    // return this.authService.initAwsCredentials().switchMap(
    //   () => Observable.create((observer: Observer<void>) => {
    //     this.s3 = new AWS.S3({
    //       apiVersion: '2006-03-01',
    //       params: { Bucket: 'league-manager' }
    //     });
    //     this.s3.upload({
    //       Key: filename,
    //       Body: content
    //     }, function (error, data) {
    //       if (error) {
    //         observer.error('There was an error uploading your file: ' + error.message);
    //       } else {
    //         console.log('Successfully uploaded file ' + filename);
    //         observer.complete();
    //       }
    //     });
    //   })
    // );
    return null;
  }

  downloadFile(filename: string) {
    return Observable.combineLatest(
      this.authService.user$,
      Observable.create((observer: Observer<void>) => {
        this.s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: { Bucket: 'league-manager' }
        });
        this.s3.getObject({
          Key: filename
        }, function (error, data) {
          if (error) {
            observer.error('There was an error downloading your file: ' + error.message);
          } else {
            console.log('Successfully downloaded file ' + filename);
            observer.next(data.Body.toString());
            observer.complete();
          }
        });
      }),
      (a, b) => b
    );
  }
}
