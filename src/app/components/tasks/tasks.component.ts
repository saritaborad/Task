import { Component, OnInit} from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from 'src/app/service/task.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];  
  alert: boolean = false;
  addedAlert: boolean = false;
  faTimes = faTimes;  

  constructor(private taskService: TaskService ) { }

  ngOnInit(): void {
      this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })

  } 

  deleteTask(task: Task){
       this.taskService
       .deleteTask(task)
       .subscribe(()=>(this.tasks = this.tasks.filter(t => t.id !== task.id)));   
       if(this.addedAlert){
          this.addedAlert = false;
       }
       this.alert = true;
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task){
    this.taskService.addNewTask(task).subscribe((task) => {this.tasks.push(task)})
    if(this.alert){
      this.alert = false;
    }
    this.addedAlert = true;
    }

  closeDelete(){
    if(this.alert){
      this.alert = false;
    }
    else if(this.addedAlert){
      this.addedAlert  = false;
    }
    
  }

}


/*
----> The @Output() decorator in a child component or directive lets data flow from the child to the parent. 
----> @Output() marks a property in a child component as a doorway through which data can travel from the child to the parent.
----> The child component uses the @Output() property to raise an event to notify the parent of the change.
----> To raise an event, an @Output() must have the type of EventEmitter, 
      which is a class in @angular/core that you use to emit custom events.
*/
