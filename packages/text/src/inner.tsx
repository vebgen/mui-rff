import { FieldRenderProps } from 'react-final-form';
import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { showErrorOnChange } from '@vebgen/mui-rff-core';


/**
 * Properties expected by the TextFieldInner component.
 */
export type TextFieldInnerProps = FieldRenderProps<MuiTextFieldProps>;


/**
 * The component rendered by the Text component.
 */
export function TextFieldInner(props: TextFieldInnerProps) {
    const {
        input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
        meta,
        required,
        fullWidth = true,
        helperText,
        showError = showErrorOnChange,
        ...rest
    } = props;

    const { error, submitError } = meta;
    const isError = showError({ meta });

    return (
        <MuiTextField
            fullWidth={fullWidth}
            helperText={isError ? error || submitError : helperText}
            error={isError}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            value={value}
            type={type}
            required={required}
            inputProps={{ required, ...restInput }}
            {...rest}
        />
    );
}
