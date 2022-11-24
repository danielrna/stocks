import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-invest-form-field',
  templateUrl: './invest-form-field.component.html',
  styleUrls: ['./invest-form-field.scss']
})
export class InvestFormFieldComponent implements OnInit {

  @Input() type: string = "email";
  @Input() label: string = "Email";
  @Input() color: string = "primary";
  @Input() disabled: boolean = false;
  @Input() raised: boolean = true;
  @Input() fullWidth: boolean = true;
  @Input() autocomplete: string = "on";
  @Input() ngModel: any;
  ngCLass: string = this.fullWidth ? 'full-width' : ''

  ngOnInit(): void {
  }

}
