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

  #date: Date;

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

  /* ==== Utility methods ==== */
  // Mostly for internal use and auto-calling.

  valueOf(): number {
    return this.#date.valueOf();
  }
  [Symbol.toPrimitive](hint: string): string | number {
    return this.#date[Symbol.toPrimitive](hint);
  }
}
