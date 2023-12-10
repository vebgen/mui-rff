import React, { FC } from 'react';
import {
    DatePickerProps as MuiDatePickerProps
} from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'react-final-form';
import { ShouldShowErrorFunc, } from '@vebgen/mui-rff-core';

import { DatePickerInner } from './inner';

/**
 * The properties expected by the DateTimePicker control.
 */
export interface DatePickerProps extends Partial<Omit<MuiDatePickerProps<any>, 'onChange'>> {
    /**
     * Properties to apply to the RFF field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

    /**
     * The locale to use for formatting/parsing the date.
     */
    locale?: any;

    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * The function to determine if an error is to be shown.
     *
     * `showErrorOnBlur()` and `showErrorOnChange()` are
     * readily available functions that show the errors
     * based on modified and touched properties.
     */
    showError?: ShouldShowErrorFunc;

    /**
     * The properties applied to the inner text control.
     */
    textFieldProps?: TextFieldProps;

    /**
     * Is this value required?
     */
    required?: boolean;
}


/**
 * A control for selecting a date.
 */
export const DatePicker: FC<DatePickerProps> = ({
    name, fieldProps, ...rest
}) => (
    <Field
        name={name}
        render={(fieldRenderProps) => (
            <DatePickerInner {...fieldRenderProps} {...rest} />
        )}
        {...fieldProps}
    />
)
