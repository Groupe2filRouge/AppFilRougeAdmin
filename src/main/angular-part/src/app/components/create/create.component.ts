import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  profileForm = new FormGroup({
    id: new FormControl(''),
    project: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    branch: new FormControl(''),
    branchName: new FormControl(''),
    s3: new FormControl('', Validators.required),
    bucket: new FormControl('', Validators.required),
    key: new FormControl('', Validators.required),
    secret: new FormControl('', Validators.required),
    channel: new FormControl('', Validators.required),
    token: new FormControl('', Validators.required)
  });

  hide = true;
  title = "Create"

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public myData: any) {
    const info = myData.myData
    if(!!info){
          this.profileForm.controls['id'].setValue(info.id);
          this.profileForm.controls['adress'].setValue(info.gitAdress);
          this.profileForm.controls['branch'].setValue(info.gitBranch);
          this.profileForm.controls['branchName'].setValue(info.gitBranchName);
          this.profileForm.controls['project'].setValue(info.gitProjectName);
          this.profileForm.controls['s3'].setValue(info.s3Adress);   
          this.profileForm.controls['key'].setValue(info.s3Login);
          this.profileForm.controls['bucket'].setValue(info.s3Name);
          this.profileForm.controls['secret'].setValue(info.s3Password);
          this.profileForm.controls['channel'].setValue(info.slackChannel);
          this.profileForm.controls['token'].setValue(info.slackToken);

          this.title = "Update"
          }
  }

    ngOnInit() {
    }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
