import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GenerateXlsxService } from '../../utils/generateXlsx/generate-xlsx.service';
import { DialogPutSalesComponent } from './dialog-put-sales/dialog-put-sales.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


export interface ISalesHistory {
  storeName: string;
  totalBilled: number | string;
  quantitySold: number;
  date: string;
  hour: string;
  productName: string;
  productImg: string;
  userName: string;
  userRole: string;
  userImg: string;
  id: string;
}

@Component({
  selector: 'app-saleshistory',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent, ...MATERIAL_COMPONENTS, ReactiveFormsModule],
  templateUrl: './saleshistory.component.html',
  styleUrls: ['./saleshistory.component.scss'],
})
export class SaleshistoryComponent implements OnInit {
  salesHistory: ISalesHistory[] = [];

  constructor(
    private readonly httpClient: HttpClient, 
    private readonly formBuilder: FormBuilder,
    private readonly xlsxService: GenerateXlsxService,
    private readonly dialog: MatDialog
  ) { }

  storeId = localStorage.getItem('store_id');

  formFilterDate = this.formBuilder.group({
    store_id: [this.storeId],
    startDate: [''],
    endDate: ['']
  })

  ngOnInit(): void {
    this.loadSales();
  }

  generateExcel(): void {
    this.xlsxService.generateExcel(environment.generateExcelToSales, 'historico-vendas');
  }

  loadSales() {
    this.httpClient
      .get<ISalesHistory[]>(
        `${environment.apiProd}/${environment.salesAll}/${this.storeId}`
      )
      .subscribe({
        next: (response) =>{
          this.salesHistory = response
        }
      })
  }

  openDialogPutSales(saleId: string) {
    const dialogRef = this.dialog.open(DialogPutSalesComponent, {
      width: '400px',
      data: { id: saleId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSales();
      }
    });
  }

  deleteSales(salesId: string) {
    if(confirm('Tem certeza que deseja deletar esta venda? Essa ação não poderá ser desfeita!')) {
    this.httpClient.delete(`${environment.apiProd}/${environment.salesDelete}/${salesId}`)
      .subscribe(() => {
        this.loadSales();
      })
  }
}

  getAllSalesByDate() {
    if(this.formFilterDate.valid){

      const formData = new FormData();
      const formValues = this.formFilterDate.value;
      
      Object.entries(formValues).forEach(([key, value]) => {
        if(value) {
          formData.append(key, value);
        }
      })
      
      this.httpClient
      .post<ISalesHistory[]>(
        `${environment.apiProd}/${environment.salesAllByDate}`, 
        formValues
      )
      .subscribe({
        next: (response:ISalesHistory[]) =>{
          this.salesHistory = response
        }
      })
    }
  }
  
  generatePDF(): void {
    const data = document.querySelector('.pdfLayout') as HTMLElement;

    html2canvas(data, {
      scale: 2,
      useCORS: true,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('historico-vendas.pdf');
    });
  }
}
