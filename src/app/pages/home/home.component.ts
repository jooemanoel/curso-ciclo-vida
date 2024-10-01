import { Component, DoCheck, OnInit } from '@angular/core';
import { ListaDeComprasService } from 'src/app/services/lista-de-compras.service';
import { Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  listaDeCompras!: Array<Item>;
  itemEmEdicao!: Item;
  constructor(private service: ListaDeComprasService) {}
  ngOnInit(): void {
    this.carregarLista();
  }
  ngDoCheck(): void {
    // console.log('Método doCheck - HomeComponent');
  }
  carregarLista() {
    this.service.carregarListaDeCompras().subscribe((lista) => {
      this.listaDeCompras = lista;
    });
  }
  editarItem(item: Item) {
    this.itemEmEdicao = item;
  }
  excluirItem(item: Item) {
    this.service.excluirItem(item);
    this.carregarLista();
  }
}
