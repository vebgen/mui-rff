import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Field } from 'react-final-form';

import type { TextProps } from './component';
import { Text } from './component';
import { ContainerForm } from '@vebgen/mui-rff-debug';
import { TYPE_TEXT } from './definitions';
import { showErrorOnBlur, showErrorOnChange } from '@vebgen/mui-rff-core';


// The properties passed to each story.
type StoryProps = TextProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/Text',
    tags: ['text'],
    component: Text,
    args: {
        name: "text",
        type: TYPE_TEXT,
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
        <Text name={name} {...rest} />
        <p>Type 000 to see an error.</p>
    </ContainerForm>
);


// Only one story.
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

