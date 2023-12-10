import { ReactNode } from 'react';
import { Field, FieldProps } from 'react-final-form';
import {
    FormControl,
    FormControlLabel,
    FormControlLabelProps,
    FormControlProps,
    FormHelperTextProps,
    FormLabel,
    FormLabelProps,
    Radio as MuiRadio,
    RadioProps as MuiRadioProps,
    RadioGroup,
    RadioGroupProps,
} from '@mui/material';
import {
    ErrorMessage,
    ShouldShowErrorFunc,
    showErrorOnChange,
    useFieldForErrors,
} from '@vebgen/mui-rff-core';


/**
 * Describes a single radio control.
 */
export interface RadioData {
    /**
     * The label to show for this group of radio controls.
     */
    label: ReactNode;

    /**
     * The value assigned to this record.
     */
    value: unknown;

    /**
     * Is this item disabled or not.
     */
    disabled?: boolean;

    /**
     * The key to use with the control.
     */
    key?: string;
}

/**
 * The properties expected by this control.
 */
export interface RadiosProps extends Partial<Omit<MuiRadioProps, 'onChange'>> {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * Available options.
     */
    data: RadioData[];

    /**
     * The label to apply.
     */
    label?: ReactNode;

    /**
     * Is this value required?
     */
    required?: boolean;

    /**
     * The text to indicate usage.
     */
    helperText?: string;

    /**
     * Properties for the label.
     */
    formLabelProps?: Partial<FormLabelProps>;

    /**
     * Properties to apply to the RFF field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

    /**
     * The properties applied to the outer-most form control.
     */
    formControlProps?: Partial<FormControlProps>;

    /**
     * Properties for the label.
     */
    formControlLabelProps?: Partial<FormControlLabelProps>;

    /**
     * Properties of the group.
     */
    radioGroupProps?: Partial<RadioGroupProps>;

    /**
     * Properties for the helper.
     */
    formHelperTextProps?: Partial<FormHelperTextProps>;

    /**
     * The function to determine if an error is to be shown.
     *
     * `showErrorOnBlur()` and `showErrorOnChange()` are
     * readily available functions that show the errors
     * based on modified and touched properties.
     */
    showError?: ShouldShowErrorFunc;
}

export function Radios({
    name,
    data,
    label,
    required,
    helperText,
    formLabelProps,
    formControlLabelProps,
    fieldProps,
    formControlProps,
    radioGroupProps,
    formHelperTextProps,
    showError = showErrorOnChange,
    ...restRadios
}: RadiosProps) {
    const field = useFieldForErrors(name);
    const isError = showError(field);

    return (
        <FormControl
            required={required}
            error={isError}
            {...formControlProps}
        >
            {!!label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
            <RadioGroup {...radioGroupProps}>
                {(data as any).map((item: RadioData) => (
                    <FormControlLabel
                        key={item.key || '' + item.value}
                        name={name}
                        label={item.label as any}
                        value={item.value}
                        disabled={item.disabled}
                        control={
                            <Field
                                name={name}
                                value={item.value}
                                type="radio"
                                render={({
                                    input: {
                                        name,
                                        value,
                                        onChange,
                                        checked,
                                        ...restInput
                                    },
                                }) => (
                                    <MuiRadio
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                        checked={checked}
                                        disabled={item.disabled}
                                        required={required}
                                        inputProps={{ required, ...restInput }}
                                        {...restRadios}
                                    />
                                )}
                                {...fieldProps}
                            />
                        }
                        {...formControlLabelProps}
                    />
                ))}
            </RadioGroup>
            <ErrorMessage
                showError={isError}
                meta={field.meta}
                formHelperTextProps={formHelperTextProps}
                helperText={helperText}
            />
        </FormControl>
    );
}
