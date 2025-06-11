import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export class FormPresenter<T> {
  protected form!: FormGroup;
  protected unsubscribe: Subject<void>;

  public constructor() {
    this.unsubscribe = new Subject();
  }

  public get Form() {
    return this.form;
  }

  public get Value(): T {
    return this.form.value as T;
  }

  public get Valid(): boolean {
    return this.form.valid;
  }

  public get Invalid(): boolean {
    return this.form.invalid;
  }

  public get Disabled(): boolean {
    return this.form.disabled;
  }

  public disable(control: string) {
    this.form.get(control)?.disable();
  }

  public enable(control: string) {
    this.form.get(control)?.enable();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public patchValue(model: any, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.patchValue(model, options);
  }
}
