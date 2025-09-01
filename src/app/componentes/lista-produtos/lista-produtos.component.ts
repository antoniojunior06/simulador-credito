import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../types/produto';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatInputModule, MatIconModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'taxaAnual', 'prazoMaximo'];
  dataSource = new MatTableDataSource<Produto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.listar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listar() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.paginator._intl.itemsPerPageLabel = ''
        this.dataSource.data = produtos;
      },
      error: (err) => {
        console.error('Erro ao listar produtos', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
