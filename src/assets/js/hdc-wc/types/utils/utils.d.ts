export declare function format(first: string | undefined, middle: string | undefined, last: string | undefined): string;
/**
 * Gets present value
 * @param evento KeyboardEvent
 * @returns string
 */
export declare function getPresentValue(evento: KeyboardEvent): string;
/**
 * Removes double spaces
 * @param input string
 * @returns string
 */
export declare function removeDoubleSpaces(value: string): string;
export declare function getValueByPath<T>(data: T, parts: Array<string>): string;
