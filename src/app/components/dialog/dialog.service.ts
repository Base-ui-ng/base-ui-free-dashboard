// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  inject,
  createComponent,
  EnvironmentInjector,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { DialogContainer } from './dialog-container';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogContext } from './dialog-context';

/**
 * A service for dynamically rendering and managing dialogs/modals.
 * SSR-safe: `open()` is a no-op on the server and returns `of(undefined)`.
 * Overlay hosts are appended via injected `DOCUMENT`.
 *
 * @example
 * private readonly dialog = inject(DialogService);
 *
 * openMyModal() {
 *   this.dialog.open<UserData, ConfirmResult>(MyCustomModalComponent, { user: this.user })
 *     .subscribe(result => {
 *       console.log('Dialog closed with:', result);
 *     });
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogBehaviour: Subject<unknown> = new Subject();
  
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private environmentInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Opens a component dynamically inside a dialog container.
   * On the server this returns `of(undefined)` and does not touch the DOM.
   *
   * @param type The Angular component class to render inside the dialog.
   * @param data Optional data to pass to the component. Injected via DialogContext.
   * @param className Optional CSS classes to apply to the dialog container wrapper.
   * @param options Configuration options for the dialog behavior (e.g. hideOnBackdropClick).
   * @returns An Observable that emits the result once, when the dialog is closed.
   * @example
   * this.dialog.open(ConfirmDialog).subscribe((ok) => { if (ok) save(); });
   */
  open<TData = unknown, TResult = TData>(
    type: Type<unknown>,
    data?: TData,
    className?: string,
    options: { hideOnBackdropClick?: boolean; containerType?: Type<DialogContainer> } = {}
  ): Observable<TResult | undefined> {
    if (!this.isBrowser) {
      return of(undefined);
    }

    const dialogResult = new Subject<TResult | undefined>();
    const finalOptions = {
      hideOnBackdropClick: true,
      containerType: DialogContainerComponent,
      ...options
    };

    const containerRef = this.createContainer(finalOptions.containerType);
    containerRef.instance.className = className || '';
    containerRef.changeDetectorRef.detectChanges();

    this.appRef.tick();

    const dialogContext = new DialogContext<TData, TResult>(containerRef);
    dialogContext.data = data;
    
    if (finalOptions.hideOnBackdropClick !== false) {
      containerRef.instance.context = dialogContext as DialogContext<unknown, unknown>;
      containerRef.changeDetectorRef.detectChanges();
    }

    const dialogInjector = Injector.create({
      providers: [{ provide: DialogContext, useValue: dialogContext }],
      parent: containerRef.instance.container().injector
    });

    const componentRef = containerRef.instance.container().createComponent(type, {
      index: 0,
      injector: dialogInjector
    });

    dialogContext.promise(containerRef, this.appRef).then(result => {
      dialogResult.next(result);
      dialogResult.complete();
    });
    
    containerRef.changeDetectorRef.detectChanges();

    return dialogResult.asObservable();
  }

  private createContainer(containerType: Type<DialogContainer>): ComponentRef<DialogContainer> {
    const componentRef = createComponent(containerType, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector
    });

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);
    
    return componentRef;
  }
}
