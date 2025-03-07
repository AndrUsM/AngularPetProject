import { CommonModule } from "@angular/common";
import { Component, Input, signal } from "@angular/core";

import { Recipe } from "@features/recipes/models/recipe";

import { BadgeComponent } from "@shared/components/badge/badge.component";

import { RecipeCardTab } from "./recipe-card-tab.type";
import { RecipeCardTabComponent } from "./recipe-card-tab/recipe-card-tab.component";
import { RecipeCardNavLinkComponent } from "./recipe-card-nav-link/recipe-card-nav-link.component";
import { RecipeCardTabTitleComponent } from "./recipe-card-tab-title/recipe-card-tab-title.component";

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    BadgeComponent,
    RecipeCardTabComponent,
    RecipeCardNavLinkComponent,
    RecipeCardTabTitleComponent,
    CommonModule,
  ],
})
export class RecipeCardComponent {
  @Input({
    required: true,
    alias: 'recipe'
  })
  recipe!: Recipe;

  public activeTab = signal<RecipeCardTab>('general');

  get ingredients(): string[] {
    return this.recipe.ingredients ?? [];
  }

  get instructions(): string[] {
    return this.recipe.instructions ?? [];
  }

  public setActiveTab(tabName: RecipeCardTab) {
    this.activeTab.set(tabName);
  }
}