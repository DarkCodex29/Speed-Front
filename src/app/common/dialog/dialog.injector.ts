import { Injector } from '@angular/core';

export class DialogInjector {
  /**
   * Creates an instance of roblex injector.
   * @param _parentInjector Injector
   * @param _additionalTokens WeakMap<any, any>
   */
  public constructor(
    public _parentInjector: Injector,
    // eslint-disable-next-line
    public _additionalTokens: WeakMap<any, any>,
  ) {}
  /**
   * Gets neyhaz modal injector
   * @param token any
   * @param [notFoundValue] any
   * @param [flags] any
   * @returns any
   */
  // eslint-disable-next-line
  public get(token: any, notFoundValue?: any) {
    const value = this._additionalTokens.get(token);

    if (value) {
      return value;
    }

    // eslint-disable-next-line
    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
