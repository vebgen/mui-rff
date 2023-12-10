import { FormSpy } from 'react-final-form';
import { JsonViewer, defineDataType } from '@textea/json-viewer'

// Subscribe form to values.
const config = {
    values: true,
};

// The style of the viewer.
const formStyle = {
    padding: '4px',
    margin: '4px',
    border: '1px solid blue',
    color: 'blue',
    backgroundColor: '#DDDDAA',
};

// Custom function type.
const functionDataType = defineDataType({
    is: (value) => typeof value === 'function',
    Component: (props) => <span style={{ color: 'red' }}>function</span>,
})

// Collapse the form member.
const isExpanded = (path: (string|number)[], currentValue: any) => (
    !(path[0] === "form" && path.length === 1)
)

// Inner viewer.
const renderer = (values: Record<string, any>) => {
    return (
        <div style={formStyle}>
            <JsonViewer
                rootName="Form State"
                value={values}
                valueTypes={[functionDataType]}
                defaultInspectControl={isExpanded}
            />
        </div>
    );
};


/**
 * Present the content of the form.
 */
export function FormDebugger() {
    return <FormSpy subscription={config}>{renderer}</FormSpy>;
}
