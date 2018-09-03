import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { EasyField } from 'react-formutil';
import {
    Autocomplete,
    TextField,
    DatePicker,
    TimePicker,
    SelectionControl,
    Checkbox,
    Radio,
    Switch,
    SelectionControlGroup
} from 'react-md';

const isUglify = TextField.name !== 'TextField';

const _Autocomplete = isUglify ? Autocomplete : 'Autocomplete';
const _DatePicker = isUglify ? DatePicker : 'DatePickerContainer';
const _TimePicker = isUglify ? TimePicker : 'TimePickerContainer';
const _Switch = isUglify ? Switch : 'Switch';
const _Radio = isUglify ? Radio : 'Radio';
const _Checkbox = isUglify ? Checkbox : 'Checkbox';
const _TextField = isUglify ? TextField : 'TextField';
const _SelectionControlGroup = isUglify ? SelectionControlGroup : 'SelectionControlGroup';
const _SelectionControl = isUglify ? SelectionControl : 'SelectionControl';

function getChildComponent(children) {
    if (children && typeof children.type === 'function') {
        const func = children.type;

        if (isUglify) {
            return func;
        }

        return func.name;
    }
}

class _FormGroup extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
        //$parser $formatter checked unchecked $validators validMessage等传递给 EasyField 组件的额外参数
    };

    render() {
        const props = this.props;
        let { children, ...fieldProps } = props;

        let component = getChildComponent(children);
        let injectError = true;

        switch (component) {
            case _SelectionControl:
            case _Switch:
            case _Checkbox:
            case _Radio:
                fieldProps.__TYPE__ = 'checked';
                injectError = false;
                break;

            case _SelectionControlGroup:
                injectError = false;
                break;

            case _TextField:
                break;

            default:
                fieldProps.__TYPE__ = 'empty';
                break;
        }

        return (
            <EasyField
                {...fieldProps}
                passUtil="$fieldutil"
                render={({ $fieldutil, ...restProps }) => {
                    const { $invalid, $dirty, $error } = $fieldutil;
                    const {
                        valuePropName = 'value',
                        changePropName = 'onChange',
                        focusPropName = 'onFocus',
                        blurPropName = 'onBlur'
                    } = props;
                    const onChange = restProps[changePropName];
                    const onFocus = restProps[focusPropName];
                    const onBlur = restProps[blurPropName];
                    const value = restProps[valuePropName];

                    let childProps;
                    switch (component) {
                        case _SelectionControl:
                        case _Switch:
                        case _Checkbox:
                        case _Radio:
                            const { checked = true, unchecked = false } = props;
                            childProps = {
                                name: fieldProps.name,
                                checked: value === checked,
                                onChange: ev => {
                                    const newValue = ev && ev.target ? ev.target.checked : ev;
                                    onChange(newValue ? checked : unchecked, ev);
                                }
                            };

                            break;

                        case _Autocomplete:
                            childProps = {
                                value,
                                onChange,
                                onAutocomplete: onChange
                            };
                            break;

                        case _DatePicker:
                        case _TimePicker:
                            childProps = {
                                value,
                                onChange: (datestring, ...args) => onChange(...args)
                            };
                            break;

                        case _SelectionControlGroup:
                            if (children.props.type === 'radio') {
                                childProps = {
                                    onChange,
                                    value
                                };
                            } else {
                                childProps = {
                                    value: value && value.join(','),
                                    onChange: (newValue, ev) => onChange(newValue ? newValue.split(',') : [], ev)
                                };
                            }
                            break;

                        default:
                            childProps = {
                                [changePropName]: onChange,
                                [valuePropName]: value
                            };
                            break;
                    }

                    Object.assign(childProps, {
                        [focusPropName]: onFocus,
                        [blurPropName]: onBlur
                    });

                    if (injectError && $invalid && $dirty) {
                        childProps.error = true;
                        childProps.errorText = Object.values($error)[0];
                    }

                    return cloneElement(children, childProps);
                }}
            />
        );
    }
}

export default _FormGroup;
