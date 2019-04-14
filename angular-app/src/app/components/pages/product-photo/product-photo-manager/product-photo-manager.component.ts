import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductPhoto} from "../../../../model";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductPhotoEditModalComponent} from "../product-photo-edit-modal/product-photo-edit-modal.component";

declare const $;

@Component({
  selector: 'product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  product: Product = null;
  productId: number;

  @ViewChild(ProductPhotoEditModalComponent)
  editModal: ProductPhotoEditModalComponent;

  constructor(
      private productPhotoHttp: ProductPhotoHttpService,
      private route: ActivatedRoute,
      private notifyMessage: NotifyMessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getPhotos();
      this.configFancyBox();
    })
  }

  onInsertSuccess(data: {photos: ProductPhoto[]}) {
      this.photos.push(...data.photos);
      this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso.');
  }

   getPhotos() {
      this.productPhotoHttp.list(this.productId)
          .subscribe(data => {
            this.photos = data.photos;
            this.product = data.product;
          })
   }

    configFancyBox() {
        $.fancybox.defaults.btnTpl.edit = `
        <a class="fancybox-button" data-fancybox-edit title="Substituir foto" href="javascript:void(0)" style="text-align: center">
            <i class="fas fa-edit"></i>
        </a>
        `;
        $.fancybox.defaults.buttons = ['download', 'edit', 'zoom', 'slideshow', 'fuulscreen', 'thumbs', 'close'];
        $('body').on('click', '[data-fancybox-edit]', (e) => {
            this.editModal.showModal();
        });
  }
}
