import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/ofertas.module'
import { CarrinhoService } from '../carrinho.service';

@Component({
    selector: 'app-oferta',
    templateUrl: './oferta.component.html',
    styleUrls: ['./oferta.component.css'],
    providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

    public oferta: Oferta

    constructor(
        private route: ActivatedRoute,
        private ofertasService: OfertasService,
        private carrinhoService: CarrinhoService
        ) { }

        ngOnInit() {

            this.route.params.subscribe(() => {
                this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
                .then(( oferta: Oferta) => {
                    this.oferta = oferta
                })
            })
        }

        public adicionarItemCarrinho(): void {
            this.carrinhoService.incluirItem(this.oferta)
        }

    }
