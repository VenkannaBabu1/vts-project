import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, Checkbox, notification } from 'antd';
import 'antd/dist/reset.css';
import './Register.css';
import moment from 'moment';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select;

const states = [
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CG', label: 'Chhattisgarh' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UT', label: 'Uttarakhand' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'PY', label: 'Puducherry' },
];

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 24 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 0 } },
};

const Register = () => {
  const [form] = Form.useForm();
  const [idType, setIdType] = useState('adhaar');
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [originalOtp, setOriginalOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const generateOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/otp/generate-register-otp/${email}`);
      setOriginalOtp(res.data);
      console.log("response", res.data);
      notification.success({
        message: 'OTP Sent',
        description: 'OTP has been sent to your email.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error generating OTP. Please try again.',
      });
    }
  }

  const verifyOtp = (e) => {
    e.preventDefault();
    console.log("normal", otp);
    console.log("backend otp", originalOtp);
    if (otp == originalOtp) {
      console.log("normal", otp);
      console.log("backend otp", originalOtp);
      setIsOtpVerified(true);
      notification.success({
        message: 'Verified Successfully',
      });
    } else {
      notification.error({ message: "Invalid OTP" });
    }
  }

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    values.dob = values.dob.format('YYYY-MM-DD');

    if (!isOtpVerified) {
      notification.error({
        message: 'OTP Verification',
        description: 'Please verify the OTP before submitting the form.',
      });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/user/register`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          dob: values.dob,
          email: values.email,
          phno: values.phno,
          password: values.password,
          gender: values.gender,
          address: values.address,
          adhaarPan: values.adhaarPan,
          state: values.state,
          pincode: values.pincode
        }
      );
      console.log(response.data);
      if (response.data.id) {
        notification.success({
          message: 'Registration Successful',
          description: 'You have successfully registered.',
        });
        navigate('/login');
      } else {
        notification.info({
          message: 'User Already Exists',
          description: 'You are already registered. Please log in.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Registration Error',
        description: error.response.data.message || 'An error occurred during registration. Please try again.',
      });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  const handleIdTypeChange = (e) => {
    setIdType(e.target.value);
    form.resetFields(['adhaarPan']);
  };

  const validateIdNumber = () => {
    if (idType === 'adhaar') {
      return {
        pattern: /^\d{12}$/,
        message: 'Aadhar number must be 12 digits long!',
      };
    } else if (idType === 'pan') {
      return {
        pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
        message: 'PAN number must be in the format ABCDE1234F!',
      };
    }
    return null;
  };

  const validateDOB = (_, value) => {
    if (value) {
      const birthDate = value;
      if (!birthDate.isValid()) {
        return Promise.reject(new Error('Invalid date format!'));
      }

      const today = moment();
      const eighteenYearsAgo = today.subtract(18, 'years');

      if (birthDate.isAfter(eighteenYearsAgo)) {
        return Promise.reject(new Error('You must be at least 18 years old!'));
      }
    }
    return Promise.resolve();
  };

  return (
    <div className='main'>
      <div className="form-container">
        <div className="form-title">Registration Form</div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: '91' }}
          scrollToFirstError
        >
          <div className="form-input">
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                { required: true, message: 'Please input your first name!' },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Only alphabetic characters are allowed!',
                },
              ]}
              className='form-item'
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                { required: true, message: 'Please input your last name!' },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: 'Only alphabetic characters are allowed!',
                },
              ]}
              className='form-item'
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
              className='form-item'
            >
              <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}  style={{width:"65%",marginRight:"10px"}}/>
              <Button type='primary' onClick={generateOtp} disabled={!email} style={{width:"25%"}}>Generate OTP</Button>
              
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Form.Item
                name="otp"
                label="Enter OTP"
                rules={[
                  { required: true, message: 'Please input your OTP!' },
                ]}
                className='form-item'
              >
                <Input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} style={{width:"75%",marginRight:"15px"}}/>
                <Button type='primary' onClick={verifyOtp} style={{width:"20%"}}>Verify</Button>
              </Form.Item>
             
            </div>
          </div>
          <div className="form-input">
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: 'Please select your gender!' },
              ]}
              className='form-item'
            >
              <Select placeholder="Select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: 'Please select your date of birth!' },
                { validator: validateDOB },
              ]}
              className='form-item'
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select date of birth"
                format="DD-MM-YYYY"
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="state"
              label="State"
              rules={[
                { required: true, message: 'Please select your state!' },
              ]}
              className='form-item'
            >
              <Select placeholder="Select your state">
                {states.map((state) => (
                  <Option key={state.value} value={state.label}>{state.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[
                { required: true, message: 'Please input your pincode!' },
                { pattern: /^[1-9][0-9]{5}$/, message: 'Pincode must be 6 digits long!' },
              ]}
              className='form-item'
            >
              <Input placeholder="Enter your pincode" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}
              className='form-item'
            >
              <Input.TextArea placeholder="Enter your address" maxLength={200} />
            </Form.Item>

            <Form.Item
              name="phno"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits long!' },
              ]}
              className='form-item'
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Enter your phone number" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="idType"
              label="ID Type"
              className='form-item'
            >
              <Radio.Group value={idType} onChange={handleIdTypeChange}>
                <Radio value="adhaar">Aadhar</Radio>
                <Radio value="pan">PAN</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="adhaarPan"
              label={idType === 'adhaar' ? 'Aadhar Number' : 'PAN Number'}
              rules={[
                { required: true, message: `Please input your ${idType === 'adhaar' ? 'Aadhar' : 'PAN'} number!` },
                validateIdNumber,
              ]}
              className='form-item'
            >
              <Input placeholder={`Enter your ${idType === 'adhaar' ? 'Aadhar' : 'PAN'} number`} />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters long!' },
                { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, message: 'Password must contain at least one letter and one number!' },
              ]}
              hasFeedback
              className='form-item'
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
              className='form-item'
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </div>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read and agree to the <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms and conditions</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!isOtpVerified}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
