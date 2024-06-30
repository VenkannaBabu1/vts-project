import axios from 'axios';
import React,{useState} from 'react';
import './Bik.css'; 

const InsForm =() =>{
    const [formData,setFormData]=useState({
        id:'',
        email:'',
        vehicleNumber:'',
        vehicleCompany:'',
        vehicleModel:'',
        documentImage:null,
        chassisNumber:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
          ...formData,
          [name]: files[0],
        });
      };

      const baseurl="http:localhost:8080/Vehicleinsurance";
      const registerAPICall = (registerObj) => {
        const data = new FormData();
        data.append('id',registerObj.id); //Id autofill from user
        data.append('email', registerObj.email); //email autofill from user 
        data.append('vehicleNumber', registerObj.vehicleNumber);
        data.append('vehicleCompany', registerObj.vehicleCompany);
        data.append('vehicleModel', registerObj.vehicleModel);
        data.append('documentImage', registerObj.documentimage);
        data.append('chassisNumber', registerObj.chassisNumber);
        data.append('manufacturingYear', registerObj.manufacturingYear);
        alert("Bike details added successfully");
        return axios.post(baseurl+'/apply',data,{
            Headers:{
                'Content-Type':'multipart/form-data',
            },
        });
    };
    const register = (e) => {
        e.preventDefault();
        console.log(formData);
        registerAPICall(formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return(
        <div className="Header">
            <div>
                <h1>VEHICLE INSURANCE FORM</h1>
            </div>
            <form onSubmit={register}>
            <div>   
            <label htmlFor='email' required="required">Email:<span className="required">*</span></label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
            <label htmlFor='vehicleNumber' required="required">Vehicle Number:<span className="required">*</span></label>
            <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor='vehicleCompany' required="required">Vehicle Company:<span className="required">*</span></label>
            <input type="text" name="vehicleCompany" value={formData.vehicleCompany} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor='vehicleModel' required="required">Vehicle Model:<span className="required">*</span></label>
            <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="documentImage" required="required">Document Image:<span className="required">*</span></label>
              <input type="file" name="documentImage" onChange={handleFileChange} />
            </div>
            <div>
            <label htmlFor='chassisNumber' required="required">Chassis Number:<span className="required">*</span></label>
            <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor='manufacturingYear' required="required">Manufacturing Year:<span className="required">*</span></label>
            <input type="number" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange} />
            </div>
            <div>
              <button type="submit" className="button register-button">Submit</button>
            </div>            
            </form>
        </div>
    )

};
export default InsForm;

