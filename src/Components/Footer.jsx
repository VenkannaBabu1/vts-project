import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#1869b0] text-white py-12 mt-auto">
            <div className="container mx-auto flex flex-wrap">
                
                <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Products</h2>
                    <ul className="text-sm">
                        <li>Motor Insurance</li>
                        <li>Car Insurance</li>
                        <li>Bike Insurance</li>
                        <li>Travel Insurance</li>
                        <li>Health Insurance</li>
                        <li>Home Insurance</li>
                    </ul>
                </div>

                
                <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Services</h2>
                    <ul className="text-sm">
                        <li>Customer Services</li>
                        <li>TPA Services</li>
                        <li>Claims Services</li>
                        <li>Cashless Garages</li>
                        <li>Non Cashless Garages</li>
                        <li>Cashless Hospitals</li>
                        <li>Empanelment Criteria-Hospitals</li>
                        <li>RTO</li>
                    </ul>
                </div>

                
                <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Company</h2>
                    <ul className="text-sm">
                        <li>About us</li>
                        <li>Public Disclosure</li>
                        <li>ISO Certifications</li>
                        <li>Investors</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                        <li>Corporate Social Responsibility</li>
                        <li>Press Release</li>
                    </ul>
                </div>

                
                <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Legal</h2>
                    <ul className="text-sm">
                        <li>Privacy Policy</li>
                        <li>Surveyors Policy</li>
                        <li>Surveyor Duties Responsibilities</li>
                        <li>Do Not Call Registry</li>
                        <li>Quality Policy</li>
                    </ul>
                </div>

                
                <div className="w-full px-4 mb-8">
                    <div className="text-lg font-semibold mb-4">Company Information</div>
                    <div className="text-sm">
                        <div className="mb-2">
                            Registered Office: 'Oriental House', A-25/27 Asaf Ali Road, New Delhi-110002
                        </div>
                        <div className="mb-2">
                            Corporate Office: Block-4, Plate-A, NBCC Office Complex, Kidwai Nagar East, New Delhi - 110023
                        </div>
                        <div className="mb-2">Call Us: 1800-118-485</div>
                        <div>Support: <a href="mailto:csd@orientalinsurance.co.in" className="text-white hover:underline">csd@orientalinsurance.co.in</a></div>
                    </div>
                </div>

                
                <div className="w-full px-4 mb-8">
                    <hr className="border-white mb-8" />
                    <div className="text-sm text-center">
                        <p className="mb-4 text-[20px] font-bold">BEWARE OF SUSPICIOUS PHONE CALLS OF FICTITIOUS / FRAUDULENT OFFERS</p>
                        <p className="mb-4">IRDAI is not involved in activities like selling insurance policies, announcing bonus or investment of premiums. Public receiving such phone calls are requested to lodge police complaint.</p>
                        <p className="mb-4">Insurance is the subject matter of solicitation. T&Cs apply.</p>
                        <p className="mb-4">For more details on risk factors, terms and conditions, please read sales brochure carefully before concluding a sale.</p>
                        <p>IRDAI registration number: 556, CIN: U66010DL1947GOI007158</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
