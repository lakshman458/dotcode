import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  loading = true;
  error = null;
  success = false;
  response = { data: [] };
  documents = [];
  filterValues = [
    { label: `Document ID`, key: 'Tenant_ID'},
    { label: `Status`, key: 'status'},
    { label: 'Search', key: 'search'},
  ];
  filterKey = 'Tenant_ID'
  filterValue = ''

  constructor(private api: ApiservicesService,public router :Router) {}

  ngOnInit(): void {
    const payload = {[this.filterKey] :this.filterValue}
    this.api.GetDocuments(payload).subscribe(
      (response) => {
        this.response = { ...this.response, ...response };
        this.loading = false;
        this.documents = this.getRenderedValues(this.response.data)
      },
      (error: ErrorEvent) => {
        console.log('errpr', error);
        this.loading = false;
        this.error = error.error;
        this.success = null;
      }
    );
  }

  getRenderedValues(list: any) { 
    return list.map((document) => {
      const {
        Document_ID = {},
        Tenant_ID = {},
        Scan_ID: scanId = '',
        createdAt,
      } = document;
      const {
        First_Name: name = '',
        Document_ID: docId,
        Nationality: nationality,
        Status: status,
      } = Document_ID;
      const { Name: t_name = '' } = Tenant_ID;
      return {
        list: [
          { label: 'Document ID', value: docId },
          { label: 'Created On', value: createdAt },
          { label: 'Name', value: name },
          { label: 'Tenet', value: t_name },
          { label: 'Scan ID', value: scanId },
          { label: 'Nationality', value: nationality },
          { label: 'Status', value: status },
        ],
      };
    });
  }

  onSelect(key : any) { 
    this.filterKey = key;
    this.filterValue = ''
  }

  onSearch(event : any) { 
    const payLoad = {[this.filterKey] : this.filterValue}
    this.api.GetDocuments(payLoad).subscribe(
      (response) => {
        this.response = { ...this.response, ...response };
        this.loading = false;
        this.documents = this.getRenderedValues(this.response.data)
      },
      (error: ErrorEvent) => {
        this.loading = false;
        this.error = error.error;
        this.success = null;
      })
  }

  onChangeSearchInput(event:any) { 
   const {value} = event.target ;
    this.filterValue = value

  }

  goToDetails(index) {
    
    const {_id} = this.response.data[index];
    this.router.navigate([`/document/${_id}`])
  }
}
