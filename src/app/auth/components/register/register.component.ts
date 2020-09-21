import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private perSrv: PersonaControllerService
  ) { }

  ngOnInit(): void {
  }

  register(event: Event){
    event.preventDefault();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      
    })
  }

}
