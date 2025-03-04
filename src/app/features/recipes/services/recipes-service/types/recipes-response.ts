import { EntityListResponse } from "@core/models/entity-list-response";

import { Recipe } from "@features/recipes/models/recipe";

export interface RecipesResponse extends EntityListResponse {
  recipes: Recipe[];
}