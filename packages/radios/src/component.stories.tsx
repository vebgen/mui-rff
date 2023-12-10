import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { RadiosProps } from './component';
import { Radios } from './component';


// The properties passed to each story.
type StoryProps = RadiosProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Radio',
    tags: ['radio'],
    component: Radios,
    args: {
        name: "radio",
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
        ],
        label: "The tile",
        required: true,
        helperText: "A set of radios",
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
        <Radios {...rest} />
    </ContainerForm>
);


// Multiple radio buttons.
export const Multiple: StoryFn<StoryProps> = Template.bind({});
Multiple.args = {
    helperText: "The value is an array collected from data values",
};
