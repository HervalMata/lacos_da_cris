import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfileHttpService} from "../../../../services/http/user-profile-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    form: FormGroup;
    errors = {};

  constructor(
      private formBuilder: FormBuilder,
      private userProfileHttp: UserProfileHttpService,
      private notifyMessage: NotifyMessageService
  ) {
      this.form = this.formBuilder.group({
          name: ['', Validators.maxLength(255)],
          email: ['', Validators.maxLength(255), Validators.email],
          password: ['', Validators.minLength(4), Validators.maxLength(16)],
          phone_number: null,
          photo: false
      });
  }

  ngOnInit() {
  }

    submit() {
        this.userProfileHttp.update(this.form.value)
            .subscribe((data) =>
                this.notifyMessage.success('Perfil atualizado com sucesso!'),
                    (responseError) => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors
                }
            });
        return false;
    }

    onChoosePhoto(files: FileList) {
      if (!files.length) {
        return;
      }
      this.form.get('photo').setValue(files[0]);
    }


    showErrors() {
        return Object.keys(this.errors).length != 0;
    }

}
