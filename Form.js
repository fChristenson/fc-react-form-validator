const React = require("react");
const validateForm = require("fc-form-validator");

class Form extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const formState = validateForm(event.target.form, this.props.validators);
    this.props.onChange(event, formState);
  }

  onSubmit(event) {
    const formState = validateForm(event.target, this.props.validators);
    this.props.onSubmit(event, formState);
  }

  render() {
    return (
      <form
        {...this.props}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        children={this.props.children}
      />
    );
  }
}

module.exports = Form;
