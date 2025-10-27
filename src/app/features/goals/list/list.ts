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
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, TableModule, Tag, ButtonModule, MultiSelectModule, InputTextModule, SelectModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  public goals: iGoal[] = [];
  public selectedGoals: iGoal[] = [];
  public loading: boolean = false;
  public totalGoals: number = 0;
  public page: number = 0;

  private goalService = inject(Goals);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  public ngOnInit(): void {
    this.fetchGoals();
  }

  public fetchGoals(ev: any | null = null): void {
    const filters: iPageableRequest = {
      page: ev != null ? (ev.first / ev.rows) : 0,
      size: ev != null ? ev.rows : 10
    };

    if (ev !== null && ev.sortField) {
      filters.sort = ev.sortField + ',' + (ev.sortOrder === 1 ? 'asc' : 'desc');
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

  public deleteSelectedGoals(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected goals?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        variant: 'text'
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'Yes'
      },
      accept: () => {
        const reqs = this.selectedGoals.map(goal => this.goalService.deleteById(goal.id));
        this.loading = true;

        forkJoin(reqs).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Goals deleted successfully' });
            this.fetchGoals();
            this.selectedGoals = [];
          },
          complete: () => this.loading = false
        });
      }
    });
  }

}
