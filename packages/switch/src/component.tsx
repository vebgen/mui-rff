import { ReactNode } from 'react';
import { Field, FieldProps } from 'react-final-form';
import {
    FormControl,
    FormControlLabel,
    FormControlLabelProps,
    FormControlProps,
    FormGroup,
    FormGroupProps,
    FormHelperTextProps,
    FormLabel,
    FormLabelProps,
    Switch as MuiSwitch,
    SwitchProps as MuiSwitchProps,
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
export interface SwitchData extends Partial<Omit<MuiSwitchProps, 'onChange'>> {
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
 * The properties expected by the Switch control.
 */
export type SwitchProps = {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * Available options.
     */
    data: SwitchData | SwitchData[];

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
     * Properties to apply to the RFF field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

    /**
     * The properties applied to the outer-most form control.
     */
    formControlProps?: Partial<FormControlProps>;

    /**
     * The properties applied to the form group.
     */
    formGroupProps?: Partial<FormGroupProps>;

    /**
     * Properties for the label.
     */
    formLabelProps?: Partial<FormLabelProps>;

    /**
     * Properties for the label.
     */
    formControlLabelProps?: Partial<FormControlLabelProps>;

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
};


/**
 * A group of on/off controls or a single such.
 */
export function Switch({
    name,
    data,
    label,
    required,
    helperText,
    fieldProps,
    formControlProps,
    formGroupProps,
    formLabelProps,
    formControlLabelProps,
    formHelperTextProps,
    showError = showErrorOnChange,
    ...restSwitches
}: SwitchProps) {
    const itemsData = Array.isArray(data) ? data : [data];
    const single = !Array.isArray(data);
    const field = useFieldForErrors(name);
    const isError = showError(field);

    return (
        <FormControl
            required={required}
            error={isError}
            {...formControlProps}
        >
            {label ? <FormLabel {...formLabelProps}>{label}</FormLabel> : null}
            <FormGroup {...formGroupProps}>
                {itemsData.map((item: SwitchData, idx: number) => (
                    <FormControlLabel
                        key={idx}
                        name={name}
                        label={item.label as any}
                        value={single ? undefined : item.value}
                        disabled={item.disabled}
                        control={
                            <Field
                                type="checkbox"
                                name={name}
                                render={({
                                    input: {
                                        name,
                                        value,
                                        onChange,
                                        checked,
                                        ...restInput
                                    },
                                }) => (
                                    <MuiSwitch
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                        checked={checked}
                                        disabled={item.disabled}
                                        required={required}
                                        inputProps={{ required, ...restInput }}
                                        {...restSwitches}
                                    />
                                )}
                                {...fieldProps}
                            />
                        }
                        {...formControlLabelProps}
                    />
                ))}
            </FormGroup>
            <ErrorMessage
                showError={isError}
                meta={field.meta}
                formHelperTextProps={formHelperTextProps}
                helperText={helperText}
            />
        </FormControl>
    );
}
