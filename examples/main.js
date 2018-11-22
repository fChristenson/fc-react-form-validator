const React = require("react");
const ReactDom = require("react-dom");
const Form = require("../Form");
const validateForm = require("fc-form-validator");

const validators = {
  username: username => {
    if (username === "") throw new Error("you must have a username");

    if (username && username.length < 3)
      throw new Error("username must be at least 3 letters");

    if (username && username.length > 5)
      throw new Error("username must not be more than 5 letters");

    return true;
  },
  spam: shouldSpam => {
    if (!shouldSpam) throw new Error("We must be allowed to spam you");
    return true;
  },
  city: (city, { spam }) => {
    if (city === "City") throw new Error("City must be selected");
    if (city !== "City" && spam !== true)
      throw new Error("Don't forget to let us spam you");

    return true;
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = { formState: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this._getFieldError = this._getFieldError.bind(this);
  }

  onBlur(event) {
    const formState = validateForm(event.target.form, validators);
    this.setState({ formState });
  }

  onChange(event, formState) {
    this.setState({ formState });
  }

  onSubmit(event, formState) {
    event.preventDefault();
    this.setState({ formState });
    const formFields = Object.values(formState);
    const formIsValid = formFields.every(
      fieldState => fieldState.valid === true
    );

    if (formIsValid) {
      alert("Form submitted");
    }
  }

  _getFieldError(field) {
    const maybeField = this.state.formState[field];
    const maybeFieldError = maybeField && maybeField.error;
    return maybeFieldError ? maybeFieldError.message : "";
  }

  render() {
    const error = "error";
    const usernameError = this._getFieldError("username");
    const spamError = this._getFieldError("spam");
    const cityError = this._getFieldError("city");

    return (
      <Form
        className="form"
        validators={validators}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      >
        <div>
          <input onBlur={this.onBlur} type="text" name="username" />
          <span className={usernameError ? error : ""}>{usernameError}</span>
          <input type="checkbox" name="spam" />
          <span className={spamError ? error : ""}>{spamError}</span>
          <select name="city">
            <option>City</option>
            <option>Gothenburg</option>
            <option>Stockholm</option>
          </select>
          <span className={cityError ? error : ""}>{cityError}</span>
        </div>
        <input type="submit" />
      </Form>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
