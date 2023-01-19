// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../app/authSlice';
import { appStore, saveCardDetails, verifyCardDetails, assignNewCardDetails } from '../../app/appSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports
import { ScanCard } from './ScanCard';

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './AddCard.css';

export function AddCard(props) {
    const app = useSelector(appStore);
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cardNumRef = useRef();                                 // Reference to store card id
    const cardCVCRef = useRef();                                 // Reference to store card cvc/security code

    const [hasCamera, setHasCamera] = useState(false);           // Toggles if device camera is available

    const [scanning, setScanning] = useState(false);             // Toggles Scan component when scan button clicked
    const [hasScannedOnce, setHasScannedOnce] = useState(false); // Toggles when scanning performed atleast once
    
    const [scannedURL, setScannedURL] = useState('');            // Stores scanned URL
    const [scanningError, setScanningError] = useState('');      // Stores scanned error
    const [totalScanningErrors, setTotalScanningErrors] = useState(0); // Store total number of failed scans
    const [scanningSuccess, setScanningSuccess] = useState('');  // Stores scanned success

    const [submissionError, setSubmissionError] = useState(''); // Store form submission(card saving & verification) error
    const [submissionSuccess, setSubmissionSuccess] = useState(''); // Store form submission success

    const [customerPromos, setCustomerPromos] = useState('');

    let checkDeviceCamera = () => {
        // Check if device hasCamera, Only if yes, Scan Card button is visible
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const cameras = devices.filter(device => device.kind === 'videoinput');
            if(cameras.length > 0){
                console.log(`COMPONENT AddCard: Device has Camera`);
                setHasCamera(true);
            }
            else {
                console.log(`COMPONENT AddCard: Device does NOT have Camera`);
                setHasCamera(false);
            }
        });
    }

    useEffect(() => {
        console.log("COMPONENT RENDERED: AddCard");
        checkDeviceCamera();
    }, [])

    useEffect(() => {
        if(scannedURL.length > 0){
            console.log(`COMPONENT AddCard: Scanned URL: ${scannedURL}`);
            try {
                setScanningError("");
                let query = scannedURL.split('?')[1].split('&');
                let card_id, card_cvc = null;

                query.forEach((el, index) => {
                    if(el.includes('card_id')){ card_id =  query[index].split('=')[1]}
                    if(el.includes('card_cvc')){ card_cvc =  query[index].split('=')[1]}
                });
    
                let card = {
                    'id': card_id,
                    'cvc': card_cvc,
                }
        
                cardNumRef.current.value = card.id;
                cardCVCRef.current.value = card.cvc;

                console.log("COMPONENT AddCard: Saving Card Details");
                dispatch(saveCardDetails(card));
                setScanningSuccess("");
                setScanningError("");
                setHasScannedOnce(true);
            } catch(e) {
                console.log("COMPONENT AddCard: Invalid URL");
                setTotalScanningErrors(totalScanningErrors + 1);
                setScanningError("Error Scanning Card, Try Scaning Again");
            }
        }
    }, [scannedURL])

    useEffect(() => {
        if(scanningError && hasScannedOnce){
            console.log("COMPONENT AddCard: Scanning Error, Remove Scanning");
            // Reset Camera Button, Remove Scanning
            // User can enter detials manually or try scanning again
            setScanning(false);
        }
        if(scanningError && !hasScannedOnce) { // ReactZxing error on initial render is ignored
            setScanningError('');
        }

        if(scanningError && totalScanningErrors >= 3){
            // Failed twice(first: ReactZxing error on initial render + 2 more failes)
            setHasCamera(false);
        }
    }, [scanningError])

    useEffect(() => {
        if(app.hasCardDetailsSaved){
            console.log("COMPONENT AddCard: Verify Card Details");
            dispatch(verifyCardDetails(app.card));
        }

        if(app.hasCardDetailsSavingError){
            console.log("COMPONENT AddCard: Card Details Saving Error");
            setSubmissionSuccess("");
            setSubmissionError(`${app.cardDetailsSavingError}. Check Card Details & Try Again.`);
        }
    }, [app.isCardDetailsSaving, app.hasCardDetailsSaved, app.hasCardDetailsSavingError, app.cardDetailsSavingError, app.card])

    useEffect(() => {
        if(app.hasCardDetailsVerified){
            console.log("COMPONENT AddCard: Card Details Verified");
            setSubmissionSuccess("Verified");
        }

        if(app.hasCardDetailsVerifyingError){
            console.log("COMPONENT AddCard: Card Details Verifying Error");
            setSubmissionSuccess("");
            setSubmissionError(`${app.verifyCardDetailsError}. Check Card Details & Try Again.`);
        }
    }, [app.isCardDetailsVerifying, app.hasCardDetailsVerified, app.hasCardDetailsVerifyingError, app.verifyCardDetailsError])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        if(scanningSuccess === 'Verified'){
            console.log(`COMPONENT AddCard: Next Card Form Submission`);
            props.setAddCardComplete(true);
        }
        else {
            let cardNumber = cardNumRef.current.value;
            let cardCVC = cardCVCRef.current.value;
            
            console.log(`COMPONENT AddCard: Verify Card Form Submission. Card ID: ${cardNumber}, CVC Code: ${cardCVC}`);
    
            dispatch(saveCardDetails({'id': cardNumber, 'cvc': cardCVC}));
        }
    }

    let scanCardHandler = (event) => {
        event.preventDefault();
        console.log("COMPONENT AddCard: Scan Card Button Clicked");
        setScanning(true);
    }

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className="max-w-lg mx-auto">

                    {/* Page Tag Line -> */}
                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" 
                            to={(auth.isAuthenticated) ? ROUTES.DASHBOARD : ROUTES.SCAN}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Scan Customer Promos</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Welcome back!</p>
                        <hr className='mt-2 mb-2'/>
                    </div>
                    {/* <- Page Tag Line */}
                    
                    {/* Scanning Card -> */}
                    <div className="mb-7">
                        {/* Buttons for scanning card & getting promos */}
                        <div className="mb-3">
                            <div className='flex'>
                                <button className={`inline-block py-3 px-7 mt-2 mb-3 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all ${(!hasCamera) ? '!disabled !disabled:opacity-50 !cursor-not-allowed' : ''}'}`} 
                                    onClick={(event) => scanCardHandler(event)}>
                                    {(hasCamera) ? <i className="fa-solid fa-camera mr-2" /> : <i className="fa-solid fa-ban mr-2" />}
                                    Scan Card
                                </button>
                            </div>

                            {/* Alert Message when camera NOT available */}
                            {(!hasCamera) ?
                                <div className='flex items-center my-1 mb-4 px-2 py-1 leading-5 border-[0.5px] border-[#cc0f35] bg-[#feecf0] rounded-lg shadow-sm'>
                                    <p className='text-[#cc0f35] text-xxs font-medium'>
                                        ALERT: Device Camera NOT Available, Enter Card Details Manually Below.
                                    </p>
                                </div>
                                : ''
                            }

                            {/* Alert Message when camera available, submissio error */}
                            {(hasCamera && submissionError) ?
                                <div className='flex items-center my-1 mb-4 px-2 py-1 leading-5 border-[0.5px] border-[#cc0f35] bg-[#feecf0] rounded-lg shadow-sm'>
                                    <p className='text-[#cc0f35] text-xxs font-medium'>{submissionError}</p>
                                </div>
                                : ''
                            }

                            {/* Alert Message when camera available, card details scanned and verified */}
                            {(hasCamera && submissionSuccess) ?
                                <div className='flex items-center my-2 mb-4 p-2 leading-5 border-[0.5px] border-[#257953] bg-[#effaf5] rounded-lg shadow-sm'>
                                    <i className="fa-solid fa-check mr-1 text-[#257953]"/>
                                    <p className='text-[#257953] font-medium'>{submissionSuccess}</p>
                                </div>
                                : ''
                            }
                        </div>

                        {/* Card Details Form */}
                        {(!hasCamera || scanningError) ? 
                            <form onSubmit={formSubmitHandler}>
                                <div className="mb-6">
                                    <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Card Number</label>
                                    {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                                    <div className='flex justify-between items-center relative'>
                                        <input ref={cardNumRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cardID" type="text" placeholder="Enter the Loyalty Card Number" required/>
                                        {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                        {scanningError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        {submissionError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">CVC</label>
                                    {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                                    <div className='flex justify-between items-center relative'>
                                        <input ref={cardCVCRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cvcCode" type="text" placeholder="Enter the Loyalty Card CVC" required/>
                                        {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                        {scanningError ? <exclamation className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></exclamation> : ""}
                                        {submissionError ? <exclamation className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></exclamation> : ""}
                                    </div>
                                    <p className="text-sm text-green-600 mt-1">{scanningSuccess}</p>
                                    <p className="text-sm text-red-600 mt-1">{scanningError}</p>
                                    <p className="text-sm text-green-600 mt-1">{submissionSuccess}</p>
                                    <p className="text-sm text-red-600 mt-1">{submissionError}</p>
                                </div>

                                <button type='submit' className="inline-block py-3 px-7 mt-2 mb-3 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">
                                    <i className="fa-solid fa-tags mr-2" /> 
                                    Get Promos
                                </button>
                            </form>
                            : ''
                        }
                        
                        {(scanning) ? <ScanCard setScannedURL={setScannedURL} setScanningError={setScanningError}/> : ""}
                    </div>
                    {/* <- Scanning Card */}
                    
                    {/* Customer Promos -> */}
                    <div className='mb-7'>
                        {customerPromos}
                    </div>
                    {/* <- Customer Promos */}
                </div>
            </div>
        </section>
    );
}