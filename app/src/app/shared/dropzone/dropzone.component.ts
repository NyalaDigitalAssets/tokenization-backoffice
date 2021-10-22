import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-dropzone',
    templateUrl: './dropzone.component.html',
})
export class DropzoneComponent {
    @Input() buttonText: string;
    @Input() accept: string;
    @Input() iconMode = false;
    @Output() fileSelected = new EventEmitter<any>();
    @Output() fileRemoved = new EventEmitter<any>();

    filename: string;

    constructor() {}

    openDialogue(input: HTMLElement) {
        input.click();
    }

    fileDragged(files: any[]) {
        if (files && files.length === 1 && files[0]) {
            this.fileSelected.emit(files[0]);
            this.filename = files[0].name;
        } else {
            this.filename = undefined;
        }
    }

    fileChanged(event: any) {
        if (
            event &&
            event.target &&
            event.target.files &&
            event.target.files.length === 1 &&
            event.target.files[0]
        ) {
            this.fileSelected.emit(event.target.files[0]);
            this.filename = event.target.files[0].name;
        } else {
            this.reset();
        }
    }

    reset() {
        this.filename = undefined;
        if (this.fileRemoved) {
            this.fileRemoved.emit();
        }
    }
}
