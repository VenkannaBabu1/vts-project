import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, Checkbox, notification } from 'antd';
import 'antd/dist/reset.css';
import './Register.css';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    
    // Convert the date of birth to "YYYY-MM-DD" format
    values.dob = values.dob.format('YYYY-MM-DD');
    
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
        message: 'Registration error',
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
                  pattern: /^[A-Za-z]+$/,
                  message: 'Only alphabetic characters are allowed!',
                },
              ]}
              className='form-item'
            >
              <Input  placeholder="Enter your first name" />
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
              <Input  placeholder="Enter your last name" />
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
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: 'Please input your date of birth!' },
                { validator: validateDOB },
              ]}
              className='form-item'
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} placeholder="Select Date of Birth" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
              className='form-item'
            >
              <Select placeholder="Select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[
                { required: true, message: 'Please input your pincode!' },
                { len: 6, message: 'Pincode must be 6 digits long!' },
              ]}
              className='form-item'
            >
              <Input placeholder="Enter your pincode" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please select your state!' }]}
              className='form-item'
            >
              <Select placeholder="Select your state">
                {states.map((state) => (
                  <Option key={state.value} value={state.value}>
                    {state.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="phno"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { len: 10, message: 'Phone number must contain 10 digits' },
              ]}
              className='form-item'
            >
              <Input addonBefore={prefixSelector} placeholder="Enter your phone number" />
            </Form.Item>
          </div>

          <div className="form-input">
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input your address!' }]}
              className='form-item'
            >
              <Input.TextArea showCount maxLength={200} placeholder="Enter your address" />
            </Form.Item>
          </div>
          <div className="form-input">
            <Form.Item
              name="idType"
              label="ID Type"
              rules={[{ required: true, message: 'Please select ID type!' }]}
              className='form-item'
            >
              <Radio.Group onChange={handleIdTypeChange} value={idType}>
                <Radio value="adhaar">Aadhar</Radio>
                <Radio value="pan">PAN</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="adhaarPan"
              label={idType.charAt(0).toUpperCase() + idType.slice(1) + ' Number'}
              rules={[
                { required: true, message: `Please input your ${idType} number!` },
                validateIdNumber(),
              ]}
              className='form-item'
            >
              <Input placeholder={`Enter your ${idType} number`} />
            </Form.Item>
          </div>

          <div className="form-input">
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/,
                  message: 'Password must be exactly 8 characters long, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
                },
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
                    return Promise.reject(new Error('The new password that you entered does not match!'));
                  },
                }),
              ]}
              className='form-item'
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </div>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions!')),
              },
            ]}
          >
            <div className="checkbox-container">
              <Checkbox>
                I have read and agree to the 
              </Checkbox>
              <a href="#">terms and conditions</a>
            </div>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="submit-button">
              Register
            </Button>
          </Form.Item>
          <div className='signin-btn'>
            <a href="#">Already have an account? Sign in</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
