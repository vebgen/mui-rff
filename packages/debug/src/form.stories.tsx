import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Field } from 'react-final-form';

import type { ContainerFormProps } from './form';
import { ContainerForm } from './form';


// The properties passed to each story.
type StoryProps = ContainerFormProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'debug/ContainerForm',
    tags: ['debug'],
    component: ContainerForm,
    args: {},
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <ContainerForm {...args}>
        <h2>Simple Default Input</h2>
        <div>
            <label>First Name</label>
            <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>Render Function</h2>
        <Field
            name="bio"
            render={({ input, meta }) => (
                <div>
                    <label>Bio</label>
                    <textarea {...input} />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
            )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
            {({ input, meta }) => (
                <div>
                    <label>Phone</label>
                    <input type="text" {...input} placeholder="Phone" />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
            )}
        </Field>
    </ContainerForm>
);


/**
 * The form is empty.
 */
export const WithoutInitialValues: StoryFn<StoryProps> = Template.bind({});
WithoutInitialValues.args = {};


/**
 * The form is initialized with initial values.
 */
export const WithInitialValues: StoryFn<StoryProps> = Template.bind({});
WithInitialValues.args = {
    initialValues: {
        firstName: 'John',
        bio: 'Lorem ipsum dolor sit amet',
        phone: '555-555-5555',
    },
};
