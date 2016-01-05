(function (root) {
  'use strict';
  
  root.LoginModal = React.createClass({
    getInitialState: function () {
      return ({
        email: '',
        password: ''
      });
    },
    updateEmail: function (e) {
      e.preventDefault();
      this.setState({email: e.target.value})
    },
    updatePassword: function (e) {
      e.preventDefault();
      this.setState({password: e.target.value})
    },
    login: function (e) {
      e.preventDefault();
      SessionActions.login(this.state);
      this.cancel();
    },
    cancel: function (e) {
      if (typeof e !== 'undefined') e.preventDefault();
      this.setState({email: '', password: ''});
      ModalActions.hideLoginModal();
    },
    render: function () {
      return (
        <div id='login-modal' className='login-modal'>
          <h3>Login</h3>
          <form className='form-group'>
            <label>Email</label><br/>
            <input className='form-control'
                   type='text' 
                   value={this.state.email}
                   onChange={this.updateEmail}/>
            <br/><br/>

            <label>Password</label><br/>
            <input className='form-control'
                   type='password'
                   value={this.state.password}
                   onChange={this.updatePassword}/>
            <br/><br/>

            <input className='btn btn-success transition'
                   type='submit' 
                   value='Login'
                   onClick={this.login}/>

            <input className='btn btn-danger transition'
                   type='submit' 
                   value='Cancel'
                   onClick={this.cancel}/>
          </form>
        </div>
      );
    }
  });
})(this);