import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

import { Role } from "@core/models/user-dto";
import { UserService } from "@core/services/user-service/user-service";
import { isAuthorized } from "@core/utils/is-authorized";

@Directive({
  selector: '[hasAccess]',
  standalone: true,
})
export class HasAccessDirective {
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
  ) { }

  @Input() set hasAccess(roles: Role[]) {
    const roleFromUser = this.userService.getBaseUser()?.role;

    if (isAuthorized() && roleFromUser &&  roles.includes(roleFromUser)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }
}