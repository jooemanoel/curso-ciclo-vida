import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../shared/interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ListaDeComprasService {
  private listaDeCompras: Item[] = [];
  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
  }
  salvarListaDeCompras() {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.listaDeCompras));
  }
  carregarListaDeCompras(): Observable<Item[]> {
    this.listaDeCompras = JSON.parse(
      localStorage.getItem('listaDeCompras') || '[]'
    );
    return of(this.listaDeCompras);
  }
  adicionarItem(nomeDoItem: string): Observable<Item> {
    const id = this.listaDeCompras.length + 1;
    const item: Item = {
      id: id,
      nome: nomeDoItem,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false,
    };
    this.listaDeCompras.push(item);
    this.salvarListaDeCompras();
    return of(item);
  }
  editarItem(itemParaEdicao: Item): Observable<Item> {
    this.listaDeCompras.splice(
      Number(itemParaEdicao.id) - 1,
      1,
      itemParaEdicao
    );
    this.salvarListaDeCompras();
    return of(itemParaEdicao);
  }
  excluirItem(itemParaExclusao: Item) {
    const index = this.listaDeCompras.findIndex(
      (item) => item.id === itemParaExclusao.id
    );
    this.listaDeCompras.splice(index, 1);
    this.salvarListaDeCompras();
  }
}
