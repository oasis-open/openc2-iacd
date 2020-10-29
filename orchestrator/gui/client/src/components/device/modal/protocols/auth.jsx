import React from 'react';
import PropTypes from 'prop-types';
import { FormText, Input, Label } from 'reactstrap';

import BaseOptions from './base';
import { FileBase64, pick } from '../../../utils';

const defaultState = {
  username: '',
  password_1: '',
  password_2: '',
  ca_cert: '',
  client_cert: '',
  client_key: '',
  auth: {
    password: false,
    ca_cert: false,
    client_cert: false,
    client_key: false
  }
};

class Auth extends BaseOptions {
  constructor(props, context) {
    super(props, context);
    this.certChange = this.certChange.bind(this);
    const { data } = this.props;
    this.initial = pick(data, Object.keys(defaultState));

    this.state = {
      ...defaultState,
      ...this.initial
    };
  }

  cleanState(nextState) {
    const stateChange = {};
    Object.keys(defaultState).forEach(k => {
      if (this.initial[k] !== nextState[k]) {
        stateChange[k] = nextState[k];
      }
    });
    return stateChange;
  }

  certChange(file) {
    const { base64, id } = file;
    this.setState(
      {
        [id]: base64
      },
      this.onStateChange
    );
  }

  render() {
    const {
      auth, password_1, password_2, username
    } = this.state;

    return (
      <fieldset className="border border-info p-2">
        <legend>Authentication</legend>
        <div className="form-row">
          <div className="form-group col-lg-4">
            <Label for="username">Username</Label>
            <Input
              id="username"
              className="form-control"
              type="text"
              name="username"
              value={ username }
              onChange={ this.inputChange }
            />
          </div>
          <div className="form-group col-lg-4">
            <Label for="password_1">Password</Label>
            <Input
              id="password_1"
              className="form-control"
              type="password"
              name="password_1"
              value={ atob(password_1 || '') }
              onChange={ this.inputChange }
            />
            <FormText color={ auth.password ? 'success' : 'muted' }>{ `Password is ${auth.password ? '' : 'not '} set` }</FormText>
          </div>
          <div className="form-group col-lg-4">
            <Label for="password_2">Password Confirmation</Label>
            <Input
              id="password_2"
              className="form-control"
              type="password"
              name="password_2"
              value={ atob(password_2 || '') }
              onChange={ this.inputChange }
            />
          </div>
          <div className="form-group col-lg-4">
            <Label for="ca_cert">CA Certificate</Label>
            <FileBase64
              id="ca_cert"
              className="form-control"
              name="ca_cert"
              onDone={ this.certChange }
            />
            <small className='form-text text-info'>Only use unencrypted &lsquo;.cert&rsquo; files</small>
            <FormText color={ auth.ca_cert ? 'success' : 'muted' }>{ `CA Certificate is ${auth.ca_cert ? '' : 'not '} set` }</FormText>
          </div>
          <div className="form-group col-lg-4">
            <Label for="client_cert">Client Certificate</Label>
            <FileBase64
              id="client_cert"
              className="form-control"
              name="client_cert"
              onDone={ this.certChange }
            />
            <small className='form-text text-info'>Only use unencrypted &lsquo;.cert&rsquo; files</small>
            <FormText color={ auth.client_cert ? 'success' : 'muted' }>{ `Client Certificate is ${auth.client_cert ? '' : 'not '} set` }</FormText>
          </div>
          <div className="form-group col-lg-4">
            <Label for="client_key">Client Key</Label>
            <FileBase64
              id="client_key"
              className="form-control"
              name="client_key"
              onDone={ this.certChange }
            />
            <small className='form-text text-info'>Only use unencrypted &lsquo;.key&rsquo; files</small>
            <FormText color={ auth.client_key ? 'success' : 'muted' }>{ `Client Key is ${auth.client_key ? '' : 'not '} set` }</FormText>
          </div>
        </div>
      </fieldset>
    );
  }
}

Auth.propTypes = {
  change: PropTypes.func,
  data: PropTypes.object
};

Auth.defaultProps = {
  change: () => {},
  data: {}
};

export default Auth;