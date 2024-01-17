import React from 'react';
import { FormattedMessage } from 'react-intl';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, useFormState } from 'react-final-form';
import Button from '@mui/material/Button';


/**
 * A button that allows resetting the form to the initial state.
 */
export const ResetButton = () => {
    const state = useFormState();
    const form = useForm();
    console.log("[ResetButton] state %O", state);
    return (
        <Button
            type="submit"
            color="secondary"
            startIcon={<UndoIcon />}
            onClick={() => form.reset(state.initialValues)}
            disabled={
                state.submitting || state.pristine
            }
        >
            <FormattedMessage
                id="mui-rff.reset"
                defaultMessage="Reset"
            />
        </Button>
    )
}
