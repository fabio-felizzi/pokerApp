/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { importComponent } from "Services/dynamicImportService";

class DynamicImportUtil extends Component {
  constructor() {
    super();
    this.state = {
      component: null,
    };
  }

  async componentDidMount() {
    const component = await this.load();

    this.setState({ component: component.default || component });
  }

  load() {
    const { path } = this.props;
    return importComponent(path);
  }

  render() {
    const { component: LoadedComponent } = this.state;

    return LoadedComponent ? (
      <LoadedComponent {...this.props} />
    ) : (
      <div>loading...</div>
    );
  }
}

DynamicImportUtil.propTypes = {
  path: PropTypes.string.isRequired,
};

export default DynamicImportUtil;
