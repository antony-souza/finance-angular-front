import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GenerateXlsxService } from '../../utils/generateXlsx/generate-xlsx.service';


interface ISalesHistory {
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
}

@Component({
  selector: 'app-saleshistory',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent, ...MATERIAL_COMPONENTS],
  templateUrl: './saleshistory.component.html',
  styleUrls: ['./saleshistory.component.scss'],
})
export class SaleshistoryComponent implements OnInit {
  salesHistory: ISalesHistory[] = [];

  constructor(
    private readonly httpClient: HttpClient, 
    private readonly xlsxService: GenerateXlsxService) { }

  storeId = localStorage.getItem('store_id');

  ngOnInit(): void {
    this.httpClient
      .get<ISalesHistory[]>(
        `${environment.apiProd}/${environment.salesAll}/${this.storeId}`
      )
      .subscribe((response) => {
        this.salesHistory = response
      });
  }

  generateExcel(): void {
    this.xlsxService.generateExcel(environment.generateExcelToSales, 'historico-vendas');
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
