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
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps,
} from '@mui/material';
import {
    ErrorMessage,
    ShouldShowErrorFunc,
    showErrorOnChange,
    useFieldForErrors,
} from '@vebgen/mui-rff-core';


/**
 * Describes a single checkbox.
 */
export interface CheckboxData {
    /**
     * The label to show for this group of checkboxes.
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
     * Show the control in an indeterminate state.
     *
     * Note that this alone does not prevent the control from changing
     * the value in the field. If the user clicks the control, the
     * value will be added/removed on each click to/from the field array.
     */
    indeterminate?: boolean;

    /**
     * The key to use with the control.
     */
    key?: string;
}


/**
 * The properties expected by this control.
 */
export interface CheckboxesProps
    extends Partial<Omit<MuiCheckboxProps, 'onChange'>> {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * Available options.
     */
    data: Omit<CheckboxData, 'value' | 'key'> | CheckboxData[];

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
}


/**
 * A field that represents data using checkboxes.
 */
export function Checkboxes(props: CheckboxesProps) {
    const {
        required,
        label,
        data,
        name,
        helperText,
        fieldProps,
        formControlProps,
        formGroupProps,
        formLabelProps,
        formControlLabelProps,
        formHelperTextProps,
        showError = showErrorOnChange,
        ...restCheckboxes
    } = props;

    const itemsData = (Array.isArray(data) ? data : [data]) as any;
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
                {itemsData.map((item: CheckboxData) => (
                    <FormControlLabel
                        key={item.key || '' + item.value}
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
                                        name: inputName,
                                        value,
                                        onChange,
                                        checked,
                                        ...restInput
                                    },
                                }) => (
                                    <MuiCheckbox
                                        name={inputName}
                                        value={value}
                                        onChange={onChange}
                                        checked={checked}
                                        disabled={item.disabled}
                                        inputProps={{ required, ...restInput }}
                                        indeterminate={item.indeterminate}
                                        {...restCheckboxes}
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
