import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

export interface MyFile {
  file: File,
  progress: number
}

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  @Input() postUrl: string;
  @Output() onUploadFinished = new EventEmitter();
  images: string[] = [];
  private subs = new SubSink();
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() { }

  async loadImageFromDevice(event) {
    console.log(event.target.files)
    let files = event.target.files
    for (let file of files) {
      let myFile: MyFile = {
        file: file,
        progress: 0
      }
      const formData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders({
        'documentType': file.name.split('.').pop()!
      });

      this.uploadRequest(headers, '', formData, myFile);

      const reader = new FileReader();

      // reader.onload = () => {//async code, will take a while
      //   this.croppedImage = reader.result as string;
      // };
      reader.readAsDataURL(file);

      // reader.readAsArrayBuffer(file);

      reader.onload = () => {
        this.images.push(reader.result as string);
        console.log(this.images)
      };
    }


    // reader.onerror = (error) => {

    //   //handle errors

    // };
  };

  uploadRequest(headers: HttpHeaders, endpointExtras: string, formData: FormData, myFile: MyFile) {
    this.subs.sink = this.http.post(environment.apiUrl + this.postUrl + endpointExtras, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event)
        if (event.type === HttpEventType.UploadProgress) {
          myFile.progress = Math.round(100 * event.loaded / event.total!);
        }
        else if (event.type === HttpEventType.Response) {
          this.onUploadFinished.emit({ filePath: event.body });
        } else {
        }
      }, err => {
        console.log(err)
      });
  }

}
