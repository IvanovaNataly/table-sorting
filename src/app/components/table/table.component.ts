import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../../services/http-service.service';
import { ProductProperties } from '../../enums/productProp';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public serverError: boolean;
  public tableData: Array<any>;
  public sortValue: ProductProperties;
  public filterValue: FormControl;
  public filteredTable: any;

  constructor( private httpService: HTTPService ) { }

  ngOnInit() {
    this.filterValue = new FormControl('');
    this.httpService.getData().subscribe( res => {
      this.tableData = res;
      this.filteredTable = JSON.parse(JSON.stringify(this.tableData));
      this.filterValue.valueChanges.subscribe(value => this.filterTable(value));
    }, (error) => {
      this.serverError = true;
    });
  }

  filterTable(value: string) {
    this.filteredTable = this.tableData.filter(line => {
      let filteredLine: any;
      Object.keys(line).forEach(key => {
        if (line[key].toLowerCase().includes(value.toLowerCase())) filteredLine = line;
      });
      return filteredLine;
    });
  }

  sortTable(ascending: boolean, propKey: ProductProperties) {
    this.sortValue = propKey;
    if (propKey === ProductProperties.ProductId ||
      propKey === ProductProperties.CatId ||
      propKey === ProductProperties.ProductSize) {
      this.filteredTable.sort( this.compareNumeric.bind(this) );
    } else {
      this.filteredTable.sort( this.compareString.bind(this) );
    }
    if (!ascending) {
      this.filteredTable.reverse();
    }
  }

  compareString( a, b ) {
    if ( a[this.sortValue] < b[this.sortValue] ){
      return -1;
    }
    if ( a[this.sortValue] > b[this.sortValue] ){
      return 1;
    }
    return 0;
  }

  compareNumeric( a, b ) {
    return a[this.sortValue] - b[this.sortValue];
  }

}
