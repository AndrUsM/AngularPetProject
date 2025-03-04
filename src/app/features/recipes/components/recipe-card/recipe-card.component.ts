import { CommonModule } from "@angular/common";
import { Component, Input, input, OnInit, signal } from "@angular/core";

import { Recipe } from "@features/recipes/models/recipe";
import { BadgeComponent } from "@shared/components/badge/badge.component";

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    BadgeComponent,
    CommonModule,
  ],
})
export class RecipeCardComponent implements OnInit {
  @Input({
    required: true,
    alias: 'recipe'
  })
  recipe!: Recipe;

  public activeTab = signal<string>('general');

  public generalTabId = signal<string | null>(null);
  public tabTarget = signal<string | null>(null);


  ngOnInit() {
    this.generalTabId.set(`recipe-card-tab-${this.recipe?.id}`);
    this.tabTarget.set(`general-tab-${this.recipe?.id}`);
  }

  public setActiveTab(tabName: string) {
    this.activeTab.set(tabName);
  }

}