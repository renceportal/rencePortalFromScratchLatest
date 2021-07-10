import { Component, ContentChild, Input } from '@angular/core'; 
import { AbstractControl, FormControlName } from '@angular/forms'; 
import { ERROR_MESSAGES } from '@rence/shared/constants';
// import { ERROR_MESSAGES } from '@shared/constants'; 

@Component({ 
  selector: 'app-form-control', 
  templateUrl: './form-control.component.html' 
}) 

export class FormControlComponent { 

  @Input() errorMap: any; 
  @Input() fromParentClass = ''; 
  @Input() errorClass = ''; 
  @ContentChild(FormControlName, { static: true }) fcn: FormControlName | undefined; 

  fieldErrors: string[] | undefined; 
  errorMessages = ERROR_MESSAGES; 
  showError: boolean | undefined; 

  getError(): string[] { 
    const errors = this.fcn?.control.errors; 
    let error = ''; 
    if (errors) { 
      Object 
        .keys(errors) 
        .some((errorKey) => { 
          if (errors[errorKey]) { 
            error = this.errorMap 
              ? this.errorMap[errorKey] 
                ? this.errorMap[errorKey] 
                : this.errorMessages?[errorKey] 
              : this.errorMessages[errorKey];
            return true; 
          } 
        }); 
    } 
    return Array.isArray(error) ? error : ( error ? [error] : [] ); 
  } 


  get control(): AbstractControl { 
    return this.fcn.control; 
  } 

  get isHighlighted(): boolean { 
    const isHighlighted = this.control.invalid && (this.control.dirty || this.control.touched); 
  
    if (isHighlighted) { 
      this.fieldErrors = this.getError(); 
    } 

    return isHighlighted; 
  } 

} 