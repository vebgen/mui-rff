import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';

import type { DatePickerProps } from './component';
import { DatePicker } from './component';


// The properties passed to each story.
type StoryProps = DatePickerProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Text',
    tags: ['text'],
    component: DatePicker,
    args: {
        name: "text",
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
const Template: StoryFn<StoryProps> = ({name, ...rest}) => (
    <ContainerForm validate={(values: any) => {
        console.log('ContainerForm onValidate with %O', values);

        const errors: Record<string, string> = {};
        if (!values[name]) {
            errors[name] = 'Required';
        } else if (values[name] === '000') {
            errors[name] = '000 is not a valid value';
        }
        return errors;
    }}>
        <DatePicker name={name} {...rest} />
    </ContainerForm>
);


// Only one story.
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

