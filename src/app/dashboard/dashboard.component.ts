import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 searchText;
 results: any;
 show : boolean = false;

 //pagination
 currentPage: number = 1;
 currentPageCopy: number = 1;
 totalPages: number;
 totalItems: number ;
 pageOffset: number;
 start: number;
 end: number;
  constructor( private apiService : DashboardService) { }

  ngOnInit(): void {
  }

  search(){
    this.start=this.start+1;
    this.currentPage=1;
    this.searchResults();
  }
  

  searchResults(){
    this.results=[];
    this.show=true;
    this.apiService.getAdvancedSearch(this.searchText).subscribe(res => {
      console.log(res)
      this.results=res['items'];
      this.totalItems=res['total'];
      this.start=res['page'];
      this.pageOffset=res['page_size'];
      this.setPageLogic();
      this.lastNumberOfPage();
      
      
    })
   
  }

  lastNumberOfPage() {
    if (this.totalItems >= (this.currentPage * 10)) {
      this.end = this.currentPage * 10;
    } else {
      this.end = this.totalItems;
    }
  }
  setPageLogic() {
    this.totalPages = Math.ceil(this.totalItems / this.pageOffset);
  }

  next(event) {
    // this.hideTable=false;
    // event.stopPropagation();
    // this.start = this.start + this.pageOffset;
    // this.currentPage = +this.currentPage + 1;
    // this.currentPageCopy = +this.currentPage;
    // this.getTableData();
    this.search();
    this.lastNumberOfPage();
  }

  prev(event) {
    // this.hideTable=false;
    event.stopPropagation();
    this.start = this.start - this.pageOffset;
    this.currentPage = +this.currentPage - 1;
    this.currentPageCopy = +this.currentPage;
    this.search();
    this.lastNumberOfPage();
    // this.urlFormatter();
  }

  onGoPage(event) {
    event.stopPropagation();

    let page = this.currentPage;

    if (this.isNumber(page)) {
      if (page >= 1 && page <= this.totalPages) {
        this.start = ((page * this.pageOffset) - this.pageOffset);

        if (this.start == 1) {
          this.start = this.start+1;
        }

        this.currentPageCopy = +this.currentPage;

        // this.getTableData();
        this.search();
      } else {
        this.currentPage = +this.currentPageCopy;
        // this.toastr.warning('Error', 'Invalid page!');

      }

    } else {
      this.currentPage = +this.currentPageCopy;
      // this.toastr.warning('Error', 'Invalid page!');

    }

    this.lastNumberOfPage();
    //this.urlFormatter();

  }

  isNumber(text) {
    return /^\d+$/.test(text);
  }

}
