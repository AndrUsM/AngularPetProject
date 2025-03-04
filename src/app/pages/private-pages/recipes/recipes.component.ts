import { NgFor, NgIf } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { RecipeCardComponent } from "@features/recipes/components/recipe-card/recipe-card.component";

import { Recipe } from "@features/recipes/models/recipe";
import { RecipesService } from "@features/recipes/services/recipes-service/recipes-service";

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgFor,
    NgIf,
  ],
  providers: [
    RecipesService
  ]
})
export class RecipesComponent {
  private recipesService = inject(RecipesService);

  public recipes = signal<Recipe[]>([]);

  constructor() {
    this.recipesService.get({
      limit: 5,
    }).subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
      }
    })
  }

  public trackRecipeListItem(index: number, recipe: Recipe) {
    return recipe.id;
  }
}