import React, { useEffect, useState, useContext } from 'react'
import { useTapPay } from 'react-native-tappay';
import styles from "./PayForm.module.css"
import { Helmet } from 'react-helmet';
import { UserContext } from "../../../index";

function PayForm() {
    const [cardType, setCardType] = useState('');
    const [validated, setValidated] = useState(false);
    const [hasNumberError, setHasNumberError] = useState(false);
    const [hasExpiryError, setHasExpiryError] = useState(false);
    const [hasCCVError, setHasCCVError] = useState(false); 
    const [paymentResult, setPaymentResult] = useState(null);
    const [primeKey, SetPrimeKey] = useState('');
    const [isLoadedSuccess, TapPay] = useTapPay({ appId: 126860, 
        appKey: "app_ZFhYVNHg3dczlnSMualtrT6e7y7ZMhR1t8HS40wPgh4Hdy6DLafcBhN693f9",
        env: "sandbox" })
    console.log("firstTime" + isLoadedSuccess)
    console.log("testRun")

    const performPay = async(PrimeStr) => {
      return fetch("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "partner_IFz9mEpscF0mhV9nXpnSiALckVxIMs91KtxjfQt33LEDs5VsdCmCo8io",
        },
        body: JSON.stringify({
          prime: PrimeStr,
          partner_key: "partner_IFz9mEpscF0mhV9nXpnSiALckVxIMs91KtxjfQt33LEDs5VsdCmCo8io",
          merchant_id: "ken5475ht_ESUN",
          details: "TapPay Test",
          amount: 1000,
          cardholder: {
            phone_number: "+886923456789",
            name: "王小明",
            email: "LittleMing@Wang.com",
            zip_code: "100",
            address: "台北市天龍區芝麻街1號1樓",
            national_id: "A123456789"
          },
          remember:true
        })
      })};


    const handleCardUpdate = (update) => {
        const { cardType, canGetPrime, status } = update;
        console.log(update)
        setCardType(cardType);
        setValidated(canGetPrime);
        setHasNumberError(status.number === 2);
        setHasExpiryError(status.expiry === 2);
        setHasCCVError(status.ccv === 2);
      };
    
    const handleFormSubmit = async (event) => {
    event.preventDefault();
      const res = await TapPay.getDirectPayPrime();
      console.log(res.prime);
      SetPrimeKey(res.prime);
      if (res.prime) {
        try {
          const response = await performPay(res.prime);
          console.log(response);
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.log(error);
          // Handle the error here, such as displaying an error message to the user
        }
      }
    };
    

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://js.tappaysdk.com/tpdirect/v5.6.0';
        script.async = true;
    
        script.onload = () => {
          TapPay.cardSetup({
            fields: {
              number: {
                element: '#card-number',
                placeholder: '**** **** **** ****'
              },
              expirationDate: {
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
              },
              ccv: {
                element: '#card-ccv',
                placeholder: 'ccv'
              },
            },
            styles: {
              input: {
                height: '30px',
                color: 'gray',
              },
              ':focus': {
                height: '30px',
                color: 'blue',
              },
              '.valid': {
                height: '30px',
                color: 'blue',
              },
              '.invalid': {
                height: '30px',
                color: 'red',
              },
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
              beginIndex: 6,
              endIndex: 11
            }
          });
          
          TapPay.onCardUpdate(handleCardUpdate);
        }
    
        document.head.appendChild(script);
      }, []);

  return (
        <div className={styles.wrapper}>
            <div className={styles.FormCon}>
              <div className={styles.inputCon}>
              <label className={styles.labels}>CardNumbers: </label>
              <div id="card-number"></div>
              </div>
              <div className={styles.inputCon}>
              <label className={styles.labels}>EpxDate:</label>
              <div id="card-expiration-date"></div>
              </div>
              <div className={styles.inputCon}>
              <label className={styles.labels}>CCV: </label>
              <div id="card-ccv"></div>
              </div>
            </div>
            <div className={styles.msgCon}>
            {/* <button onClick={handleFormSubmit}>handleFormSubmit</button> */}
            {/* {validated ? (
              <svg className={`${styles.checkmark} ${styles.animate}`}>
                <path d="M15 30 L30 45 L55 0" />
              </svg>
            ) : null} */}
            </div>
        </div>
    )
  }
export default PayForm