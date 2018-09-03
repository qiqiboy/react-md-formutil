# react-md-formutil

[![npm](https://img.shields.io/npm/v/react-md-formutil.svg?style=flat)](https://npm.im/react-md-formutil)

Happy to use react-formutil in the project based on `react-md` ^\_^

在 [react-md](https://github.com/mui-org/react-md) 项目，结合[react-formutil](https://github.com/qiqiboy/react-formutil) 来快速构建表单。

<!-- vim-markdown-toc GFM -->

-   [安装 Installation](#安装-installation)
-   [使用 Usage](#使用-usage)
    -   [`<FormItem />`](#formitem-)
        -   [`component`](#component)
        -   [`name`](#name)
        -   [`$defaultValue`](#defaultvalue)
        -   [`$validators`](#validators)
        -   [`controlProps`](#controlprops)
        -   [`label`](#label)
        -   [`helperText`](#helpertext)
        -   [`$parser`](#parser)
        -   [`$formatter`](#formatter)
        -   [`checked` `unchecked`](#checked-unchecked)
        -   [`validMessage`](#validmessage)
        -   [`valuePropName` `changePropName` `focusPropName` `blurPropName`](#valuepropname-changepropname-focuspropname-blurpropname)
    -   [`支持的组件`](#支持的组件)
        -   [`TextField`](#textfield)
        -   [`Select`](#select)
        -   [`NativeSelect`](#nativeselect)
        -   [`Input`](#input)
        -   [`Checkbox`](#checkbox)
        -   [`Radio`](#radio)
        -   [`Switch`](#switch)
        -   [`FormItemLabel`](#formitemlabel)
        -   [`DatePicker`](#datepicker)
        -   [`TimePicker`](#timepicker)
        -   [`DateTimePicker`](#datetimepicker)
-   [FAQ](#faq)
    -   [`给组件设置的 onChange、onFocus 等方法无效、不执行`](#给组件设置的-onchangeonfocus-等方法无效不执行)
    -   [`为什么有些搭配某些组件时必须给 FormItem 传递 component 参数呢？`](#为什么有些搭配某些组件时必须给-formitem-传递-component-参数呢)

<!-- vim-markdown-toc -->

### 安装 Installation

```bash
# npm
npm install react-md-formutil --save

# yarn
yarn install react-md-formutil
```

### 使用 Usage

> `react-md-formutil` 整合了 `react-formutil` 的组件，所以可以直接从`react-md-formutil`中导出所需要的 `react-formutil` 组件。不用单独从 `react-formutil` 中导出。

先看一个使用示例（点击查看在线完整示例 :
[react-md-formutil on codesandbox.io](https://codesandbox.io/s/n524m5040p)）：

```javascript
import React, { Component } from 'react';
import { withForm, FormItem } from 'react-md-formutil';
import { TextField } from 'react-md'; // 导入mui的TextField组件

@withForm
class MyForm extends Component {
    submit = () => {
        const { $invalid, $getFirstError, $params } = this.props.$formutil;

        if ($invalid) {
            alert($getFistError());
        } else {
            // submit your data
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <FormItem name="username" required>
                    <TextField type="text" />
                </FormItem>
            </form>
        );
    }
}
```

`FormItem`是 `react-md-formuitl` 新增加的组件，`withForm`是`react-formutil`的组件（没错，你可以直接从`react-md-formutil`中导出`react-formutil`的组件啦）。

只需要将`react-md`的交互组件，嵌套在`FormItem`下，即可实现自动的表单状态同步。

#### `<FormItem />`

要实现将`react-md`的交互组件的值能同步到 `react-formutil` 的状态中，需要通过 `FormItem` 这个组件来实现中间态绑定。

`FormItem`是针对`react-md`中的表单类组件增加的包装组件，只需要将`react-md`中的相关表单类组件嵌套放置在`FormItem`下，即可轻松实现表单的校验与状态收集同步！

> **注意：**`FormItem`下只允许放置一个表单组件，不允许多个。

##### `name`

设置输入项的 name 值，表单项将会以 name 作为 key 收集到 formutil 的状态中。支持嵌套语法 _（同`react-formutil`的`Field`同
名参数，可以参考 [name](https://github.com/qiqiboy/react-formutil#name)）_

##### `$defaultValue`

设置该表单项的默认值 _（同`react-formutil`的`Field`同名参数，可以参
考[$defaultvalue](https://github.com/qiqiboy/react-formutil#defaultvalue)）_

##### `$validators`

设置校验方法 _（同`react-formutil`的`Field`同名参数 , 可以参考
[$validators](https://github.com/qiqiboy/react-formutil#validators)）_

> 同 react-formutil 的 EasyField，FormItem 也内置了同样的校验规则：

> -   `required` 必填 `required`
> -   `maxLength` 。最大输入长度，有效输入时才会校验 `maxLength="100"`
> -   `minLength` 最小输入长度，有效输入时才会校验 `minLength="10"`
> -   `max` 最大输入数值，仅支持 Number 比较。有效输入时才会校验 `max="100"`
> -   `min` 最小输入数值，仅支持 Number 比较。有效输入时才会校验 `min="10"`
> -   `pattern` 正则匹配。有效输入时才会校验 `pattern={/^\d+$/}`
> -   `enum` 枚举值检测。有效输入时才会校验 `enum={[1,2,3]}`
> -   `checker` 自定义校验函数。`checker={value => value > 10 && value < 100 || ' 输入比如大于 10 小与 100'}`

注：校验属性的值为 `null` 时表示不进行该校验

内置的校验规则无需再次声明，除非规则不符合预期，需要替换，则可以通过`$validators` 传递同名校验方法即可替换默认的。另外，
内置的校验规则，如果校验不通过，会尝试去 `validMessage` 匹配错误信息。

##### `$parser`

设置输入的值收集到 formutil 状态中时的过滤处理。默认为`value => value`

```javascript
<FormItem $parser={value => parseInt(value)}>
    <TextField />
</FormItem>
```

##### `$formatter`

设置 formutil 中的值渲染到输入组件上时的过滤处理。默认为`value => value`

```javascript
<FormItem $formatter={value => '$' + value}>
    <TextField />
</FormItem>
```

##### `checked` `unchecked`

对于 `<SelectionControl />` `<Switch />` `<Checkbox />` `<Radio />` 等，其值默认是 checked 属性，为布尔值。可以通过`checked`
`unchecked`来设置 checked 状态时所要映射的值：

```javascript
<FormItem checked="yes" unchecked="no">
    <Switch />
</FormItem>
```

该示例中， 当 Switch 为开时，获取的值将为 yes。

##### `validMessage`

设置校验结果的错误信息。

```javascript
<FormItem
    name="username"
    required
    validMessage={{
        required: '请输入用户名'
    }}>
    <TextField />
</FormItem>
```

##### `valuePropName` `changePropName` `focusPropName` `blurPropName`

该四个参数可以用来设置绑定到组件上的值或者值变动、是否聚焦等事件回调。该项一般不需要设置，`FormItem` 已经针对 `react-md`
中的所有 `data-entry` 型组件做了兼容处理。

对于一些特殊场景，例如不需要同步 `focus`、`blur`，则可以通过将该值设为`{null}`来禁用：

```javascript
//禁用focus、blur状态同步
<FormItem focusPropName={null} blurPropName={null} name="username">
    <TextField />
</FormItem>
```

#### `支持的组件`

##### [`Autocomplete`](https://react-md.mlaursen.com/components/autocompletes)

```javascript
<FormItem name="autocomplete">
    <Autocomplete />
</FormItem>
```

##### [`TextField`](https://react-md.mlaursen.com/components/text-fields)

```javascript
<FormItem name="name">
    <TextField />
</FormItem>
```

##### [`Slider`](https://react-md.mlaursen.com/components/sliders)

```javascript
<FormItem name="age">
    <Slider />
</FormItem>
```

##### [`SelectField`](https://react-md.mlaursen.com/components/select-fields)

```javascript
<FormItem name="age">
    <SelectField id="select-field-1" label="Numbers" menuItems={NUMBER_ITEMS} />
</FormItem>
```

##### [`DatePicker`](https://react-md.mlaursen.com/components/pickers/date)

```javascript
<FormItem name="date">
    <DatePicker id="appointment-date-portrait" label="Portrait mode" className="md-cell" displayMode="portrait" />
</FormItem>
```

##### [`TimePicker`](https://react-md.mlaursen.com/components/pickers/time)

```javascript
<FormItem name="date">
    <TimePicker id="appointment-time-landscape" label="Landscape mode" className="md-cell" displayMode="landscape" />
</FormItem>
```

##### [`Checkbox` `Radio` `Switch` `SelectionControl`](https://react-md.mlaursen.com/components/selection-controls)

```javascript
<FormItem name="selection-control">
    <SelectionControl
        id="checkbox-read-documentation-page"
        name="simple-checkboxes[]"
        label="Open SelectionControl documentation page"
        type="checkbox"
    />
</FormItem>

<FormItem name="checkbox">
    <Checkbox
      id="checkbox-read-material-design-spec"
      name="simple-checkboxes[]"
      label="Read Material Design Specifications"
    />
</FormItem>
```

##### [`SelectionControlGroup`](https://react-md.mlaursen.com/components/selection-controls)

```javascript
<FormItem name="checkbox-group" required>
    <SelectionControlGroup
        id="selection-control-group-checkboxs"
        name="radio-example"
        type="checkbox"
        label="SelectionControlGroup.checkbox"
        controls={controls}
    />
</FormItem>
```

### FAQ

#### `给组件设置的 onChange、onFocus 等方法无效、不执行`

`FormItem`会覆盖掉直接添加到 react-md 组件上的`onFocus` `onBlur` `onChange`方法，所以如果需要这三个事件方法，需要添加到
`FormItem`上：

```javascript
<FormItem name="test" onChange={ev => console.log('change', ev)} onFocus={ev => console.log('focus', ev)}>
    <TextField />
</FormItem>
```
