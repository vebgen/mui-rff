import { FieldMetaState } from 'react-final-form';
import { FormHelperText, FormHelperTextProps } from '@mui/material';


/**
 * Properties for the component that shows an error message
 * or helper text near a control.
 */
export interface ErrorMessageProps {
    /**
     * Shall we show an error or the helper text?
     */
    showError: boolean;

    /**
     * Details about the field.
     */
    meta: FieldMetaState<any>;

    /**
     * Properties of the helper.
     */
    formHelperTextProps?: Partial<FormHelperTextProps>;

    /**
     * The helper text to show when there's no error.
     */
    helperText?: string;

    /**
     * The id of the underlying component.
     */
    id?: string;
}


/**
 * A component that shows an error message or helper text near a control.
 */
export function ErrorMessage({
    showError,
    meta,
    formHelperTextProps,
    helperText,
    ...rest
}: ErrorMessageProps) {
    if (showError) {
        return (
            <FormHelperText
                {...formHelperTextProps}
                {...rest}
            >
                {meta.error || meta.submitError}
            </FormHelperText>
        );
    }

    if (helperText) {
        return (
            <FormHelperText
                {...formHelperTextProps}
                {...rest}
            >
                {helperText}
            </FormHelperText>
        );
    }

    return null;
}
