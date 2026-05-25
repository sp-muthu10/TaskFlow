import {
  useState,
} from "react";
import "./Authentication.css";

import {
  Lock,
  Mail,
  User,
  Briefcase,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function Authentication() {

  const navigate =
    useNavigate();

  /* Toggle */

  const [isLogin, setIsLogin] =
    useState(true);

  /* Form */

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });

  /* Error */

  const [error, setError] =
    useState("");

  /* Handle Input */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setError("");

  };

  /* Submit */

  const handleSubmit = (e) => {

    e.preventDefault();

    /* Signup */

    if (!isLogin) {

      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.role
      ) {

        setError(
          "Please fill all fields"
        );

        return;

      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;

      }

      /* Existing Users */

      const users =
        JSON.parse(
          localStorage.getItem(
            "users"
          )
        ) || [];

      const existingUser =
        users.find(
          (user) =>
            user.email ===
            formData.email
        );

      if (existingUser) {

        setError(
          "User already exists"
        );

        return;

      }

      /* Save User */

      const newUser = {
        username:
          formData.username,
        email:
          formData.email,
        password:
          formData.password,
        role:
          formData.role,
      };

      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      alert(
        "Signup Successful"
      );

      setIsLogin(true);

      return;

    }

    /* Login */

    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const validUser =
      users.find(
        (user) =>
          user.email ===
            formData.email &&
          user.password ===
            formData.password
      );

    if (!validUser) {

      setError(
        "Invalid Email or Password"
      );

      return;

    }

    /* Save Current User */

    localStorage.setItem(
      "username",
      validUser.username
    );

    localStorage.setItem(
      "email",
      validUser.email
    );

    localStorage.setItem(
      "role",
      validUser.role
    );

    navigate("/dashboard");

  };

  return (


  <div className="auth-container">

    <div className="auth-card">

      {/* Heading */}

      <div className="auth-heading">

        <h1>TaskFlow</h1>

        <p>
          Advanced Task Manager
        </p>

      </div>

      {/* Toggle */}

      <div className="auth-toggle">

        <button
          onClick={() =>
            setIsLogin(true)
          }
          className={
            isLogin
              ? "active-btn"
              : ""
          }
        >

          Login

        </button>

        <button
          onClick={() =>
            setIsLogin(false)
          }
          className={
            !isLogin
              ? "active-btn"
              : ""
          }
        >

          Signup

        </button>

      </div>

      {/* Error */}

      {error && (

        <div className="auth-error">

          {error}

        </div>

      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        {/* Username */}

        {!isLogin && (

          <div className="form-group">

            <label>
              Username
            </label>

            <div className="input-box">

              <User
                size={20}
                className="input-icon"
              />

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={
                  formData.username
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        )}

        {/* Email */}

        <div className="form-group">

          <label>
            Email
          </label>

          <div className="input-box">

            <Mail
              size={20}
              className="input-icon"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>

        {/* Role */}

        {!isLogin && (

          <div className="form-group">

            <label>
              Role
            </label>

            <div className="input-box">

              <Briefcase
                size={20}
                className="input-icon"
              />

              <input
                type="text"
                name="role"
                placeholder="Enter role"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        )}

        {/* Password */}

        <div className="form-group">

          <label>
            Password
          </label>

          <div className="input-box">

            <Lock
              size={20}
              className="input-icon"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>

        {/* Confirm Password */}

        {!isLogin && (

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <div className="input-box">

              <Lock
                size={20}
                className="input-icon"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        )}

        {/* Submit */}

        <button
          type="submit"
          className="submit-btn"
        >

          {isLogin
            ? "Login"
            : "Create Account"}

        </button>

      </form>

    </div>

  </div>

);

}

export default Authentication;