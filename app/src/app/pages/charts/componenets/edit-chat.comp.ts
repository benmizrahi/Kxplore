import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'edit-chart',
    template: `
        <nb-card>
            <nb-card-header>Nebula</nb-card-header>
                <nb-card-body>
                A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
                Originally, nebula was a name for any diffuse astronomical object,
                including galaxies beyond the Milky Way.
                </nb-card-body>
            <nb-card-footer>By Wikipedia</nb-card-footer>
        </nb-card>
    `,
    styles:[`
    `]
})
export class EditChart implements OnInit {
  
    constructor() { }

    ngOnInit(): void { }
}
