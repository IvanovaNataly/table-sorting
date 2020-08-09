import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../../services/http-service.service';
import { ProductProperties } from '../../enums/productProp';
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/internal/operators";

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
  public filter: string;

  constructor( private httpService: HTTPService ) { }

  ngOnInit() {
    this.filterValue = new FormControl('');
    this.httpService.getData().subscribe( res => {
      this.tableData = res;
      this.filteredTable = JSON.parse(JSON.stringify(this.tableData));
      // console.log(this.filteredTable);
      // this.filterValue.valueChanges.subscribe(val => console.log(val));
      // console.log(this.filteredTable);
    }, (error) => {
      this.serverError = true;
    });
  }

  filterTable() {
    this.filteredTable = this.tableData.filter(line => {
      let filteredLine: any;
      Object.keys(line).forEach(key => {
        if (line[key].toLowerCase().includes(this.filter)) filteredLine = line;
      });
      return filteredLine;
    });
  }

  _filter(value: string) {
    // const filterValue = value.toLowerCase();
    // return this.tableData.filter(option => option.item.toLowerCase().includes(filterValue));
    return this.tableData.filter(option => {return option});
  }

  sortTable(ascending: boolean, propKey: ProductProperties) {
    this.sortValue = propKey;
    if (propKey === ProductProperties.ProductId ||
      propKey === ProductProperties.CatId ||
      propKey === ProductProperties.ProductSize) {
      this.tableData.sort( this.compareNumeric.bind(this) );
    } else {
      this.tableData.sort( this.compareString.bind(this) );
    }
    if (!ascending) {
      this.tableData.reverse();
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
