var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { EasyField } from 'react-formutil';
import { Autocomplete, TextField, DatePicker, TimePicker, SelectionControl, Checkbox, Radio, Switch, SelectionControlGroup } from 'react-md';

var isUglify = TextField.name !== 'TextField';

var _Autocomplete = isUglify ? Autocomplete : 'Autocomplete';
var _DatePicker = isUglify ? DatePicker : 'DatePickerContainer';
var _TimePicker = isUglify ? TimePicker : 'TimePickerContainer';
var _Switch = isUglify ? Switch : 'Switch';
var _Radio = isUglify ? Radio : 'Radio';
var _Checkbox = isUglify ? Checkbox : 'Checkbox';
var _TextField = isUglify ? TextField : 'TextField';
var _SelectionControlGroup = isUglify ? SelectionControlGroup : 'SelectionControlGroup';
var _SelectionControl = isUglify ? SelectionControl : 'SelectionControl';

function getChildComponent(children) {
    if (children && typeof children.type === 'function') {
        var func = children.type;

        if (isUglify) {
            return func;
        }

        return func.name;
    }
}

var _FormGroup = (_temp = _class = function (_Component) {
    _inherits(_FormGroup, _Component);

    function _FormGroup() {
        _classCallCheck(this, _FormGroup);

        return _possibleConstructorReturn(this, (_FormGroup.__proto__ || Object.getPrototypeOf(_FormGroup)).apply(this, arguments));
    }

    _createClass(_FormGroup, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var children = props.children,
                fieldProps = _objectWithoutProperties(props, ['children']);

            var component = getChildComponent(children);
            var injectError = true;

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

            return React.createElement(EasyField, Object.assign({}, fieldProps, {
                passUtil: '$fieldutil',
                render: function render(_ref) {
                    var _childProps, _Object$assign;

                    var $fieldutil = _ref.$fieldutil,
                        restProps = _objectWithoutProperties(_ref, ['$fieldutil']);

                    var $invalid = $fieldutil.$invalid,
                        $dirty = $fieldutil.$dirty,
                        $error = $fieldutil.$error;
                    var _props$valuePropName = props.valuePropName,
                        valuePropName = _props$valuePropName === undefined ? 'value' : _props$valuePropName,
                        _props$changePropName = props.changePropName,
                        changePropName = _props$changePropName === undefined ? 'onChange' : _props$changePropName,
                        _props$focusPropName = props.focusPropName,
                        focusPropName = _props$focusPropName === undefined ? 'onFocus' : _props$focusPropName,
                        _props$blurPropName = props.blurPropName,
                        blurPropName = _props$blurPropName === undefined ? 'onBlur' : _props$blurPropName;

                    var _onChange = restProps[changePropName];
                    var onFocus = restProps[focusPropName];
                    var onBlur = restProps[blurPropName];
                    var value = restProps[valuePropName];

                    var childProps = void 0;
                    switch (component) {
                        case _SelectionControl:
                        case _Switch:
                        case _Checkbox:
                        case _Radio:
                            var _props$checked = props.checked,
                                checked = _props$checked === undefined ? true : _props$checked,
                                _props$unchecked = props.unchecked,
                                unchecked = _props$unchecked === undefined ? false : _props$unchecked;

                            childProps = {
                                name: fieldProps.name,
                                checked: value === checked,
                                onChange: function onChange(ev) {
                                    var newValue = ev && ev.target ? ev.target.checked : ev;
                                    _onChange(newValue ? checked : unchecked, ev);
                                }
                            };

                            break;

                        case _Autocomplete:
                            childProps = {
                                value: value,
                                onChange: _onChange,
                                onAutocomplete: _onChange
                            };
                            break;

                        case _DatePicker:
                        case _TimePicker:
                            childProps = {
                                value: value,
                                onChange: function onChange(datestring) {
                                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                        args[_key - 1] = arguments[_key];
                                    }

                                    return _onChange.apply(undefined, args);
                                }
                            };
                            break;

                        case _SelectionControlGroup:
                            if (children.props.type === 'radio') {
                                childProps = {
                                    onChange: _onChange,
                                    value: value
                                };
                            } else {
                                childProps = {
                                    value: value && value.join(','),
                                    onChange: function onChange(newValue, ev) {
                                        return _onChange(newValue ? newValue.split(',') : [], ev);
                                    }
                                };
                            }
                            break;

                        default:
                            childProps = (_childProps = {}, _defineProperty(_childProps, changePropName, _onChange), _defineProperty(_childProps, valuePropName, value), _childProps);
                            break;
                    }

                    Object.assign(childProps, (_Object$assign = {}, _defineProperty(_Object$assign, focusPropName, onFocus), _defineProperty(_Object$assign, blurPropName, onBlur), _Object$assign));

                    if (injectError && $invalid && $dirty) {
                        childProps.error = true;
                        childProps.errorText = Object.values($error)[0];
                    }

                    return cloneElement(children, childProps);
                }
            }));
        }
    }]);

    return _FormGroup;
}(Component), _class.propTypes = {
    children: PropTypes.element.isRequired
    //$parser $formatter checked unchecked $validators validMessage等传递给 EasyField 组件的额外参数
}, _temp);

export default _FormGroup;