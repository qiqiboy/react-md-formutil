import React, { Component } from 'react';
import { withForm, FormItem } from 'app/../../src';
import {
    Grid,
    Cell,
    Button,
    SelectField,
    TextField,
    Switch,
    Slider,
    DatePicker,
    Checkbox,
    TimePicker,
    Autocomplete,
    SelectionControlGroup,
    SelectionControl
} from 'react-md';
import 'react-md/dist/react-md.indigo-pink.min.css';

const sampleData = ['apple', 'apple123', 'apple456', 'apple789', 'appleabc'];
const controls = [
    {
        label: 'What a Save!',
        value: 'A'
    },
    {
        label: 'No problem.',
        value: 'B'
    },
    {
        label: 'I got it!',
        value: 'C'
    }
];

@withForm
class App extends Component {
    submit = ev => {
        ev.preventDefault();

        const { $invalid, $batchDirty } = this.props.$formutil;
        console.log('submit');
        if ($invalid) {
            $batchDirty(true);
        } else {
            // submit data
        }
    };

    render() {
        return (
            <div>
                <h3 style={{ textAlign: 'center' }}>react-md-formutil</h3>
                <Grid spacing={20}>
                    <Cell phoneSize={12} size={6}>
                        <form onSubmit={this.submit}>
                            <Grid>
                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="autocomplete" required>
                                        <Autocomplete
                                            id="autocomplete"
                                            label="AutoComplete"
                                            placeholder="apple"
                                            fullWidth
                                            data={sampleData}
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="selectfield" required>
                                        <SelectField
                                            id="select-field"
                                            label="SelectField"
                                            fullWidth
                                            placeholder="Placeholder"
                                            menuItems={sampleData}
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="textfield" required>
                                        <TextField
                                            id="floating-center-title"
                                            label="TextField"
                                            lineDirection="center"
                                            placeholder="Hello World"
                                            fullWidth
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={12}>
                                    <FormItem name="slider" required $defaultValue={20}>
                                        <Slider id="continuous-default-value-slider" label="Slider" />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="datepicker" required>
                                        <DatePicker
                                            autoOk
                                            id="appointment-date-portrait"
                                            label="DatePicker"
                                            fullWidth
                                            displayMode="portrait"
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="timepicker" required>
                                        <TimePicker
                                            autoOk
                                            id="appointment-time-portrait"
                                            label="TimePicker"
                                            fullWidth
                                            displayMode="portrait"
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="selection.switch" required checked="yes" unchecked="no">
                                        <SelectionControl
                                            id="switch-read-documentation-page"
                                            label="SelectionControl:Switch"
                                            name="switch"
                                            type="switch"
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="selection.checkbox" required checked="yes" unchecked="no">
                                        <SelectionControl
                                            id="checkbox-read-documentation-page"
                                            label="SelectionControl:Checbox"
                                            name="checkbox"
                                            type="checkbox"
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="checkbox" required checked="yes" unchecked="no">
                                        <Checkbox
                                            id="checkbox-read-material-design-spec"
                                            label="Checkbox"
                                            name="checbox"
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="switch" required>
                                        <Switch id="radio-read-material-design-spec" label="Switch" name="switch" />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="scg.radio" required $defaultValue="A">
                                        <SelectionControlGroup
                                            id="selection-control-group-radios"
                                            name="radio-example"
                                            type="radio"
                                            label="SelectionControlGroup.radio"
                                            controls={controls}
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={4} phoneSize={12}>
                                    <FormItem name="scg.checkbox" required>
                                        <SelectionControlGroup
                                            id="selection-control-group-checkboxs"
                                            name="radio-example"
                                            type="checkbox"
                                            label="SelectionControlGroup.checkbox"
                                            controls={controls}
                                        />
                                    </FormItem>
                                </Cell>

                                <Cell size={12}>
                                    <Button type="submit" flat primary swapTheming>
                                        Submit
                                    </Button>
                                </Cell>
                            </Grid>
                        </form>
                    </Cell>
                    <Cell size={3} phoneSize={12}>
                        <h3>$params</h3>
                        <pre>{JSON.stringify(this.props.$formutil.$params, null, 2)}</pre>
                    </Cell>
                    <Cell size={3} phoneSize={12}>
                        <h3>$errors</h3>
                        <pre>{JSON.stringify(this.props.$formutil.$errors, null, 2)}</pre>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default App;
