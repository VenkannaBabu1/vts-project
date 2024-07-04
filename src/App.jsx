import React, { createContext, useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import UserDashboard from "./Components/UserDashboard";
import ContactUs from "./Components/ContactUs";
import  TravelForm from "./TravelForm"
import AdminDashboard from "./Components/AdminDashboard";
import SurveyorDashboard from "./Components/SurveyorDashboard";


import HomeForm from "./Components/HomeForm";
import Claims from "./Claims"
import ClaimStatus from "./ClaimStatus";
import Bik from './Bik';
import RejectedClaimsAdmin from "./RejectedClaimsAdmin";
import AdminViewAllClaims from "./AdminViewAllClaims";
import AgentClaimApproval from "./AgentClaimAprroval";
import Register from "./Components/Register";
import AllPolicies from "./Components/AllPolicies";
import LifeForm from "./LifeForm";
import PaymentPage from "./PaymentPage";
import MyPolicieUser from "./MyPolicieUser";
import HealthForm from "./HealthForm";
import VehicleApplications from "./VehicleApplications";
import ClaimAcceptReject from "./Components/ClaimAcceptReject";
import ClaimAcceptRejectAgent from "./Components/ClaimAcceptRejectAgent";
import 'bootstrap/dist/css/bootstrap.css';
import VehicleForm from "./VehicleForm";
import HealthAccept from "./HealthAccept";
import AcceptPolicyAgent from "./Transaction";
import LifeApplications from "./LifeAccept";
import VehicleAccept from "./VehicleAccept";
import TravelAccept from "./TravelAccept";
import HomeAccept from "./HomeAccept";
import UserPayments from "./UserPayments";
import ViewAcceptedClaims from "./Components/ViewAcceptedClaims";
import AddPolicy from "./Components/AddPolicy";
import ViewAllPolicies from "./Components/ViewAllPolicies";
import EditPolicy from "./Components/EditPolicy";
import UserProfile from "./Components/User/UserProfile";
import ForgetPassword from "./Components/User/ForgotPassword";
import Login from "./Components/User/Login";
import AdminAllPayments from "./Components/AdminAllPayments";
import AdminViewAllUsers from "./Components/AdminViewAllUsers";
import HealthPolicyView from "./Components/AdminViewPolicy/HealthPolicyView";
import HomePolicyView from "./Components/AdminViewPolicy/HomePolicyView";
import LifePolicyView from "./Components/AdminViewPolicy/LifePolicyView";
import VehiclePolicyView from "./Components/AdminViewPolicy/VehiclePolicy";
import TravelPolicyView from "./Components/AdminViewPolicy/TravelPolicyView";
import FeedbackForm from "./FeedbackForm";
import Submissions from "./Submissons";
import WhyChoose from "./Components/WhyChoose";
export const Store = createContext();
function App() {
  const [tokenDetails, setTokenDetails] = useState(
    {
      token:"",
      username:""
    }
  )
  return (
   <Store.Provider value={[tokenDetails, setTokenDetails]}>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="user-dashboard" element={<UserDashboard/>}/>
    <Route path="admin-dashboard" element={<AdminDashboard/>}/>
    <Route path="agent-dashboard" element={<SurveyorDashboard/>}/>
    <Route path="contact-us" element={<ContactUs/>}/>

    <Route path="all-payments" element={<AdminAllPayments/>}/>
    <Route path="view-all-users" element={<AdminViewAllUsers/>}/>
    <Route path="add-policy" element={<AddPolicy/>}/> 
    <Route path="user-all-policies" element={<AllPolicies/>}/>
    <Route path="view-all-policies" element={<ViewAllPolicies/>}/>
    <Route path="health-applied-users" element={<HealthPolicyView/>}/>
    <Route path="home-applied-users" element={<HomePolicyView/>}/>
    <Route path="life-applied-users" element={<LifePolicyView/>}/>
    <Route path="vehicle-applied-users" element={<VehiclePolicyView/>}/>
    <Route path="travel-applied-users" element={<TravelPolicyView/>}/>
    <Route path="accepted-claims" element={<ViewAcceptedClaims/>}/>


    <Route path="register" element={<Register/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="user-profile" element={<UserProfile/>}/>
    <Route path="forgot-password" element={<ForgetPassword/>}/>

    <Route path="homeform" element={<HomeForm/>}/>
    <Route path="lifeForm" element={<LifeForm/>} />
    <Route path="claims" element={<Claims/>}/>
    <Route path="healthForm" element={<HealthForm/>}/>
    <Route path="travelForm" element={<TravelForm/>}/>
    <Route path="vehicleForm" element={<VehicleForm/>}/>

    <Route path="payment" element={<PaymentPage/> }/>
    <Route path="user-payments" element={<UserPayments/> }/>

    <Route path="claimstatus" element={<ClaimStatus/>}/>

    <Route path="vehicle-applications" element={<VehicleAccept/>}/>
    <Route path="travel-applications" element={<TravelAccept/>}/>
    <Route path="health-applications" element={<HealthAccept/>}/>
    <Route path="home-applications" element={<HomeAccept/>}/>
    <Route path="whychooseus" element={<WhyChoose/>}/>
    
    <Route path="life-applications" element={<LifeApplications/>}/>
    <Route path="vehicles" element={<VehicleApplications/>}/>
    <Route path ="rejectadmin" element={<RejectedClaimsAdmin/>}/>
    <Route path="my-policies" element={<MyPolicieUser/>}/>
    <Route path="agentviewclaims" element={<AgentClaimApproval/>}/>
    <Route path="ClaimAcceptReject" element={<ClaimAcceptReject/>}/>
    <Route path="ClaimAcceptRejectAgent" element={<ClaimAcceptRejectAgent/>}/>
    <Route path="transaction" element={<AcceptPolicyAgent />}  />
    <Route path="edit-policy" element={<EditPolicy/>} />
    <Route path="/user-feedback" element={<FeedbackForm/>} />
    <Route path="/submissions" element={<Submissions />} />
    
    </Routes>
   </BrowserRouter>

   </Store.Provider>
  );
}

export default App;
