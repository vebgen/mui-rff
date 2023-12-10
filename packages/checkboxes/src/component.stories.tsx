import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { CheckboxesProps } from './component';
import { Checkboxes } from './component';


// The properties passed to each story.
type StoryProps = CheckboxesProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Switch',
    tags: ['switch'],
    component: Checkboxes,
    args: {
        name: "switch",
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
            },
            {
                label: "Four",
                value: "4",
                indeterminate: true,
            }
        ],
        label: "The tile",
        required: true,
        helperText: "This is an alleged switch",
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
const Template: StoryFn<StoryProps> = (rest) => (
    <ContainerForm>
        <Checkboxes {...rest} />
    </ContainerForm>
);


// Multiple switches.
export const Multiple: StoryFn<StoryProps> = Template.bind({});
Multiple.args = {
    helperText: "The value is an array collected from data values",
};


// A single switch.
export const Single: StoryFn<StoryProps> = Template.bind({});
Single.args = {
    label: undefined,
    data: {
        label: "One"
    },
    helperText: "The filed value is a boolean in this case",
};


// A single switch with indeterminate allowed.
export const SingleIndeterminate: StoryFn<StoryProps> = Template.bind({});
SingleIndeterminate.args = {
    label: undefined,
    data: {
        label: "One",
        indeterminate: true,
    },
    helperText: "The filed value is a boolean in this case",
};
