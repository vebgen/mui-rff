import { FieldMetaState } from 'react-final-form';

/**
 * Properties provided to a function that has to determine
 * if an error will be presented to the user.
 */
export interface ShouldShowErrorProps {
    meta: FieldMetaState<any>;
}

/**
 * A function whose purpose is to determine if an error will be presented
 * to the user.
 */
export type ShouldShowErrorFunc = (props: ShouldShowErrorProps) => boolean;

/**
 * The function will show the error if:
 * - there has been a submission error and the user did not change the input or
 * - a common (validation) error.
 *
 * For the error to be shown the field has to have been modified by the user.
 */
export const showErrorOnChange: ShouldShowErrorFunc = ({
    meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ShouldShowErrorProps) =>
    !!(
        ((submitError && !dirtySinceLastSubmit) || error) &&
        (touched || modified)
    );

/**
 * The function will show the error if:
 * - there has been a submission error and the user did not change the input or
 * - a common (validation) error.
 *
 * For the error to be shown the field has to have been touched
 * (but not modified) by the user.
 */
export const showErrorOnBlur: ShouldShowErrorFunc = ({
    meta: { submitError, dirtySinceLastSubmit, error, touched },
}: ShouldShowErrorProps) =>
    !!(((submitError && !dirtySinceLastSubmit) || error) && touched);
