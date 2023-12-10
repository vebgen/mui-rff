import { useCallback } from 'react';
import { Field } from 'react-final-form';

import { AutocompleteProps } from './definitions';
import { AutocompleteInner } from './inner';


/**
 * A text autocomplete field.
 */
export function Autocomplete<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element {
    // Our rendering function
    const renderer = useCallback(
        (fieldRenderProps: any) => {
            const { name, fieldProps, ...rest } = props;
            return (
                <AutocompleteInner
                    {...fieldRenderProps}
                    {...rest}
                />
            );
        },
        [props]
    );

    const { name, fieldProps } = props;
    return (
        <Field
            name={name}
            render={renderer}
            {...fieldProps}
        />
    );
}
