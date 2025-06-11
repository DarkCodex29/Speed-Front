import { Directive, HostListener, HostBinding, DoCheck, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[customReactiveForm]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomReactiveFormDirective),
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomReactiveFormDirective),
      multi: true,
    },
  ],
})
export class CustomReactiveFormDirective implements ControlValueAccessor, DoCheck {
  /**
   * Last value of reactive form directive
   */
  protected lastValue: unknown;
  /**
   * Host binding of reactive form directive for error
   */
  @HostBinding('error') public error?: boolean;
  /**
   * Host binding of reactive form directive for error text
   */
  @HostBinding('errortext') public errortext?: string;
  /**
   * Host binding of reactive form directive host disabled
   */
  @HostBinding('disable') public hostDisabled?: boolean;
  /**
   * Host binding of reactive form directive host value
   */
  @HostBinding('value') public hostValue: unknown;
  /**
   * Control of reactive form directive
   */
  public control?: AbstractControl & { isInvalid: boolean; textError: string };
  /**
   * Determines whether change on
   */
  public onChange?: (value: unknown) => void;
  /**
   * Determines whether touched on
   */
  public onTouched = () => {
    //
  };
  /**
   * Do check
   */
  public ngDoCheck(): void {
    if (this.control?.touched || this.control?.dirty) {
      this.setErrorControl();
    }
  }
  /**
   * Hosts listener handle blured event
   */
  @HostListener('changeBlur')
  public handleBluredEvent() {
    this.onTouched();
    this.setErrorControl();
  }
  /**
   * Hosts listener handle input event
   * @param value unknown
   */
  @HostListener('changeValue', ['$event.detail'])
  public handleInputEvent(value: unknown) {
    this.hostValues(value);
  }
  /**
   * Validates reactive form directive
   * @param control AbstractControl & { isInvalid: boolean; textError: string }
   */
  public validate(control: AbstractControl & { isInvalid: boolean; textError: string }) {
    this.control = control;

    if (control.value) {
      this.setErrorControl();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (control.touched || control.dirty) && !control.value ? this.setErrorControl() : {};
    }

    return (control.touched || control.dirty) && !control.value ? control.errors : {};
  }
  /**
   * Registers on change
   * @param fn (value: unknown) => void
   */
  public registerOnChange(fn: (value: unknown) => void) {
    this.onChange = fn;
  }
  /**
   * Registers on touched
   * @param fn () => void
   */
  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  /**
   * Sets disabled state
   * @param isDisabled boolean
   */
  public setDisabledState(isDisabled: boolean) {
    this.hostDisabled = isDisabled;
  }
  /**
   * Writes value
   * @param value unknown
   */
  public writeValue(value: unknown) {
    this.hostValue = this.lastValue = value === null ? '' : value;
    if (this.onChange) {
      this.onChange(value);
    }
  }
  /**
   * Hosts values
   * @param value unknown
   */
  private hostValues(value: unknown) {
    if (JSON.stringify(value) !== JSON.stringify(this.lastValue)) {
      this.hostValue = this.lastValue = value;
      this.onChange?.(value);
      this.onTouched();
    }
  }
  /**
   * Sets error control
   */
  private setErrorControl() {
    this.error = (this.control?.touched || this.control?.dirty) && this.control.invalid;

    if (this.error) {
      if (this.control?.textError) {
        this.errortext = this.control.textError;
      } else {
        // for (const propertyName in this.control?.errors) {
        //   if (this.control?.errors[propertyName]) {
        //     this.errortext = ERROR_MESSAGES(propertyName, this.control.errors[propertyName]);
        //   }
        // }
        this.errortext = 'Campo inválido.';
      }
    } else {
      this.errortext = undefined;
    }
  }
}
