import React from 'react';
import { FormattedMessage } from 'react-intl';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFormState } from 'react-final-form';


/**
 * A button that has a loading state derived from the form state.
 *
 * The label is either save or create, depending on whether the form has
 * initial values.
 */
export const SubmitButton = () => {
    const state = useFormState();
    console.log("[SubmitButton] state %O", state);
    return (
        <LoadingButton
            loading={state.submitting}
            type="submit"
            loadingPosition="start"
            color="primary"
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={
                state.submitting || state.hasValidationErrors || state.pristine
            }
        >
            {
                state.initialValues ? (
                    <FormattedMessage
                        id="mui-rff.save"
                        defaultMessage="Save"
                    />
                ) : (
                    <FormattedMessage
                        id="mui-rff.create"
                        defaultMessage="Create"
                    />
                )
            }
        </LoadingButton>
    )
}
