
declare namespace Intell.Controls.Numeric {

    interface Namespace {
        Numeric: NumericConstructor;

        /** Returns a floating point number parsed from the given string specified language-sensitive representation. */
        parseFloat(string: string, option: Numeric): number;

        /** Returns a string with a language-sensitive representation of this number. If number is null/NaN, return empty string. */
        formatNumber(number: number, option: Numeric): string;
    }

    interface NumericConstructor {
        new(element: HTMLElement): Numeric;
        prototype: Numeric;
    }

    interface Numeric {
        /** Gets the root element of control. */
        element: HTMLElement;

        /** Gets the button up element. */
        elementUp: HTMLElement;

        /** Gets the button down element. */
        elementDown: HTMLElement;

        /** Gets the input element. */
        elementInput: HTMLInputElement;

        /** Gets or sets the minimum allowed value; the default is null. */
        min: number;

        /** Gets or sets the maxium allowed value; the default is null. */
        max: number;

        /** Gets or sets the minimum number of digits to appear after the decimal point; the default is 0. */
        minimumFractionDigits: number;

        /** Gets or sets the maximum number of digits to appear after the decimal point; the default is 2. */
        maximumFractionDigits: number;

        /** Gets or sets the decimal separator; the default is locale decimal separator. */
        decimalSeparator: string;

        /** Gets or sets the thousand separator; the default is locale thousand separator. */
        thousandSeparator: string;

        /** Gets or Sets the value of Numeric. */
        value?: number;

        /** Gets or sets whether the value can be null; the default is false. */
        nullable: boolean;

        /** Gets or sets the value to increment or decrement the spin box (also known as an up-down control) when the up or down buttons are clicked; the default is 1. */
        increment: number;

        // methods
        getPrivate(): NumericPrivate;

        increaseSessionBy(value: number): void;


    }
    interface NumericPrivate {
        element: HTMLElement;
        elementUp: HTMLElement;
        elementDown: HTMLElement;
        elementInput: HTMLInputElement;
        min: number;
        max: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        decimalSeparator: number;
        thousandSeparator: number;
        nullable: boolean;
        value: number;

        increment: number;


        session_skiped: boolean;

    }
}


declare namespace Intell.Controls {
    interface Namespace {
        Numeric: Intell.Controls.Numeric.Namespace;
    }
}