import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/ofertas.module'
import { Observable, Subject, of} from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-topo',
    templateUrl: './topo.component.html',
    styleUrls: ['./topo.component.css'],
    providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

    public ofertas: Observable<Oferta[]>

    private subjectPesquisa: Subject<string> = new Subject<string>()

    constructor(private ofertasService: OfertasService) { }

    ngOnInit() {
        this.ofertas = this.subjectPesquisa.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((termoDaBusca: string) => {
                if(termoDaBusca.trim() === '') {
                    return of<Oferta[]>([])
                }
                return this.ofertasService.pesquisaOfertas(termoDaBusca)
            }),
            catchError((erro: any) => {
                console.log(erro);
                return of<Oferta[]>([])
            })
        )

        // this.ofertas.subscribe((ofertas: Oferta[]) => { // async no pipe é igual ao subscribe
        //         this.ofertas2 = ofertas
        //     }
        // )
    }

    public pesquisa(termoDaBusca: string): void {
        this.subjectPesquisa.next(termoDaBusca)
    }

    public limpaPesquisa() :void {
        this.subjectPesquisa.next('')
    }

}
