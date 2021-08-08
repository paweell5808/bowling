import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  @Output() onFileLoad: EventEmitter<string> = new EventEmitter<string>();

  public onChange(event: any): void {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.onFileLoad.emit(fileReader.result as string);
    };
    fileReader.readAsText(file);
  }

}
