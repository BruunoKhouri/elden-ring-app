import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EldenRingService } from 'src/app/services/elden-ring.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'weight', 'expand'];
  dataSource = new MatTableDataSource<any>([]);
  expandedElement: any | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eldenRingService: EldenRingService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('pt'); // Define o idioma padrão

    this.eldenRingService.getWeapons(100).subscribe((response) => {
      const translatedData = response.data.map((weapon: any) => ({
        ...weapon,
        category: this.translate.instant('CATEGORIES.' + weapon.category) || weapon.category,
        requiredAttributes: weapon.requiredAttributes?.map((attr: any) => ({
          ...attr,
          name: this.translate.instant('ATTRIBUTES.' + attr.name) || attr.name
        })),
        scalesWith: weapon.scalesWith?.map((scale: any) => ({
          ...scale,
          name: this.translate.instant('ATTRIBUTES.' + scale.name) || scale.name
        })),
        attack: weapon.attack?.map((atk: any) => ({
          ...atk,
          name: this.translate.instant('ATTRIBUTES.' + atk.name) || atk.name
        })),
        defence: weapon.defence?.map((def: any) => ({
          ...def,
          name: this.translate.instant('ATTRIBUTES.' + def.name) || def.name
        }))
      }));

      this.dataSource.data = translatedData;
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (weapon, filter: string) => {
        const textToSearch = [
          weapon.name,
          weapon.category,
          weapon.weight?.toString(),
          weapon.description,
          ...(weapon.requiredAttributes?.map((attr: any) => `${attr.name} ${attr.amount}`) || []),
          ...(weapon.scalesWith?.map((scale: any) => `${scale.name} ${scale.scaling}`) || []),
          ...(weapon.attack?.map((atk: any) => `${atk.name} ${atk.amount}`) || []),
          ...(weapon.defence?.map((def: any) => `${def.name} ${def.amount}`) || [])
        ].join(' ').toLowerCase();

        return textToSearch.includes(filter);
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
