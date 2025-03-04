import { Component, Input } from "@angular/core";

import { BadgeVariant } from "./types/badge.variant";

import { BADGE_CLASS_BY_VARIANT_MAP } from "./constants/badge.configuration";

@Component({
  selector: 'badge',
  templateUrl: 'badge.component.html',
  standalone: true,
})
export class BadgeComponent {
  @Input('variant') variant: BadgeVariant = 'primary';

  public badgeClass = BADGE_CLASS_BY_VARIANT_MAP[this.variant];
}