import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { TimePickerProps } from './component';
import { TimePicker } from './component';


// The properties passed to each story.
type StoryProps = TimePickerProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Text',
    tags: ['text'],
    component: TimePicker,
    args: {
        name: "theTime",
        label: "Time Control",
        required: true,
        locale: "en-EN",
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
const Template: StoryFn<StoryProps> = ({ ...rest }) => (
    <ContainerForm>
        <TimePicker {...rest} />
    </ContainerForm>
);


// Only one story.
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};
