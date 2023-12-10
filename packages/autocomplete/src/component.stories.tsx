import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { AutocompleteProps } from './definitions';
import { Autocomplete } from './component';

interface LocalData {
    label: string;
    value?: string;
}

// The properties passed to each story.
type StoryProps = AutocompleteProps<LocalData, false, false, false>;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Autocomplete',
    tags: ['autocomplete'],
    component: Autocomplete,
    args: {
        name: "autocomplete",
        label: "Autocomplete",
        placeholder: "Select an option",
        helperText: "This is an alleged autocomplete",
        required: true,
        getOptionValue: (option: LocalData) => option.value,
        fieldProps: {},
        textFieldProps: {},
        showError: showErrorOnChange,
        options: [
            {
                label: "One",
                value: "1",
            },
            {
                label: "Two",
                value: "2",
            },
            {
                label: "Three",
                value: "3",
            },
            {
                label: "Four",
                value: "4",
            }
        ],
    },
    argTypes: {
        showError: {
            options: ["showErrorOnChange", "showErrorOnBlur"],
            mapping: {
                "showErrorOnChange": showErrorOnChange,
                "showErrorOnBlur": showErrorOnBlur,
            }
        }
    }
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (rest) => (
    <ContainerForm>
        <Autocomplete {...rest} />
    </ContainerForm>
);


// The autocomplete.
export const Multiple: StoryFn<StoryProps> = Template.bind({});
Multiple.args = {
    helperText: "The value is an array collected from data values",
};
