import { Component } from "@angular/core";
import { CoursesService } from "./courses.service";

@Component({
    selector: 'courses',
    template: `
    <h2>{{title}}</h2>
    <ul>
        <li *ngFor="let course of courses">
            {{course}}
        </li>
    </ul>
    <button class="btn btn-primary" [class.active]="isActive"> Save </button>
    <button class="btn" [style.backgroundColor] = "isActive ? 'salmon' : 'blue'"> Style Handler </button>
    <button (click) = "onSave($event)" class="btn btn-success"> Click Handler </button>

    <div (click)="onDivClicked()"> 
        <button (click) = "onSave($event)" class="btn btn-success"> Event Bubbling </button>
    </div>

    <input [(ngModel)]="email" (keyup.enter)="onKeyUp()"/> <br/>

    {{course.title | uppercase | lowercase}} <br/>
    {{course.rating | number:'1.2-2'}} <br/>
    {{course.students | number}} <br/>
    {{course.price | currency: 'AUD': true: '3.2-2'}} <br/>
    {{course.releaseDate | date:'shortDate' }} <br/>
  
    `,
})
export class CoursesComponent {
    title = "List of courses";
    courses;
    isActive = true;
    email = "towhidul.islam@vivacomsolutions.com";
    course = {
        title: "The complete angular course",
        rating: 4.975,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2016, 3, 1)
    }

    // dependencyInjection need to pass the courses service to the provider in app.modules.ts
    constructor(service: CoursesService) {
        this.courses = service.getCourses()
    }

    onDivClicked() {
        console.log('Div was clicked');
    }

    onSave($event: any) {
        $event.stopPropagation();
        console.log($event);
        alert('button clicked')
    }

    onKeyUp() {
        console.log('Enter button pressed', this.email);
    }

}