import { ReactNode } from 'react';
import arrayMutators from 'final-form-arrays';
import { Form, FormProps } from 'react-final-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { FormDebugger } from './debugger';
import { Box, Button, ButtonGroup } from '@mui/material';


/**
 * Properties expected by the ContainerForm components.
 */
export interface ContainerFormProps
    extends Omit<FormProps, "render"> {

    /**
     * A node to be rendered in the form.
     */
    children?: ReactNode;

};


// The style of the outer box.
const sxBox = {
    display: 'flex',
    flexWrap: 'nowrap',
    p: 1,
    m: 1,
    bgcolor: 'background.paper',
    borderRadius: 1,
    width: "100%",
}

// The style for children wrapper.
const sxChildren = {
    p: 1,
    m: 1,
    mt: 16
}

// The style for the Button box wrapper.
const sxButtons = {
    p: 1,
    m: 1,
    display: 'flex',
    justifyContent: 'center',
}

/**
 * Pauses for a while.
 *
 * @param ms The number of milliseconds to sleep.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


/**
 * Handler for form submission.
 */
const onSubmitDefault = async (values: Record<string, string>) => {
    console.trace();
    console.log('ContainerForm debug onSubmit with %O', values);
    await sleep(300);
    window.alert("Form submitted! See the console for details");
};


/**
 * A react final form useful in debugging things.
 */
export const ContainerForm = ({
    children,
    initialValues = undefined,
    onSubmit = onSubmitDefault,
    mutators = undefined,
    ...rest
}: ContainerFormProps) => (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            mutators={{
                ...arrayMutators,
                ...mutators
            }}
            {...rest}
            render={({ handleSubmit, form, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <Box sx={sxBox}>
                        <Box>
                            <Box sx={sxChildren}>
                                {children}
                            </Box>

                            <Box sx={sxButtons}>
                                <ButtonGroup variant="contained" size='small'>
                                    <Button
                                        type="submit"
                                        color='primary'
                                        disabled={submitting || pristine}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        color='secondary'
                                        onClick={form.reset as any}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box>
                            <FormDebugger />
                        </Box>
                    </Box>
                </form>
            )}
        />
    </LocalizationProvider>
);
