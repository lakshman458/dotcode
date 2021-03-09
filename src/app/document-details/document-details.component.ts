import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  public imageURL: string = environment.imageUrl

  loading = true;
  error = null;
  success = false;
  response = {data : []}
  document = {}
  id = ''

  constructor(private api: ApiservicesService,private router: ActivatedRoute) { }

  ngOnInit(): void {
      this.router.params.subscribe(param => { 
        let  {id} = param;
        this.id= id
      })

      this.api.GetDocumentDetails(this.id).subscribe(
        (response) => { 
         this.success = true;
         this.loading = false;
         this.response = {...this.response,...response};
         this.document = this.response.data[0];
        },
        (error:ErrorEvent) => {
          this.loading = false
          this.error = error;
        }
      )

  }

}
