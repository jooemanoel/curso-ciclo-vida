import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListaDeComprasService } from 'src/app/services/lista-de-compras.service';
import { Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnChanges {
  @Input() itemEmEdicao!: Item;
  nomeItem = '';
  editando = false;
  constructor(private service: ListaDeComprasService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemEmEdicao'].firstChange) {
      this.nomeItem = this.itemEmEdicao?.nome;
      this.editando = true;
    }
  }
  adicionarItem() {
    if (this.editando) {
      this.itemEmEdicao.nome = this.nomeItem;
      this.service.editarItem(this.itemEmEdicao).subscribe(() => {
        this.limparInput();
        this.editando = false;
      });
    } else {
      this.service.adicionarItem(this.nomeItem).subscribe(() => {
        this.limparInput();
      });
    }
  }
  limparInput() {
    this.nomeItem = '';
  }
}
