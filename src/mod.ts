import {SimpleFormat} from '/types.ts';

export function now() {
  return new Thyme();
}

export function today() {
  return new Thyme(new Date().setUTCHours(0, 0, 0, 0));
}

export class Thyme {
  constructor(date: Date);
  constructor(date: number);
  constructor();
  constructor(date?: Date | number) {
    if (date === undefined) {
      this.#date = new Date();
    }
    else if (typeof date === 'number') {
      this.#date = new Date(date);
    }
    else {
      this.#date = date;
    }
  }

  readonly #date: Date;

  /**
    * @description Gets or sets the number of milliseconds into the second.
    * 0 <= value < 1000.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  millisecond(): number;
  millisecond(value: number): this;
  millisecond(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCMilliseconds();}
    this.#date.setUTCMilliseconds(value);
    return this;
  }
  /**
    * @description Gets or sets the number of seconds into the minute.
    * 0 <= value < 60.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  second(): number;
  second(value: number): this;
  second(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCSeconds();}
    this.#date.setUTCSeconds(value);
    return this;
  }
  /**
    * @description Gets or sets the number of minutes into the hour.
    * 0 <= value < 60.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  minute(): number;
  minute(value: number): this;
  minute(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCMinutes();}
    this.#date.setUTCMinutes(value);
    return this;
  }
  /**
    * @description Gets or sets the number of hours into the day.
    * 0 <= value < 24.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  hour(): number;
  hour(value: number): this;
  hour(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCHours();}
    this.#date.setUTCHours(value);
    return this;
  }
  /**
    * @description Gets or sets the number of days into the month.
    * 1 <= value <= 31.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  day(): number;
  day(value: number): this;
  day(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCDate();}
    this.#date.setUTCDate(value);
    return this;
  }
  /**
    * @description Gets or sets the number of months into the year.
    * 1 <= value <= 12.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  month(): number;
  month(value: number): this;
  month(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCMonth() + 1;}
    this.#date.setUTCMonth(value - 1);
    return this;
  }
  /**
    * @description Gets or sets the current year.
    * -271821 <= value <= 275760.
    * Set-syntax (one argument is passed) allows for chaining.
  **/
  year(): number;
  year(value: number): this;
  year(value?: number) {
    if (typeof value === 'undefined') {return this.#date.getUTCFullYear();}
    this.#date.setUTCFullYear(value);
    return this;
  }

  /* ==== Format methods ==== */

  /**
    * @description Formats the time as a string with the specified format.
    * @param format The format to be used.
    *
    * **Format explanation:**  \
    * Specify one of the following symbols to have them replaced with the
    * corresponding value. Repeat a symbol to set a minimum width for the
    * value. For example: `DD.MM.YYYY` could be `01.03.2023`, while `D.M.YY`
    * would be `1.3.23`.
    * There are no other options in this format.
    *
    * **Available symbols:**  \
    * (case-sensitive)
    * * `Y` — Year.  \
    *   If you specify `Y` one or two times, it will result in the two-digit
    *   year.  \
    *   `Y` is never negative, so be sure to use `C` or `E` when the year could
    *   be less than 0.
    * * `M` — Month. The month as a number (`1` to `12`).
    * * `D` — Day. The day of the month as a number (`1` to `31`).
    * * `h` — Hour. `0` to `23`.
    * * `m` — Minute. `0` to `59`.
    * * `s` — Second. `0` to `59`.
    * * `i` — Millisecond. `0` to `999`. Left-aligned.
    * * `C` — Christ. Either `BC` or `AD`.
    * * `E` — Era. Eiher `BCE` or `CE`.
  **/
  formatSimple(format: string): string {
    let formatted = format;
    for (const {key, value, left, padding} of Thyme.simpleFormat) {
      const pad = left ? 'padEnd' : 'padStart';
      formatted = formatted.replaceAll(
        new RegExp(key + '+', 'g'),
        match => value(this, match.length)[pad](match.length, padding ?? '0')
      );
    }
    return formatted;
  }
  private static readonly simpleFormat: SimpleFormat = [
    {
      key: 'Y',
      value: (thyme, length) =>
        Math.abs(length! <= 2 ? thyme.year() % 100 : thyme.year()).toFixed()
      // For two-digit year representations.
    },
    {key: 'M', value: (thyme) => thyme.month().toFixed()},
    {key: 'D', value: (thyme) => thyme.day().toFixed()},
    {key: 'h', value: (thyme) => thyme.hour().toFixed()},
    {key: 'm', value: (thyme) => thyme.minute().toFixed()},
    {key: 's', value: (thyme) => thyme.second().toFixed()},
    {key: 'i', value: (thyme) => thyme.millisecond().toFixed(), left: true},
    {
      key: 'C',
      value: (thyme) => thyme.year() < 0 ? 'BC' : 'AD',
      left: true,
      padding: ' '
    },
    {
      key: 'E',
      value: (thyme) => thyme.year() < 0 ? 'BCE' : 'CE',
      left: true,
      padding: ' '
    }
  ];

  /* ==== Utility methods ==== */
  // Mostly for internal use and auto-calling.

  valueOf(): number {
    return this.#date.valueOf();
  }
  [Symbol.toPrimitive](hint: string): string | number {
    return this.#date[Symbol.toPrimitive](hint);
  }
  [Symbol.for('Deno.customInspect')](): string {
    return `Thyme { ${this.valueOf()} }`;
  }
}
