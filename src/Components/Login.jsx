import React, { useContext, useState } from 'react';
import { FaEnvelope, FaEyeSlash, FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import axios from 'axios';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputText, setInputText] = useState({
        email: "",
        password: ""
    });
    const [tokenDetails, setTokenDetails] = useContext(Store);
    const [eye, setEye] = useState(true);
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    const [passwordError, setPasswordError] = useState("");

    const inputEvent = (event) => {
        const { name, value } = event.target;
        setInputText((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        setPasswordError("");

        axios.post(`${import.meta.env.VITE_URL}/user/login`, inputText)
            .then(res => {
                console.log(res.data);
                setTokenDetails({
                    ...tokenDetails,
                    token: res.data.token,
                    username: res.data.username
                });
                localStorage.setItem('token', res.data.token);  // Store token in localStorage
                localStorage.setItem('username', res.data.username);  // Store username in localStorage
                toast.success("Form submitted successfully");
                if (res.data.role === "ROLE_USER") {
                    navigate('/user-dashboard');
                } else if (res.data.role === "ROLE_ADMIN") {
                    navigate('/admin-dashboard');
                } else if (res.data.role === "ROLE_AGENT") {
                    navigate('/agent-dashboard');
                } else {
                    toast.info("Please Register first!");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error submitting form");
            });
    };

    const togglePasswordVisibility = () => {
        if (passwordVisibility === "password") {
            setPasswordVisibility("text");
            setEye(false);
        } else {
            setPasswordVisibility("password");
            setEye(true);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container-login">
                <div className="card">
                    <div className="text">
                        <h3>Welcome Back</h3>
                        <p>Enter your credentials to access your account.</p>
                    </div>
                    <form onSubmit={submitForm}>
                        <div className="input-text">
                            <div className='in'>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={inputText.email}
                                    onChange={inputEvent}
                                    name="email"
                                    required
                                />
                            </div>
                            <div className='in-1'>
                                <FaEnvelope />
                            </div>
                        </div>
                        <div className="input-text">
                            <div className='input-text-2'>
                                <input
                                    type={passwordVisibility}
                                    placeholder="Enter your password"
                                    value={inputText.password}
                                    onChange={inputEvent}
                                    name="password"
                                />
                            </div>
                            <div className='input3'>
                                {eye ? (
                                    <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <div className="buttons">
                            <button type="submit">Sign in</button>
                        </div>
                    </form>
                    <div className="forgot">
                        <p>Forgot your password? <h6 onClick={navigate("#")}>click here</h6></p><br />
                        <p>Not registered? <h6 onClick={navigate("/register")}>click here</h6></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
