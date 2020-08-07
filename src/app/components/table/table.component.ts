import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../../services/http-service.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public serverError: boolean;
  public tableData: Array<any>;

  constructor( private httpService: HTTPService ) { }

  ngOnInit() {
    this.httpService.getData().subscribe( res => {
        this.tableData = res;
    }, (error) => {
      this.serverError = true;
    });
  }

}
