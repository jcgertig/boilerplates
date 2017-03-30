import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';

import './styles.css';

@autobind
class SubmitInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };

  state = {
    content: '',
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({ content: '' });
  }

  render() {
    return (
      <form
        className="SubmitInputWrapper"
        onSubmit={this.handleSubmit}
      >
        <input
          className="SubmitInput"
          onChange={e => this.setState({ content: e.target.value })}
          value={this.state.content}
        />
        <button type="submit" className="SubmitButton">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default SubmitInput;
