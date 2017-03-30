import React, { PropTypes, Component } from 'react';
import styles from './styles.css';

class SubmitInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };

  state = {
    content: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({ content: '' });
  }

  render() {
    return (
      <form
        className={styles.SubmitInputWrapper}
        onSubmit={this.handleSubmit}
      >
        <input
          className={styles.SubmitInput}
          onChange={e => this.setState({ content: e.target.value })}
          value={this.state.content}
        />
        <button type="submit" className={styles.SubmitButton}>
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default SubmitInput;
