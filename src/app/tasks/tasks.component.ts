import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>()
  // order = input<"asc" | "desc">()
  order = input<"asc" | "desc" | undefined>()
  userTasks = input.required<Task[]>()
}

export const resolveUserTasks: ResolveFn<Task[]> = (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
  const order = activatedRouteSnapshot.queryParams['order']
  const tasksService = inject(TasksService)
  const tasks = tasksService.allTasks().filter(
    (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
  )

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1))
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1))
  }

  return tasks.length ? tasks : []
}
