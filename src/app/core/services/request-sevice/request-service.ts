import { Injectable, resource, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://dummyjson.com/';
  private trigger = signal<void>(undefined);

  public fetch<T>(url: string) {
    return resource({
      request: this.trigger,
      loader: async () => {
        const requestUrl = this.composeUrl(url);
        const response = await fetch(requestUrl);

        if (!response.ok) {
          return null;
        }


        const responseBody = await response.json();
        return responseBody as T;
      }
    })
  }

  private composeUrl(url: string): string {
    return `${this.apiUrl}/${url}`
  }
}