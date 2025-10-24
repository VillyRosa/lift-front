import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { iGoal } from '../interface/goal';
import { Goals } from '../services/goals';
import { iPageableRequest } from '@shared/interfaces/pageable-request';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, TableModule, Tag, ButtonModule, MultiSelectModule, InputTextModule, SelectModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  public goals: iGoal[] = [];
  public selectedGoals = [];
  public loading: boolean = false;
  public totalGoals: number = 0;
  public page: number = 0;

  private goalService = inject(Goals);

  public ngOnInit(): void {
    this.fetchGoals();
  }

  public fetchGoals(ev: any | null = null): void {
    const filters: iPageableRequest = {
      page: ev != null ? (ev.first / ev.rows) : 0
    };

    if (ev !== null && ev.sortField) {
      filters.sort = ev.sortField + ',' + (ev.sortOrder === 1 ? 'asc' : 'desc');
    }

    if (ev !== null && ev.rows) {
      filters.size = ev != null ? ev.rows : 10;
    }

    this.loading = true;
    this.goalService.findAll(filters).subscribe({
      next: (data) => {
        this.goals = data.content;
        this.totalGoals = data.totalElements;
      },
      complete: () => this.loading = false
    });
  }

  public clear(table: Table): void {
    table.clear();
  }

}
