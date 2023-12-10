import React, { FC } from 'react';
import {
    DateTimePicker as MuiDateTimePicker,
    DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'react-final-form';
import { ShouldShowErrorFunc, } from '@vebgen/mui-rff-core';

import { DateTimePickerInner } from './inner';


/**
 * The properties expected by the DateTimePicker control.
 */
export interface DateTimePickerProps
    extends Partial<Omit<MuiDateTimePickerProps<any>, 'onChange'>> {

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
 * A control for selecting a date and time value.
 */
export const DateTimePicker: FC<DateTimePickerProps> = ({
    name, fieldProps, ...rest
}) => (
    <Field
        name={name}
        render={(fieldRenderProps) => (
            <DateTimePickerInner {...fieldRenderProps} {...rest} />
        )}
        {...fieldProps}
    />
);
