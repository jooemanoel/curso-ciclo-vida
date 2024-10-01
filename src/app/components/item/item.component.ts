import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListaDeComprasService } from 'src/app/services/lista-de-compras.service';
import { Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnDestroy {
  @Input() item!: Item;
  @Output() emissaoItemEditar = new EventEmitter();
  @Output() emissaoItemExcluir = new EventEmitter();
  faPen = faPen;
  faTrash = faTrash;
  constructor(private service: ListaDeComprasService) {}
  ngOnDestroy(): void {
    console.log('onDestroy de Item', this.item.id);
  }
  editarItem() {
    this.emissaoItemEditar.emit(this.item);
  }
  excluirItem() {
    this.emissaoItemExcluir.emit(this.item);
  }
  salvarItem() {
    this.service.editarItem(this.item).subscribe();
  }
}
