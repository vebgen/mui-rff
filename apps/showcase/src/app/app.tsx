import React, { useState } from 'react';
import { DateTime } from 'luxon';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    FormControlLabel,
    Grid,
    InputAdornment,
    Link,
    Checkbox as MuiCheckbox,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import { Form } from 'react-final-form';
import { FormSubscription } from 'final-form';
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Autocomplete, AutocompleteData } from '@vebgen/mui-rff-autocomplete';
import { CheckboxData, Checkboxes } from '@vebgen/mui-rff-checkboxes';
import { Switch, SwitchData } from '@vebgen/mui-rff-switch';
import { Select, SelectData } from '@vebgen/mui-rff-select';
import { RadioData, Radios } from '@vebgen/mui-rff-radios';
import { DatePicker } from '@vebgen/mui-rff-date';
import { DateTimePicker } from '@vebgen/mui-rff-date-time';
import { TimePicker } from '@vebgen/mui-rff-time';
import { Text } from '@vebgen/mui-rff-text';
import { FormDebugger } from '@vebgen/mui-rff-debug';

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                margin: 'normal',
            },
        },
        MuiFormControl: {
            defaultProps: {
                margin: 'normal',
            },
        },
    },
});

const Subscription = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
}));

/**
 * Little helper to see how good rendering is
 */
class RenderCount extends React.Component {
    renders = 0;

    render() {
        return <>{++this.renders}</>;
    }
}

interface FormData {
    planet_one: string;
    planet: string[];
    best: string[];
    available: boolean;
    switch: string[];
    terms: boolean;
    date: DateTime;
    hello: string;
    cities: string[];
    gender: string;
    birthday: DateTime;
    break: DateTime;
    hidden: string;
    keyboardDateTime: DateTime;
    dateTime: DateTime;
    dateTimeLocale: DateTime;
    firstName: string;
    lastName: string;
}

export function AppWrapper() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

