import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../types/produto';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatInputModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'taxaAnual', 'prazoMaximo', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<Produto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {

    this.listar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
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

  editar(id: number) {
    this.router.navigate(['/cadastro-produto', id]);
  }

  excluir(id: number) {
    this.produtoService.excluir(id).subscribe(() => {
      this.listar();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
