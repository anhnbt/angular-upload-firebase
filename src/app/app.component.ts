import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-upload-firebase';
  formData!: FormGroup;
  uploadPercent$: Observable<number | undefined> = new Observable<number | undefined>();
  downloadURL$: Observable<string> = new Observable<string>();
  isLoading = false;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.fb.group({
      file: [null, [Validators.required]]
    });
  }

  uploadFile(event: any): void {
    this.isLoading = true;
    if (event.target.files && event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      const filePath = `uploads/${Date.now()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent$ = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL$ = fileRef.getDownloadURL();
          fileRef.getDownloadURL().subscribe(url => {
            this.isLoading = false;
            this.file?.setValue(url);
          });
        })
      ).subscribe();
    } else {
      // File không được để trống
    }
  }

  get file(): AbstractControl | null {
    return this.formData.get('file');
  }

  onSubmit(): void {
    console.log(this.formData.value);
    if (this.formData.invalid) {
      alert('Vui lòng nhập các trường đánh dấu *');
      return;
    }
  }
}
