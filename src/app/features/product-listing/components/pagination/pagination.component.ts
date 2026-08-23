import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems = 0;
  @Input() pageSize = 9;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(): void {
    const totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goTo(page: number): void {
    if (page < 1 || page > this.pages.length || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
  }
}