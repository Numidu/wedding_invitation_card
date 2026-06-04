import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  selectedImage = signal<string | null>(null);

  openImage(image: string) {
    this.selectedImage.set(image);
  }

  closeImage() {
    this.selectedImage.set(null);
  }
}
