// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md


import { Component, input ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { SelectComponent } from '../select/select.component';
import { InputSpinnerComponent } from '../input-spinner/input-spinner.component';

/**
 * A pagination control component. 
 * Allows users to navigate between pages of data and change the page size.
 * 
 * @example
 * <base-paginator [basePaginator]="true" [pageSizeOptions]="[10, 20, 50]"></base-paginator>
 */
@Component({
  selector: 'base-paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    IconComponent,
    IconButtonDirective,
    SelectComponent,
    InputSpinnerComponent
],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
  /** If true, applies a distinct "base" visual variant. */
  readonly basePaginator = input(false, { transform: booleanAttribute });
  
  /** If true, shows explicit previous/next arrow buttons instead of standard pagination. */
  readonly arrows = input(false, { transform: booleanAttribute });
  
  /** The currently selected number of items per page. */
  readonly itemsPerPage = input<string | number | null>(null);
  
  /** The available options for "items per page" dropdown. Defaults to [10, 25, 50, 100]. */
  readonly pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  
  start = 1;
  end = 125;

  decrease() {
    if (this.start < this.end) {
      this.end--;
      this.start++;
    }
  }

  increase() {
    if (this.start > 1) {
      this.start--;
      this.end++;
    }
  }
}
