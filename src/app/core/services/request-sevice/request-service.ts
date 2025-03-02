import { Injectable, resource, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private trigger = signal<void>(undefined);

  public fetch<T>(url: string) {
    return resource({
      request: this.trigger,
      loader: async () => {
        const response = await fetch(url);

        if (!response.ok) {
          return null;
        }


        const responseBody = await response.json();
        return responseBody as T;
      }
    })
  }
}