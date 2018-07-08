const React = require("react");
/**
 * This is our library, notice that this form has at least one generic
 * part, it needs to validate the state of itself.
 * 
 * Most forms will need to validate the user input before the form is
 * ready to be submitted to the server and that makes the form validation
 * a perfect candidate for becoming a library.
 */
const validateForm = require("fc-form-validator");

class Form extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    /**
     * A single method that takes the form and the validators object is
     * a very simple to use solution to a specific problem. 
     */
    const formState = validateForm(event.target.form, this.props.validators);
    this.props.onChange(event, formState);
  }

  onSubmit(event) {
    const formState = validateForm(event.target, this.props.validators);
    this.props.onSubmit(event, formState);
  }

  render() {
    /**
     * Considering how simple this form is we could consider the form
     * a good candidate for a library but the question is if the value
     * of having a form that overrides the onSubmit and onChange methods
     * with our validator library is great enough?
     * 
     * It may be simpler for the consumer of our library to make their 
     * own form and only depend on the validation library instead of 
     * both the Form component and the validator.
     */
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
