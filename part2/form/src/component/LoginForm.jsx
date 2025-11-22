const LoginForm = (props) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={props.username}
              onChange={props.handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={props.password}
              onChange={props.handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};
export default LoginForm;
