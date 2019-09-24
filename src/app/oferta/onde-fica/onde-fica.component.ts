import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { OfertasService } from '../../ofertas.services'

@Component({
    selector: 'app-onde-fica',
    templateUrl: './onde-fica.component.html',
    styleUrls: ['./onde-fica.component.css'],
    providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

    public ondeFica: string = ''

    constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

    ngOnInit() {
        this.route.parent.params.subscribe(() => {
            this.ofertasService.getOndeFicaPorId(this.route.parent.snapshot.params['id'])
            .then((descricao) => {
                this.ondeFica = descricao
            })
        })
    }

}
