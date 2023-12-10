import React, { FC } from 'react';
import {
    DatePicker as MuiDatePicker,
    DatePickerProps as MuiDatePickerProps
} from '@mui/x-date-pickers';
import { FieldRenderProps } from 'react-final-form';
import { showErrorOnChange, } from '@vebgen/mui-rff-core';


/**
 * The properties expected by the DatePickerInner control.
 */
type DatePickerInnerProps = FieldRenderProps<MuiDatePickerProps<any>>;


/**
 * A control for selecting a date.
 *
 * This needs to be wrapped Field.
 */
export const DatePickerInner: FC<DatePickerInnerProps> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    showError = showErrorOnChange,
    helperText,
    textFieldProps,
    required,
    ...rest
}) => {
    const { error, submitError } = meta;
    const isError = showError({ meta });

    return (
        <MuiDatePicker
            onChange={onChange}
            value={(value as any) === '' ? null : value}
            {...rest}
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
