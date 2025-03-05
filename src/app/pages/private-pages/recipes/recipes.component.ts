import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { EntitySort } from "@core/models/entity-query-params";
import { RecipeCardComponent } from "@features/recipes/components/recipe-card/recipe-card.component";

import { Recipe } from "@features/recipes/models/recipe";
import { RecipesService } from "@features/recipes/services/recipes-service/recipes-service";
import { delay, interval, Subject, takeUntil, throttle } from "rxjs";

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgFor,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [
    RecipesService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnDestroy {
  private recipesService = inject(RecipesService);
  private ngUnsubscribe = new Subject<void>();

  public recipes = signal<Recipe[]>([]);
  public recipesQueryParamsForm = new FormGroup({
    sortOrder: new FormControl<EntitySort | undefined>(undefined),
    sortBy: new FormControl<string | undefined>(undefined),
    searchText: new FormControl<string | undefined>(undefined),
  });
  public isSearch = Boolean(this.paramsValue.searchText);
  public isLoading = signal<boolean>(false);

  constructor() {
    this.fetchRecipes();

    this.recipesQueryParamsForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        throttle(() => interval(1000))
      )
      .subscribe({
        next: () => {
          this.fetchRecipes();
        }
      })
  }

  get paramsValue() {
    return this.recipesQueryParamsForm.value;
  }

  public trackRecipeListItem(index: number, recipe: Recipe) {
    return recipe.id;
  }

  private fetchRecipes(): void {
    this.isLoading.set(true);
    this.recipesService.get({
      limit: 5,
      order: this.paramsValue.sortOrder ?? undefined,
      sortBy: this.paramsValue.sortBy ?? undefined,
      q: this.paramsValue.searchText ?? undefined,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (recipes) => {
          this.recipes.set(recipes);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }
}