import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { DateTimePickerProps } from './component';
import { DateTimePicker } from './component';


// The properties passed to each story.
type StoryProps = DateTimePickerProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/DateTime',
    tags: ['date-time'],
    component: DateTimePicker,
    args: {
        name: "date-time",
        fieldProps: {},
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
        <DateTimePicker {...rest} />
    </ContainerForm>
);


// Only one story.
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};
