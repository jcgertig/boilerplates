import React from 'react';

const isServer = () => !(typeof window !== 'undefined' && window.document);

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
// use with () => System.import('path').then(module => module.default)

export default function asyncComponent(baseComponent, getComponent) {
  if (process.env.NODE_ENV === 'development') {
    const context = require.context('../../../src', true, /^.*\.js$/);
    return context(`./${baseComponent}/index.js`).default;
  }
  // only use if you want to do bad css where the reused classes are not in the app entry css
  // const context = require.context('../../../src', true, /^.*\.css$/);
  // context(`./${baseComponent}/styles.css`);

  return class AsyncComponent extends React.Component {

    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const spinner = <span>... loading</span>;
      if (isServer()) {
        return spinner;
      }
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return spinner;
    }
  };
}
