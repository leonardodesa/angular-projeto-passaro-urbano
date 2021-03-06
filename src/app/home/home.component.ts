import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/ofertas.module'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

    public ofertas: Oferta[]

    constructor(private ofertasService: OfertasService) { }

    ngOnInit() {

        this.ofertasService.getOfertas()
        .then(( ofertas: Oferta[] ) => {
            this.ofertas = ofertas
        })
        .catch(( erro: any ) => {
            console.log(erro)
        })
    }

}
