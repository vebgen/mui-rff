import { Field, FieldProps } from 'react-final-form';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import type { ShouldShowErrorFunc } from '@vebgen/mui-rff-core';

import { TEXT_FIELD_TYPE, TYPE_TEXT } from './definitions';
import { TextFieldInner } from './inner';


/**
 * The properties expected by this control.
 */
export interface TextProps
    extends Partial<Omit<MuiTextFieldProps, 'type' | 'onChange'>> {
    /**
     * The name of the RFF field.
     */
    name: string;

    /**
     * Text field type.
     */
    type?: TEXT_FIELD_TYPE;

    /**
     * Properties to apply to the RFF field.
     */
    fieldProps?: Partial<FieldProps<any, any>>;

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
 * A field that allows the user to edit text directly.
 */
export const Text = ({
    name,
    type = TYPE_TEXT,
    fieldProps,
    ...rest
}: TextProps) => (
    <Field
        name={name}
        type={type}
        render={({ input, meta }) => (
            <TextFieldInner
                input={input}
                meta={meta}
                name={name}
                type={type}
                {...rest}
            />
        )}
        {...fieldProps}
    />
);
