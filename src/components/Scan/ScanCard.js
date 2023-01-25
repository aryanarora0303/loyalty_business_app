// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav } from '../../app/appSlice';
import { authStore } from '../../app/authSlice';
import { clientStore, getClientFromDB } from '../../app/clientSlice';
import { businessStore, getBusinessFromDB } from '../../app/businessSlice';
import { cardStore, saveCardDetails, verifyCardDetails } from '../../app/cardSlice';
import { promoStore, getPromoOnScanFromDB } from '../../app/promoSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";
import CopyToClipboard from 'copy-to-clipboard';

// Components Imports
import { ScanQRCode } from './ScanQRCode';

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './ScanCard.css';

export function ScanCard(props) {
    const app = useSelector(appStore);
    const auth = useSelector(authStore);
    const client = useSelector(clientStore);
    const business = useSelector(businessStore);
    const card = useSelector(cardStore);
    const promo = useSelector(promoStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState({type: '', message: ''}); // TYPE: Success or Error

    const businessIdRef = useRef();                              // Reference to store business id for which promos will be extracted
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

    const [promoOption, setPromoOption] = useState('');
    const [onlyForYouOptionClassName, setOnlyForYouOptionClassName] = useState('');
    const [allOptionClassName, setAllOptionClassName] = useState('');

    const [customerPromos, setCustomerPromos] = useState(null);

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
        dispatch(updateActiveNav(ROUTES.SCAN));
        dispatch(getClientFromDB({client_name: window.location.hostname.split('-')[1]})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
        dispatch(getBusinessFromDB({client_name: window.location.hostname.split('-')[1]})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
    }, [dispatch])

    useEffect(() => {
        if(scannedURL.length > 0) {
            console.log(`COMPONENT AddCard: Scanned URL: ${scannedURL}`);
            setScanningError("");
            setScanning(false);

            let query = scannedURL.split('?')[1].split('&');
            let card_id, card_cvc = null;

            query.forEach((el, index) => {
                if(el.includes('card_id')){ card_id =  query[index].split('=')[1]}
                if(el.includes('card_cvc')){ card_cvc =  query[index].split('=')[1]}
            });

            if(card_id && card_cvc) { 
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
            } else { // Card id or cvc field was not retrieved from the URL
                setScanningError('Card Scanning Error. Try Again.') 
            }
        } 
    }, [scannedURL])

    useEffect(() => {
        if(scanningError && hasScannedOnce){
            console.log("COMPONENT AddCard: Scanning Error, Remove Scanning");
            // Reset Camera Button, Remove Scanning
            // User can enter detials manually or try scanning again
            setTotalScanningErrors(totalScanningErrors + 1);
            setScanning(false);
        }
        if(scanningError && !hasScannedOnce) { // ReactZxing error on initial render is ignored
            setScanningError('');
        }

        if(scanningError && totalScanningErrors >= 3){
            // Failed twice(first: ReactZxing error on initial render + 2 more failes)
            setScanningError('Persistant Card Scanning Error. Try Entering Card Details Manually');
            setHasCamera(false);
        }
    }, [scanningError])

    useEffect(() => {
        if(card.hasCardDetailsSaved){
            console.log("COMPONENT AddCard: Card Details Saved");
            dispatch(verifyCardDetails(card.card));
        }

        if(card.hasCardDetailsSavingError){
            console.log("COMPONENT AddCard: Card Details Saving Error");
            setSubmissionSuccess("");
            let error = card.cardDetailsSavingError.split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' '); // Capitalize first letter of each word
            setSubmissionError(`${error}. Check Card Details & Try Again.`);
        }
    }, [card.isCardDetailsSaving, card.hasCardDetailsSaved, card.hasCardDetailsSavingError, card.cardDetailsSavingError, card.card])

    useEffect(() => {
        if(card.hasCardDetailsVerified){
            console.log("COMPONENT AddCard: Card Details Verified");
            setSubmissionSuccess("Card Details Verified");
            setSubmissionError("");
            let data = {
                card: {
                    id: card.card.id,
                    cvc: card.card.cvc,
                },
                business: {
                    id: businessIdRef.current.value,
                }
            }
            dispatch(getPromoOnScanFromDB(data));
        }

        if(card.hasCardDetailsVerifyingError){
            console.log("COMPONENT AddCard: Card Details Verifying Error");
            setSubmissionSuccess("");
            let error = card.verifyCardDetailsError.split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' '); // Capitalize first letter of each word 
            setSubmissionError(`${error}. Check Card Details & Try Again.`);
        }
    }, [card.isCardDetailsVerifying, card.hasCardDetailsVerified, card.hasCardDetailsVerifyingError, card.verifyCardDetailsError])

    useEffect(() => {
        if(promo.hasExtractedPromoOnScanFromDB){
            console.log("COMPONENT AddCard: Promo Info On Scan Extracted");
            setPromoOption('ALL');
        }

        if(promo.hasExtractingPromoOnScanFromDBError){
            console.log("COMPONENT AddCard: Promo Info On Scan Extracting Error");
            setSubmissionSuccess("");
            let error = promo.extractingPromoOnScanFromDBError.split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' '); // Capitalize first letter of each word 
            setSubmissionError(`${error}. Check Card Details & Try Again.`);
        }

    }, [promo.isExtractingPromoOnScanFromDB, promo.hasExtractedPromoOnScanFromDB, promo.hasExtractingPromoOnScanFromDBError, promo.extractingPromoOnScanFromDBError, promo.promoOnScan])

    useEffect(() => {
        let active_option = '!text-loyaltyGold-200 !border-b-2 !border-loyaltyGold-200';
        let inactive_option = '!border-b-2 !border-transparent';
        switch (promoOption) {
            case 'ONLY_FOR_YOU':
                console.log("COMPONENT AddCard: ONLY_FOR_YOU Option Selected");
                setOnlyForYouOptionClassName(active_option);
                setAllOptionClassName(inactive_option);
                break;
            case 'ALL':
                console.log("COMPONENT AddCard: ALL Option Selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(active_option);
                break;
            default:
                console.log("COMPONENT AddCard: No option selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(inactive_option);
                break;
        }
        if(promoOption && promo.hasExtractedPromoOnScanFromDB){
            console.log("COMPONENT AddCard: PromoOption set, Promos data from db available, Set Promos");
            setAndAddPromos(promoOption);
        }
    }, [promoOption, promo.hasExtractedPromoOnScanFromDB]);

    let formSubmitHandler = (event) => {
        console.log("COMPONENT AddCard: Get Promos Button Clicked");
        event.preventDefault();

        let businessId = businessIdRef.current.value;
        let cardNumber = cardNumRef.current.value;
        let cardCVC = cardCVCRef.current.value;
        
        console.log(`COMPONENT AddCard: Save Card Details. Card ID: ${cardNumber}, CVC Code: ${cardCVC}, BUSINESS ID: ${businessId}`);

        if(customerPromos) {
            console.log("COMPONENT AddCard: Reset customerPromos & promoOption");
            setCustomerPromos(null);
            setPromoOption('');
        }

        dispatch(saveCardDetails({'id': cardNumber, 'cvc': cardCVC}));
    }

    let scanCardHandler = (event) => {
        event.preventDefault();
        console.log("COMPONENT AddCard: Scan Card Button Clicked");
        setScanning(true);
    }

    let handleCopy = (promo_btn_id, promo_code) => {
        CopyToClipboard(promo_code);
        let btn = document.getElementById(promo_btn_id)
        btn.innerHTML = `<i className="fa-regular fa-copy mr-2"></i> Copied`;
        btn.style.setProperty('color','#C9A36B'); 
        btn.style.setProperty('border-color', '#C9A36B');
    }

    let setAndAddPromos = (option) => {
        let promo_list
        if(option === 'ALL'){ promo_list = promo.promoOnScan.all_promo }
        if(option === "ONLY_FOR_YOU"){ promo_list = promo.promoOnScan.custom_promo }

        promo_list = promo_list.map((promo, index) => {
            return (
                <div key={index} className="flex justify-between items-center w-full mb-5 mr-0 md:mr-5 p-5 border-[1px] bg-white border-coolGray-100 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
                    
                    <div className='flex'>
                        <img className="mr-5 p-1 h-16 border-2 border-double border-loyaltyGold-100 shadow-md rounded-full" src={promo.bus_image} alt='Business Logo'/>
                        <div className='flex flex-col justify-around items-start'>
                            <p className='mb-1 text-md text-center font-semibold text-coolGray-600'>{`${promo.promo_name}`}</p>
                            <p className='mb-1 text-sm text-loyaltyGold-100 font-semibold'>{promo.bus_name}</p> 
                            <div className='p-1 px-2 bg-loyaltyGoldFaded-100 rounded-md'>
                                {(promo.date_validity_simplified) ? 
                                    <p className='text-xxs font-bold text-loyaltyGold-200'>{promo.date_validity_simplified}</p>
                                    :
                                    <p className='text-xxs font-bold text-loyaltyGold-200'>{`${promo.date_valid_from_simplified} - ${promo.date_valid_to_simplified}`}</p>
                                }
                            </div>
                        </div>
                    </div>

                    <button id={`copy-promo-code-${index}`} className={`px-3 py-1 ml-5 flex-end h-fit border-l-[1.5px] min-w-[103px] hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 font-medium transition-all text-coolGray-500 border-coolGray-300`} onClick={() => handleCopy(`copy-promo-code-${index}`, promo.promo_name)}>
                        <i className={`fa-regular fa-copy mr-2`}></i>
                        Copy
                    </button>
                </div>
            )
        })
        setCustomerPromos(promo_list);
    };

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className="max-w-xl mx-auto">

                    {/* Page Tag Line -> */}
                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" 
                            to={(auth.isAuthenticated) ? ROUTES.DASHBOARD : ROUTES.SCAN}>
                            {(client.client) ? 
                                <img className="h-24" src={client.client.client_image} alt="Client Logo"/>
                                :
                                <img className="h-24" src="./loyalty_logo.png" alt=""/>
                            }
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
                                <button className={`inline-block py-3 px-7 mt-2 mb-3 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all ${(!hasCamera) ? 'disabled:opacity-75 cursor-not-allowed hover:bg-gray-400' : ''}'}`} 
                                    disabled={!hasCamera}
                                    onClick={(event) => scanCardHandler(event)}>
                                    {(hasCamera) ? <i className="fa-solid fa-camera mr-2" /> : <i className="fa-solid fa-ban mr-2" />}
                                    Scan Card
                                </button>
                            </div>

                            {/* Alert Message when camera NOT available */}
                            {(!hasCamera) ?
                                <div className='flex items-center my-1 mb-4 px-2 py-1 leading-5 border-[0.5px] border-[#cc0f35] bg-[#feecf0] rounded-lg shadow-sm'>
                                    <i className="fa-solid fa-exclamation mr-1 text-xxs text-[#cc0f35]"/>
                                    <p className='text-[#cc0f35] text-xxs font-medium'>
                                        ALERT: Device Camera NOT Available, Enter Card Details Manually Below(or Refresh Page).
                                    </p>
                                </div>
                                : ''
                            }

                            {/* Alert Message when camera available, submission error */}
                            {(submissionError) ?
                                <div className='flex items-center my-1 mb-4 px-2 py-1 leading-5 border-[0.5px] border-[#cc0f35] bg-[#feecf0] rounded-lg shadow-sm'>
                                    <i className="fa-solid fa-exclamation mr-1 text-xxs text-[#cc0f35]"/>
                                    <p className='text-[#cc0f35] text-xxs font-medium'>{submissionError}</p>
                                </div>
                                : ''
                            }

                            {/* Alert Message when camera available, card details scanned and verified */}
                            {(submissionSuccess) ?
                                <div className='flex items-center my-1 mb-4 px-2 py-1 leading-5 border-[0.5px] border-[#257953] bg-[#effaf5] rounded-lg shadow-sm'>
                                    <i className="fa-solid fa-check mr-1 text-xxs text-[#257953]"/>
                                    <p className='text-[#257953] text-xxs font-medium'>{submissionSuccess}</p>
                                </div>
                                : ''
                            }
                        </div>

                        {/* Card Details Form */}
                        {/* {(!hasCamera || scanningError) ?  */}
                            <form onSubmit={formSubmitHandler}>
                                <div className='flex mb-3 justify-between items-center'>
                                <label className="block mb-1 mr-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Promos For:</label>
                                    <select ref={businessIdRef} className='py-1 px-2 w-[70%] text-center text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 bg-center transition-all'>
                                        <option className='text-center text-coolGray-900' value={0}>All</option>
                                        {(business.business) ? 
                                            business.business.map((business, index) =>{
                                                return <option className='text-center text-coolGray-900' key={index} value={business.bus_id}>{business.bus_name}</option>
                                            })
                                            : ""
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <div className="mb-3 mr-3 w-full">
                                        <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Card Number</label>
                                        {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={cardNumRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cardID" type="text" placeholder="7 Character Code" required/>
                                            {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                            {scanningError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                            {submissionSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                            {submissionError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                    </div>
                                    <div className="mb-3  w-full">
                                        <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">CVC</label>
                                        {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={cardCVCRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cvcCode" type="text" placeholder="3 Digit Code" required/>
                                            {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                            {scanningError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                            {submissionSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                                            {submissionError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {/* Errors */}
                                    </div>
                                </div>
                                <div>
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
                            {/* : ''
                        } */}
                        
                        {(scanning) ? <ScanQRCode scanning={scanning} setScannedURL={setScannedURL} setScanningError={setScanningError}/> : ''}
                    </div>
                    {/* <- Scanning Card */}
                    
                    {/* Customer Promos Options -> */}
                    {(customerPromos) ? 
                        <div className='mb-5'>
                            <ul className="flex flex-nowrap overflow-x-auto whitespace-nowrap border-b border-coolGray-200">
                                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${allOptionClassName}`} onClick={() => {setPromoOption('ALL')}}>All</button></li>
                                {(promo.hasExtractedPromoOnScanFromDB && promo.promoOnScan.custom_promo.length > 0) ?
                                    <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${onlyForYouOptionClassName}`} onClick={() => {setPromoOption('ONLY_FOR_YOU')}}>Customer Specials</button></li>
                                    : ""
                                }
                                {/* TODO: AFTER MVP */}
                                {/* <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${todaysTopOptionClassName}`} onClick={() => {setPromoOption('TODAYS_TOP')}}>Today's Top</button></li> */}
                                {/* <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${bestDealOptionClassName}`} onClick={() => {setPromoOption('BEST_DEAL')}}>Best Deal</button></li> */}
                            </ul>
                        </div>
                        : ""
                    }
                    {/* <- Customer Promos Options */}

                    {(customerPromos) ? 
                        <div className='mb-5'>
                            <div className='my-6 mt-8 flex flex-wrap justify-center md:justify-start'>
                                {customerPromos}
                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </section>
    );
}