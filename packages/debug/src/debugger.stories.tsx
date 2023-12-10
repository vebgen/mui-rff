import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import type { ContainerFormProps } from './form';
import { FormDebugger } from './debugger';
import { Field, Form } from 'react-final-form';


// The properties passed to each story.
type StoryProps = ContainerFormProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'debug/FormDebugger',
    tags: ['debug'],
    component: FormDebugger,
    args: {},
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <Form
        onSubmit={() => { }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>
                            <h2>Simple Default Input</h2>
                            <div>
                                <label>First Name</label>
                                <Field
                                    name="firstName"
                                    component="input"
                                    placeholder="First Name"
                                />
                            </div>

                            <h2>Render Function</h2>
                            <Field
                                name="bio"
                                render={({ input, meta }) => (
                                    <div>
                                        <label>Bio</label>
                                        <textarea {...input} />
                                        {
                                            meta.touched &&
                                            meta.error &&
                                            <span>{meta.error}</span>
                                        }
                                    </div>
                                )}
                            />

                            <h2>Render Function as Children</h2>
                            <Field name="phone">
                                {({ input, meta }) => (
                                    <div>
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            {...input}
                                            placeholder="Phone"
                                        />
                                        {
                                            meta.touched &&
                                            meta.error &&
                                            <span>{meta.error}</span>
                                        }
                                    </div>
                                )}
                            </Field>
                            <br />
                            <button type="submit">Submit</button>
                        </td>
                        <td>
                            <FormDebugger />
                        </td>
                    </tr>
                </table>
            </form>
        )}
    />
);


/**
 * The form is empty.
 */
export const WithoutInitialValues: StoryFn<StoryProps> = Template.bind({});
WithoutInitialValues.args = {};
