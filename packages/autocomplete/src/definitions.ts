import { ReactNode } from 'react';
import { FieldProps } from 'react-final-form';
import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import { UseAutocompleteProps as MuiUseAutocompleteProps } from '@mui/material/useAutocomplete';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { ShouldShowErrorFunc } from '@vebgen/mui-rff-core';


/**
 * The type of the data expected by the autocomplete control.
 */
export type AutocompleteData = {
    [key: string]: any | null;
};


/**
 * Properties expected by the Autocomplete field.
 *
 * We explicitly remove the renderInput property as we're going to
 * provide our own implementation.
 */
export interface AutocompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<
        MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
            MuiUseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
        'renderInput'
    > {
    /**
     * The name of the field in final form.
     */
    name: string;

    /**
     * A node used as the control label.
     */
    label: ReactNode;

    /**
     * A node used as the control label.
     */
    placeholder?: string;

    /**
     * The text presented near the control when there is no error to report.
     */
    helperText?: string;

    /**
     * Indicate that the ui control should show a required mark.
     */
    required?: boolean;

    /**
     * A function that retrieves the value from an autocomplete option.
     *
     * This converts between MUI Autocomplete value and final form values.
     * The value of the RFF field will be the result of this function
     * (either a single value or an array depending on multiple parameter).
     */
    getOptionValue?: (option: T) => any;

    /**
     * Options that will be provided to the inner final form field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

    /**
     * Options that will be provided to the inner MUI Autocomplete.
     */
    textFieldProps?: Partial<MuiTextFieldProps>;

    /**
     * A function that determines if an error or the helper text
     * is to be presented.
     *
     * By default the function used will show errors on change
     * (only after the user changed - is not enough to touch it).5
     */
    showError?: ShouldShowErrorFunc;
}
