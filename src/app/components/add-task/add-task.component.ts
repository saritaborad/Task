import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));

   }

  ngOnInit(): void {
  }

  onSubmit(){
      if(!this.text){
        alert('Please Add a Task!');
        return;
      }

    // ADD operation
    // data added will be submitted to server in object(newTask) format
    //  but we will submit data from parent component
      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder
      }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;

  }
}
