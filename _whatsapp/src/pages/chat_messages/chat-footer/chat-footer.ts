import {Component, ViewChild} from '@angular/core';
import {ChatMessageHttpProvider} from "../../../providers/http/chat-message-http";
import {ItemSliding, TextInput} from "ionic-angular";
import Timer from 'easytimer.js/dist/easytimer.min';
import {Media} from '@ionic-native/media';
import {File} from "@ionic-native/file";
import {AudioRecorderProvider} from "../../../providers/audio-recorder/audio-recorder";

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

  @ViewChild('itemSliding')
  itemSliding: ItemSliding;


    constructor(
      private chatMessageHttp: ChatMessageHttpProvider,
      // @ts-ignore
      private audioRecorder: AudioRecorderProvider
  ) {
  }

  onDrag() {
      console.log(this.itemSliding.getSlidingPercent());
      if (this.itemSliding.getSlidingPercent() > 0.9) {
        this.itemSliding.close();
        this.audioRecorder.stopRecorder()
            .then(
                (blob) => console.log('stop recording'),
                error => console.log(error)
            );
      }
  }

  clearRecording() {
      this.timer.stop();
      this.text = '';
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
      this.audioRecorder.startRecord();

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
      this.audioRecorder.stopRecorder()
          .then(
              (blob) => console.log(blob),
              error => console.log(error)
          )
    }
}
