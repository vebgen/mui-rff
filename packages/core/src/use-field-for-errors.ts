import { useField } from 'react-final-form';


// Configuration for useFieldForErrors.
const config = {
    subscription: {
        error: true,
        submitError: true,
        dirtySinceLastSubmit: true,
        touched: true,
        modified: true,
    },
};


/**
 * Subscribe to changes related to errors.
 *
 * useFieldForErrors returns FieldRenderProps.
 * It will manage the rerendering of any component you use it in,
 * i.e. the component will only rerender if the state of the field
 * subscribed to via useField() changes in regard to
 * error, submitError, dirtySinceLastSubmit, touched and modified.
 */
const useFieldForErrors = (name: string) => useField(name, config);

export default useFieldForErrors;
