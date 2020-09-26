import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CalendarioItem {
  name: string;
  id: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CalendarioItem[] = [
  {id: '7:00 - 7:30', name: 'Hydrogen'},
  {id: '7:30 - 8:00', name: 'Helium'},
  {id: '8:00 - 8:30' , name: 'Lithium'},
  {id: '8:30 - 9:00', name: 'Beryllium'},
  {id: '9:00 - 9:30', name: 'Boron'},
  {id: '9:30 - 10:00', name: 'Carbon'},
  {id: '10:00 - 10:30', name: 'Nitrogen'},
  {id: '10:30 - 11:00', name: 'Oxygen'},
  {id: '11:00 - 11:30', name: 'Fluorine'},
  {id: '11:30 - 12:00', name: 'Neon'},
  {id: '12:00 - 12:30', name: 'Sodium'},
  {id: '12:30 - 13:00', name: 'Magnesium'},
  {id: '13:30 - 14:00', name: 'Aluminum'},
  {id: '14:30 - 15:00', name: 'Silicon'},
  {id: '15:00 - 15:30', name: 'Sodium'},
  {id: '15:30 - 16:00', name: 'Magnesium'},
  {id: '16:00 - 16:30', name: 'Aluminum'},
  {id: '16:30 - 17:00', name: 'Silicon'},
  {id: '17:00 - 17:30', name: 'Magnesium'},
  {id: '17:30 - 18:00', name: 'Aluminum'},
  {id: '18:00 - 18:30', name: 'Silicon'},
  {id: '18:30 - 19:00', name: 'Magnesium'},
  {id: '19:00 - 19:30', name: 'Aluminum'},
  {id: '19:30 - 20:00', name: 'Silicon'},
];

/**
 * Data source for the Calendario view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CalendarioDataSource extends DataSource<CalendarioItem> {
  data: CalendarioItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CalendarioItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CalendarioItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CalendarioItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
