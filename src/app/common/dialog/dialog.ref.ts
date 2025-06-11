import { Subject, Observable } from 'rxjs';

export class DialogRef<T = unknown> {
  /**
   * After closed of modal ref
   */
  public afterClosed: Observable<T | undefined>;
  /**
   * After closed of modal ref
   */
  private readonly _afterClosed = new Subject<T | undefined>();
  /**
   * Creates an instance of modal ref.
   */
  public constructor() {
    this.afterClosed = this._afterClosed.asObservable();
  }
  /**
   * Closes modal ref
   * @template T
   * @param [result] T
   */
  public close(result?: T) {
      this._afterClosed.next(result);
  }
}
