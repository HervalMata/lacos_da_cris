import {Component, ViewChild} from '@angular/core';
import {ChatMessageHttpProvider} from "../../../providers/http/chat-message-http";
import {TextInput} from "ionic-angular";
import Timer from 'easytimer.js/dist/easytimer.min';
import {Media} from '@ionic-native/media';
import {File} from "@ionic-native/file";

let component = Component({
    selector: 'chat-footer',
    templateUrl: 'chat-footer.html'
});

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
// @ts-ignore
@component
export class ChatFooterComponent {

  text: string = '';
  messageType = 'text';
  timer = new Timer();

  @ViewChild('inputFileImage')
  inputFileImage: TextInput;


    constructor(
      private chatMessageHttp: ChatMessageHttpProvider,
      // @ts-ignore
      private media: Media,
      private file: File
  ) {
  }

  sendMessage(data: {content, type}) {
    this.chatMessageHttp.create(1, data)
        .subscribe(() => {
          console.log('enviou');
        })
  }

  sendMessageText() {
    this.sendMessage({content: this.text, type: 'text'});
  }

  sendMessageImage(files: FileList) {
    if (!files.length) {
      return;
    }

      this.sendMessage({content: files[0], type: 'image'});
  }

  selectImage() {
    const nativeElement = this.inputFileImage.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

    getIconSendMessage() {
        if (this.messageType === 'text') {
            return this.text === '' ? 'mic' : 'send';
        }

        return 'mic';
    }

    holdAudioButton() {
      const recorder = this.media.create('recording.aac');
      recorder.startRecord();

      setTimeout(() => {
        recorder.stopRecord();
        recorder.play();
      }, 5000);

      this.timer.start({precision: 'seconds'});
      this.timer.addEventListener('secondsUpdated', (s) => {
        const time = this.getMinuteSeconds();

        this.text = `${time} Gravando...`;
      })
    }

    private getMinuteSeconds() {
      return this.timer.getTimeValues().toString().substring(3);
    }

    releaseAudioButton() {
      this.timer.stop();
      this.text = '';
    }
}
