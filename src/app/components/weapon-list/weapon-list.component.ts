import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EldenRingService } from 'src/app/services/elden-ring.service';

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

  constructor(private eldenRingService: EldenRingService) {}

  ngOnInit(): void {
    this.eldenRingService.getWeapons(100).subscribe((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;

      // Adiciona filtro customizado que verifica campos aninhados
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
