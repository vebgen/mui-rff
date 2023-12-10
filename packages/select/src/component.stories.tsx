import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { SelectProps } from './component';
import { Select } from './component';


// The properties passed to each story.
type StoryProps = SelectProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Text',
    tags: ['text'],
    component: Select,
    args: {
        name: "select",
        label: "Select",
        required: true,
        multiple: false,
        helperText: "Select a value from the list.",
        data: [
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
                disabled: true,
            }
        ],
        showError: showErrorOnChange,
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
const Template: StoryFn<StoryProps> = ({ name, ...rest }) => (
    <ContainerForm>
        <Select name={name} {...rest} />
    </ContainerForm>
);


// Only one story.
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};
