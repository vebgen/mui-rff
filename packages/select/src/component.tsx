import { ReactNode } from 'react';
import { Field, FieldProps } from 'react-final-form';
import {
    FormControl,
    FormControlProps,
    FormHelperTextProps,
    InputLabel,
    InputLabelProps,
    MenuItem,
    MenuItemProps,
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
} from '@mui/material';
import {
    ErrorMessage,
    ShouldShowErrorFunc,
    showErrorOnChange,
    useFieldForErrors,
} from '@vebgen/mui-rff-core';


/**
 * One option in the select control.
 */
export interface SelectData {
    /**
     * The text presented to the user in pop-up menu.
     */
    label: string | number | ReactNode;

    /**
     * A value associated with this record.
     */
    value: string | number | string[] | null;

    /**
     * Is this option available for selection or not?
     */
    disabled?: boolean;

    /**
     * A unique key for the record.
     *
     * If not provided the value member will be used instead.
     */
    key?: string;
}


/**
 * The properties expected by the select control.
 */
export interface SelectProps extends Partial<Omit<MuiSelectProps, 'onChange'>> {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * Available options.
     *
     * You can choose to provide the data from which the control is going
     * to generate a menu for you or you can provide the menus directly
     * as children of the control.
     */
    data?: SelectData[];

    /**
     * The label that indicates the purpose of the select.
     */
    label?: ReactNode;

    /**
     * Is the control required to have an option selected?
     *
     * This is false by default.
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

    /**
     * Properties for the text input.
     */
    inputLabelProps?: Partial<InputLabelProps>;

    /**
     * Properties for menu items, if the children are not provided.
     */
    menuItemProps?: Partial<MenuItemProps>;

    /**
     * Select a single value (or, maybe, none) or select multiple values
     * at once?
     */
    multiple?: boolean;

    /**
     * The menus to use with the select control.
     *
     * If `data` is not provided then you have to include a list of children,
     * each of which should be a menu item.
     */
    children?: ReactNode;
}

/**
 * A control that presents some options as a popup.
 *
 * Depending on the settings, the control can be in single-select mode or in
 * multiple-select mode.
 */
export function Select({
    name,
    label,
    data = undefined,
    children = undefined,
    required = false,
    multiple,
    helperText,
    fieldProps,
    inputLabelProps,
    formControlProps,
    formHelperTextProps,
    menuItemProps,
    showError = showErrorOnChange,
    ...restSelectProps
}: SelectProps) {
    // Make sure there's something to show.
    if (!data && !children) {
        throw new Error(
            'Select control expects either children (react elements ' +
            'resembling menu items) or data as an attribute.'
        );
    }

    const { variant } = restSelectProps;
    const field = useFieldForErrors(name);
    const isError = showError(field);

    return (
        <Field
            name={name}
            render={({ input: { name, value, onChange, ...restInput } }) => {
                // prevents an error that happens if you don't have
                // initialValues defined in advance
                const finalValue = multiple && !value ? [] : value;
                const labelId = `select-input-${name}`;

                return (
                    <FormControl
                        required={required}
                        error={isError}
                        fullWidth={true}
                        variant={variant}
                        {...formControlProps}
                    >
                        {!!label && (
                            <InputLabel
                                id={labelId}
                                {...inputLabelProps}
                            >
                                {label}
                            </InputLabel>
                        )}
                        <MuiSelect
                            name={name}
                            value={finalValue}
                            onChange={onChange}
                            multiple={multiple}
                            label={label}
                            labelId={labelId}
                            inputProps={{ required, ...restInput }}
                            {...restSelectProps}
                        >
                            {data
                                ? data.map((item) => (
                                      <MenuItem
                                          value={item.value}
                                          key={item.key || item.value}
                                          disabled={item.disabled}
                                          {...(menuItemProps as any)}
                                      >
                                          {item.label}
                                      </MenuItem>
                                  ))
                                : children}
                        </MuiSelect>
                        <ErrorMessage
                            showError={isError}
                            meta={field.meta}
                            formHelperTextProps={formHelperTextProps}
                            helperText={helperText}
                        />
                    </FormControl>
                );
            }}
            {...fieldProps}
        />
    );
}
