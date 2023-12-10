import React from 'react';

import {
    TimePicker as MuiTimePicker,
    TimePickerProps as MuiTimePickerProps
} from '@mui/x-date-pickers';
import {
    showErrorOnChange,
} from '@vebgen/mui-rff-core';

import { FieldRenderProps } from 'react-final-form';


/**
 * The properties expected by the inner control.
 */
export type TimePickerInnerProps = FieldRenderProps<MuiTimePickerProps<any>>;

/**
 * The inner part of the time picker control.
 *
 * It needs to be wrapped in a `<Field>` component.
 */
export function TimePickerInner(props: TimePickerInnerProps) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        showError = showErrorOnChange,
        ...rest
    } = props;

    const { error, submitError } = meta;
    const isError = showError({ meta });

    const { helperText, textFieldProps, required, ...lessRest } = rest;

    return (
        <MuiTimePicker
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
