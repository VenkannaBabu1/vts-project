import axios from 'axios';
import  { useContext, useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../../App'; 
import './Login.css';

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
                localStorage.setItem('token', res.data.token);  
                localStorage.setItem('username', res.data.username);  
                toast.success("Form submitted successfully");
                if (res.data.role === "ROLE_USER") {
                    navigate('/user-all-policies');
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
                                    // style={{border:"none"}}
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
                                    // style={{border:"none"}}
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
                        <p>Forgot your password? <Link to="/forgot-password">click here</Link></p><br />
                        <Link to="/register">Not registered? click here</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
//
