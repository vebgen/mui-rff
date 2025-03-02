import React, { ReactNode, useCallback, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    default as MuiAutocomplete,
} from '@mui/material/Autocomplete';
import { AutocompleteValue } from '@mui/material/useAutocomplete';
import TextField, {
    TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { showErrorOnChange } from '@vebgen/mui-rff-core';

import { AutocompleteProps } from './definitions';


interface AutocompleteInnerProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    /**
     * A node used as the control label.
     */
    label: ReactNode;

    /**
     * Indicate that the ui control should show a required mark.
     */
    required?: boolean;

    /**
     * Options that will be provided to the inner MUI Autocomplete.
     */
    textFieldProps?: Partial<MuiTextFieldProps>;

    /**
     * A function that retrieves the value from an autocomplete option.
     */
    getOptionValue?: (option: T) => any;
}


/**
 * The inner component which is rendered by RFF field.
 */
export function AutocompleteInner<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    props: AutocompleteInnerProps<T, Multiple, DisableClearable, FreeSolo> &
        FieldRenderProps<MuiTextFieldProps>
): JSX.Element {
    const {
        // FieldRenderProps
        input: { name, value, onChange },
        meta,

        // Our custom properties.
        label,
        placeholder,
        required,
        getOptionValue,
        textFieldProps,
        showError = showErrorOnChange,

        // MUI Autocomplete properties.
        options,
        multiple,
        onChange: onChangeCallback,
        ...rest
    } = props;

    const { helperText, ...lessRest } = rest;
    const { variant, ...restTextFieldProps } = textFieldProps || {};
    const { error, submitError } = meta;
    const isError = showError({ meta });

    // Extract the value to use in RFF from the raw data.
    const getValue = useCallback(
        (values: T | T[]) => {
            if (!values) {
                return null;
            }
            if (!getOptionValue) {
                return values;
            }
            return multiple
                ? (values as T[]).map(getOptionValue)
                : getOptionValue(values as T);
        },
        [getOptionValue, multiple]
    );

    // Compute the value to set in the MUI Autocomplete */
    const currentValue = useMemo(() => {
        let result:
            | AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
            | undefined;

        if (!getOptionValue) {
            // If there is no converter function then simply return the values
            // in the RFF field.
            result = value as
                | AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
                | undefined;
        } else if (value) {
            if (multiple) {
                // We convert each element then we see if the converted
                // value exists in provided values.
                result = options.filter((option: T) =>
                    (value as T[]).includes(getOptionValue(option))
                ) as any;
            } else {
                result = options.find(
                    (option: T) => value === getOptionValue(option)
                ) as any;
            }
        }
        return result === undefined ? null : result;
    }, [getOptionValue, value, options, multiple]);

    // Callback fired by the MUI Autocomplete on change.
    const onChangeFunc = useCallback(
        (
            event: React.SyntheticEvent,
            changedValue: AutocompleteValue<
                T,
                Multiple,
                DisableClearable,
                FreeSolo
            >,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<any>
        ) => {
            const gotValue = getValue(changedValue as T);

            // Inform RFF about the change.
            onChange(gotValue);

            // Inform the user, too, if there's a callback.
            if (onChangeCallback) {
                onChangeCallback(event, changedValue, reason, details);
            }
        },
        [onChange, onChangeCallback]
    );

    return (
        <MuiAutocomplete
            multiple={multiple}
            onChange={onChangeFunc}
            options={options}
            value={currentValue as any}
            renderInput={(params) => (
                <TextField
                    label={label}
                    required={required}
                    helperText={isError ? error || submitError : helperText}
                    error={isError}
                    name={name}
                    placeholder={placeholder}
                    variant={variant}
                    {...params}
                    {...restTextFieldProps}
                    InputProps={{
                        ...params.InputProps,
                        ...restTextFieldProps.InputProps,
                        ...(restTextFieldProps.InputProps?.startAdornment && {
                            startAdornment: (
                                <>
                                    {
                                        restTextFieldProps.InputProps
                                            .startAdornment
                                    }
                                    {params.InputProps?.startAdornment}
                                </>
                            ),
                        }),
                        ...(restTextFieldProps.InputProps?.endAdornment && {
                            endAdornment: (
                                <>
                                    {params.InputProps?.endAdornment}
                                    {
                                        restTextFieldProps.InputProps
                                            ?.endAdornment
                                    }
                                </>
                            ),
                        }),
                    }}
                    fullWidth={true}
                />
            )}
            {...lessRest}
        />
    );
}
