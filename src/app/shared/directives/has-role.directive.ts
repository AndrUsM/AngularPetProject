import { Directive, inject, Input, OnInit, signal, TemplateRef, ViewContainerRef } from "@angular/core";

enum Role {
  'USER',
  'SUPERVISOR',
  'ADMIN'
}

@Directive({
  selector: '[hasRole], [hasAdminRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private hasPermissions = signal<boolean>(false, {
    debugName: 'hasPermissions',
  });

  @Input('hasRole') role: Role | undefined = undefined;
  @Input('hasRoleIsAdmin') isAdmin: boolean = false;

  ngOnInit(): void {
    if (!this.hasPermissions()) {
      this.clearTemplate();
    }

    this.drawTemplate()
  }

  private drawTemplate() {
    this.clearTemplate();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}