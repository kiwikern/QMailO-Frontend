import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

  navigator: any = navigator;

  constructor() {
  }

  isWebShareApiAvailable() {
    return  this.navigator && this.navigator.share;
  }

  shareViaWebApi(title, text, url) {
    if (this.isWebShareApiAvailable()) {
      this.navigator.share({title, text, url});
    }
  }

  copyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.textContent = text;
    document.body.appendChild(textArea);
    textArea.select();
    let wasSuccessful;
    try {
      wasSuccessful = document.execCommand('copy');
    } catch (error) {
      console.warn('copy failed', error);
      wasSuccessful = false;
    } finally {
      document.body.removeChild(textArea);
    }
    return wasSuccessful;
  }

}
