import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { EntityQueryParams } from "@core/models/entity-query-params";

import { Recipe } from "@features/recipes/models/recipe";

import { parseObjectToQueryParams } from "@shared/utils/parse-object-to-query-params";

import { RecipesResponse } from "./types/recipes-response";

@Injectable()
export class RecipesService {
  private httpClient = inject(HttpClient);

  constructor() {

  }

  public getById(id: string): Observable<Recipe | null> {
    return this.httpClient.get<Recipe>(`api/recipes/${id}`)
      .pipe(map((recipe) => recipe ?? null))
  }

  public get(options?: EntityQueryParams): Observable<Recipe[]> {
    const params = parseObjectToQueryParams(options);

    return this.httpClient.get<RecipesResponse>('api/recipes', {
      params
    })
      .pipe(map(({ recipes }) => recipes ?? []));
  }

  public tags(): Observable<string[]> {
    return this.httpClient.get<string[]>('api/recipes/tags')
      .pipe(map((tags) => tags ?? []));
  }

  public productByTags(tagName: string): Observable<Recipe[]> {
    return this.httpClient.get<RecipesResponse>(`api/recipes/tag/${tagName}`)
      .pipe(map(({recipes}) => recipes ?? []));
  }

  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>('api/recipes/add', recipe);
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    const {id, ...recipeForUpdating} = recipe;

    return this.httpClient.put<Recipe>(`api/recipes/${id}`, recipeForUpdating);
  }
}