import React from 'react';

import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material/TextField';
import {
    ShouldShowErrorFunc,
} from '@vebgen/mui-rff-core';

import { Field, FieldProps } from 'react-final-form';
import { TimePickerInner } from './inner';


/**
 * The properties expected by the select control.
 */
export interface TimePickerProps
    extends Partial<Omit<MuiTimePickerProps<any>, 'onChange'>> {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * The locale to use for formatting/parsing the date.
     */
    locale?: any;

    /**
     * Properties to apply to the RFF field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

    /**
     * Is the control required to have an option selected?
     *
     * This is false by default.
     */
    required?: boolean;

    /**
     * The function to determine if an error is to be shown.
     *
     * `showErrorOnBlur()` and `showErrorOnChange()` are
     * readily available functions that show the errors
     * based on modified and touched properties.
     */
    showError?: ShouldShowErrorFunc;

    /**
     * Properties for the inner text field.
     */
    textFieldProps?: TextFieldProps;
}


/**
 * A control for selecting a time value.
 */
export function TimePicker(props: TimePickerProps) {
    const { name, fieldProps, ...rest } = props;

    return (
        <Field
            name={name}
            render={(fieldRenderProps) => (
                <TimePickerInner {...fieldRenderProps} {...rest} />
            )}
            {...fieldProps}
        />
    );
}

