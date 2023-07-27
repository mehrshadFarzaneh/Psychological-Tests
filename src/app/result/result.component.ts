import { Component } from '@angular/core';
import { ResultService } from '../services/result.service';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
@Component({
  selector: 'org-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  emoji = "🤗";
  title = "اضطراب نا چیز";
  date = new Date();
  formattedDate = ""

  constructor(public resultService:ResultService) {
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zeros if necessary
    const day = String(this.date.getDate()).padStart(2, '0'); // Pad day with leading zeros if necessary

    // Create the formatted string
     this.formattedDate = `${year}-${month}-${day}`;
  }
  calculatePercentage(currentNumber: number, maxNumber: number): number {
    if (maxNumber <= 0) {
      return 0; // To avoid division by zero or negative maxNumber
    }

    return (currentNumber / maxNumber) * 100;
  }
  getRadialProgressClass(value: number | null): string {
    if (!value && value != 0) return "";
    if (value >= 0 && value <= 4) {
      this.emoji = "🤗";
      this.title = "اضطراب نا چیز";
      return 'text-green-600';
    } else if (value >= 5 && value <= 10) {
      this.emoji = "😇";
      this.title = "مرز اضطراب";
      return 'text-cyan-600';
    } else if (value >= 11 && value <= 20) {
      this.emoji = "🙃";
      this.title = "اضطراب خفیف";
      return 'text-primary';
    } else if (value >= 21 && value <= 30) {
      this.emoji = "😢";
      this.title = "اضطراب متوسط";
      return 'text-yellow-600';
    } else if (value >= 31 && value <= 50) {
      this.emoji = "😱";
      this.title = "اضطراب شدید";
      return 'text-orange-600';
    } else if (value >= 51 && value <= 99) {
      this.emoji = "👎";
      this.title = "اضطراب بسیار زیاد و وحشت";
      return 'text-red-600';
    } else {
      return 'text-white'; // Default class when value is not in any range
    }
  }
  saveImage(){
    const element = document.getElementById('result-page'); // Replace 'result-page' with the ID of your result page container
  if (!element) {
    return;
  }

  // html2canvas(element).then((canvas) => {
  //   // Convert canvas to base64 image data
  //   const imageData = canvas.toDataURL('image/png');

  //   // Save the image using FileSaver.js
  //   saveAs(imageData, 'result.png');
  // });
  let originalDisplay = '';
  const exclude = element.querySelector("button");
  if (exclude){
    originalDisplay = exclude.style.display
    exclude.style.display = 'none';
  }


  domtoimage.toPng(element)
      .then((dataUrl) => {
        // this.capturedImage = dataUrl;
        this.downloadImage(dataUrl);
        if (exclude){
          exclude.style.display = originalDisplay;
        }
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  }
  private downloadImage(dataUrl: string) {
    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = 'captured_image.png';
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
