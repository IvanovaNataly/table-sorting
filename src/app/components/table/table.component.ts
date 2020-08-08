import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../../services/http-service.service";
import { ProductProperties } from '../../enums/productProp';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public serverError: boolean;
  public tableData: Array<any>;
  public sortValue: ProductProperties;

  constructor( private httpService: HTTPService ) { }

  ngOnInit() {
    this.httpService.getData().subscribe( res => {
        this.tableData = res;
    }, (error) => {
      this.serverError = true;
    });
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
