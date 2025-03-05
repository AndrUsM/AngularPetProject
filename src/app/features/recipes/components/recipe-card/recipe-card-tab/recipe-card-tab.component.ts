import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'recipe-card-tab',
  templateUrl: './recipe-card-tab.component.html',
  standalone: true,
  imports: [
    NgIf
  ]
})
export class RecipeCardTabComponent {
  @Input({
    required: true,
  }) isActive!: boolean;
}