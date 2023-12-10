# debug

This package contains components that may be useful for debugging your
react-final-form components:

## FormDebugger

This component can be used to view the state of the React-Final-Form.

It shows the properties as a tree of collapsible items (it uses
[JsonViewer](https://viewer.textea.io/) internally).

## ContainerForm

This component can be used to wrap your components in a form that has a submit
and a reset button. It also includes the `FormDebugger` component.
Good for tests and stories.
