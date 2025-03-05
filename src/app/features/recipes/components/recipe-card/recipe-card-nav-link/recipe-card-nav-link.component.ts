import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'recipe-card-nav-link',
  standalone: true,
  templateUrl: './recipe-card-nav-link.component.html',
})
export class RecipeCardNavLinkComponent {
  @Output() navigate = new EventEmitter()
  @Input() tabName!: string;
}