function App() {
    const subscription = { submitting: true };
    const [subscriptionState, setSubscriptionState] = useState<
        FormSubscription | undefined
    >(subscription);

    const onChange = () => {
        setSubscriptionState(
            subscriptionState === undefined ? subscription : undefined,
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Box mx={2}>
                <CssBaseline />

                <Subscription>
                    <FormControlLabel
                        control={
                            <MuiCheckbox
                                checked={subscriptionState !== undefined}
                                color="secondary"
                                onChange={onChange}
                                value={true}
                            />
                        }
                        label={
                            'Enable React Final Form subscription render ' +
                            'optimization. Watch the render count when ' +
                            'interacting with the form.'
                        }
                    />
                    <Link
                        href="https://final-form.org/docs/react-final-form/types/FormProps#subscription"
                        target="_blank"
                        underline="hover"
                    >
                        Documentation
                    </Link>
                </Subscription>

                <MainForm subscription={subscriptionState} />

                <Footer />
            </Box>
        </LocalizationProvider>
    );
}

function Footer() {
    return (
        <>
            <AppBar
                sx={{ top: 'auto', bottom: 0, backgroundColor: 'lightblue' }}
                color="inherit"
                position="fixed"
                elevation={0}
            >
                <Toolbar>
                    <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                    >
                        <Grid item>
                            <Link
                                href="https://github.com/vebgen/mui-rff"
                                target="_blank"
                                color="textSecondary"
                                underline="hover"
                                variant="body1"
                            >
                                MUI-RFF Github Project
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}

const validate = (values: FormData) => {
    return {};
};

interface AppAutoData extends AutocompleteData {
    label: string;
    value: string;
}

const PaperInner = styled(Paper)(({ theme }) => ({
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
}));

function MainForm({ subscription }: { subscription: any }) {
    const [submittedValues, setSubmittedValues] = useState<
        FormData | undefined
    >(undefined);

    const autocompleteData: AppAutoData[] = [
        { label: 'Earth', value: 'earth' },
        { label: 'Mars', value: 'mars' },
        { label: 'Venus', value: 'venus' },
        { label: 'Brown Dwarf Glese 229B', value: '229B' },
    ];

    const checkboxData: CheckboxData[] = [
        { label: 'Ack', value: 'ack' },
        { label: 'Bar', value: 'bar' },
        { label: 'Foo', value: 'foo' },
        { label: 'Indeterminate', value: 'indeterminate', indeterminate: true },
    ];

    const switchData: SwitchData[] = [
        { label: 'Ack', value: 'ack' },
        { label: 'Bar', value: 'bar' },
        { label: 'Foo', value: 'foo' },
    ];

    const selectData: SelectData[] = [
        { label: 'Choose...', value: '', disabled: true },
        { label: 'San Diego', value: 'sandiego' },
        { label: 'San Francisco', value: 'sanfrancisco' },
        { label: 'Los Angeles', value: 'losangeles' },
        { label: 'Saigon', value: 'saigon' },
    ];

    const radioData: RadioData[] = [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Both', value: 'both' },
    ];

    const initialValues: FormData = {
        planet_one: autocompleteData[1].value,
        planet: [autocompleteData[1].value],
        best: [],
        switch: ['bar'],
        available: false,
        terms: false,
        date: DateTime.fromISO('2014-08-18T21:11:54'),
        hello: 'some text',
        cities: ['losangeles'],
        gender: '',
        birthday: DateTime.fromISO('2014-08-18'),
        break: DateTime.fromISO('2019-04-20T16:20:00'),
        hidden: 'secret',
        keyboardDateTime: DateTime.fromISO('2017-06-21T17:20:00'),
        dateTime: DateTime.fromISO('2023-05-25T12:29:10'),
        dateTimeLocale: DateTime.fromISO('2023-04-26T12:29:10'),
        firstName: '',
        lastName: '',
    };

    const onSubmit = (values: FormData) => {
        setSubmittedValues(values);
    };

    const onReset = () => {
        setSubmittedValues(undefined);
    };

    const helperText = '* Required';

    const filter = createFilterOptions<AppAutoData>();

    let key = 0;

    const formFields = [
        <Autocomplete<AppAutoData, false, false, true>
            key={key++}
            label="Choose one planet"
            name="planet_one"
            multiple={false}
            required={true}
            options={autocompleteData}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option: string | AppAutoData) =>
                (option as AppAutoData).label
            }
            renderOption={(props: any, option: AppAutoData) => (
                <li {...props}>{option.label}</li>
            )}
            disableCloseOnSelect={true}
            helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
                if (
                    newValue &&
                    reason === 'selectOption' &&
                    details?.option.inputValue
                ) {
                    // Create a new value from the user input
                    autocompleteData.push({
                        value: details?.option.inputValue,
                        label: details?.option.inputValue,
                    });
                }
            }}
            filterOptions={(options: AppAutoData[], params: any) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue.length) {
                    filtered.push({
                        inputValue: params.inputValue,
                        label: `Add "${params.inputValue}"`,
                        value: params.inputValue,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
        />,
        <Autocomplete<AppAutoData, true, false, true>
            key={key++}
            label="Choose at least one planet"
            name="planet"
            multiple={true}
            required={true}
            options={autocompleteData}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option: string | AutocompleteData) =>
                (option as AutocompleteData).label
            }
            disableCloseOnSelect={true}
            renderOption={(
                props: any,
                option: AppAutoData,
                { selected }: { selected: boolean },
            ) =>
                option.inputValue ? (
                    option.label
                ) : (
                    <li {...props}>
                        <MuiCheckbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                    </li>
                )
            }
            helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
                if (
                    newValue &&
                    reason === 'selectOption' &&
                    details?.option.inputValue
                ) {
                    // Create a new value from the user input
                    autocompleteData.push({
                        value: details?.option.inputValue,
                        label: details?.option.inputValue,
                    });
                }
            }}
            filterOptions={(options: AppAutoData[], params: any) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        label: `Add "${params.inputValue}"`,
                        value: params.inputValue,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            textFieldProps={{
                InputProps: {
                    startAdornment: (
                        <InputAdornment position="start">🪐</InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">🪐</InputAdornment>
                    ),
                },
            }}
        />,
        <Switch
            key={key++}
            label="Available"
            name="available"
            required={true}
            data={{ label: 'available', value: 'available' }}
            helperText={helperText}
        />,
        <Switch
            key={key++}
            label="Check at least one..."
            name="switch"
            required={true}
            data={switchData}
            helperText={helperText}
        />,
        <Checkboxes
            key={key++}
            label="Check at least one..."
            name="best"
            required={true}
            data={checkboxData}
            helperText={helperText}
        />,
        <Radios
            key={key++}
            label="Pick a gender"
            name="gender"
            required={true}
            data={radioData}
            helperText={helperText}
        />,
        <DatePicker
            key={key++}
            label="Birthday"
            name="birthday"
            required={true}
        />,
        <TimePicker
            key={key++}
            label="Break time"
            name="break"
            required={true}
        />,
        <DateTimePicker
            key={key++}
            label="Pick a date and time"
            name="dateTime"
            required={true}
        />,
        <DateTimePicker
            key={key++}
            label="Pick a date and time (russian locale)"
            name="dateTimeLocale"
            required={true}
            //locale={ruLocale}
        />,
        <Text
            key={key++}
            label="Hello world"
            name="hello"
            required={true}
            helperText={helperText}
        />,
        <Text
            key={key++}
            label="Hidden text"
            name="hidden"
            type="password"
            autoComplete="new-password"
            required={true}
            helperText={helperText}
        />,
        <Select
            key={key++}
            label="Pick some cities..."
            name="cities"
            required={true}
            data={selectData}
            multiple={true}
            helperText="Woah helper text"
        />,
        <Checkboxes
            key={key++}
            name="terms"
            required={true}
            data={{
                label: 'Do you accept the terms?',
            }}
            helperText={helperText}
        />,
        <Text
            key={key++}
            label="Field with inputProps"
            name="firstName"
            required={true}
            inputProps={{
                autoComplete: 'name',
            }}
        />,
        <Text
            key={key++}
            label="Field WITHOUT inputProps"
            name="lastName"
            required={true}
        />,
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Paper sx={{ marginTop: 3, padding: 3, marginBottom: 5 }}>
                <Form
                    onSubmit={onSubmit}
                    initialValues={
                        submittedValues ? submittedValues : initialValues
                    }
                    subscription={subscription}
                    validate={validate}
                    key={subscription as any}
                    render={({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            noValidate={true}
                            autoComplete="new-password"
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    {formFields.map((field, index) => (
                                        <Grid
                                            item
                                            key={index}
                                        >
                                            {field}
                                        </Grid>
                                    ))}
                                    <Grid item>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={onReset}
                                            disabled={submitting}
                                            sx={{ mt: 3, mr: 1 }}
                                            color="inherit"
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            disabled={submitting}
                                            sx={{ mt: 3, mr: 1 }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Grid item>
                                        <Paper
                                            sx={{
                                                ml: 3,
                                                mt: 3,
                                                p: 3,
                                            }}
                                            elevation={3}
                                        >
                                            <Typography>
                                                <strong>Render count:</strong>
                                                <RenderCount />
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <PaperInner elevation={3}>
                                            <Typography>
                                                <strong>Form field data</strong>
                                            </Typography>
                                            <FormDebugger />
                                        </PaperInner>
                                    </Grid>
                                    <Grid item>
                                        <PaperInner elevation={3}>
                                            <Typography>
                                                <strong>Submitted data</strong>
                                            </Typography>
                                            <pre>
                                                {JSON.stringify(
                                                    submittedValues
                                                        ? submittedValues
                                                        : {},
                                                    undefined,
                                                    2,
                                                )}
                                            </pre>
                                        </PaperInner>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                />
            </Paper>
        </LocalizationProvider>
    );
}

export default App;
