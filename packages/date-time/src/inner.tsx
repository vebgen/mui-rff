import React, { FC } from 'react';
import {
    DateTimePicker as MuiDateTimePicker,
    DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers';
import { FieldRenderProps } from 'react-final-form';

import { showErrorOnChange, } from '@vebgen/mui-rff-core';


/**
 * The properties expected by the DateTimePickerInner control.
 */
type DateTimePickerInnerProps = FieldRenderProps<MuiDateTimePickerProps<any>>;


/**
 * A control for selecting a date and time value.
 *
 * This needs to be wrapped Field.
 */
export const DateTimePickerInner: FC<DateTimePickerInnerProps> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    showError = showErrorOnChange,
    ...rest
}) => {
    const { error, submitError } = meta;
    const isError = showError({ meta });

    const { helperText, textFieldProps, required, ...lessRest } = rest;

    return (
        <MuiDateTimePicker
            onChange={onChange}
            value={(value as any) === '' ? null : value}
            {...lessRest}
            slotProps={{
                textField: {
                    ...textFieldProps,
                    helperText: isError ? error || submitError : helperText,
                    inputProps: {
                        onBlur: (event) => {
                            restInput.onBlur(event);
                        },
                        onFocus: (event) => {
                            restInput.onFocus(event);
                        },
                    },
                    error: isError,
                    fullWidth: true,
                    name,
                    onChange,
                    value: (value as any) === '' ? null : value,
                    required,
                },
            }}
        />
    );
}
