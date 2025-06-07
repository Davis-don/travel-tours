import './paymentpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Paymentpage() {
  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1>Payment Options</h1>
        <p>Choose your preferred payment method below</p>
        
        <div className="automation-notice">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <p>We're working on implementing a more automated payment system for your convenience. Stay tuned for updates!</p>
        </div>
      </header>

      <div className="payment-methods">
        {/* M-PESA Payment Section */}
        <section className="payment-section mpesa-section">
          <div className="payment-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <path fill="#43A047" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30h-4V18h4v16zm8 0h-4V18h4v16z"/>
            </svg>
          </div>
          <h2>Pay with M-PESA (KES)</h2>
          <div className="payment-instructions">
            <ol>
              <li>Go to your <strong>M-PESA</strong> menu</li>
              <li>Select <strong>"Lipa na M-PESA"</strong></li>
              <li>Select <strong>"Buy Goods and Services"</strong></li>
              <li>Enter Till Number: <strong className="till-number">3556118</strong></li>
              <li>Enter the amount you wish to pay</li>
              <li>Enter your M-PESA PIN and confirm</li>
            </ol>
          </div>
          <div className="payment-note">
            <p>You will receive a confirmation message from M-PESA once payment is complete.</p>
          </div>

          <div className="payment-note mt-4  bg-info">
            <p><strong>Do not send money without contacting us first.</strong> We need to verify all details first for security</p>
          </div>
        </section>

        {/* USD Payment Section */}
        <section className="payment-section usd-section">
          <div className="payment-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <path fill="#1976D2" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-1 32h-4V26h4v10zm0-16h-4v-4h4v4zm8 16h-4V26h4v10zm0-16h-4v-4h4v4z"/>
            </svg>
          </div>
          <h2>Pay in USD ($)</h2>
          <div className="payment-instructions">
            <div className="important-note">
              <h3>Important:</h3>
              <p>Before sending any payment, please contact us to confirm payment details.</p>
            </div>
            <ul>
              <li>Call or WhatsApp: <strong>+254 758 420 860</strong></li>
              <li>Confirm payment details before sending</li>
              <li>We will provide you with the USD payment instructions</li>
            </ul>
          </div>
          <div className="payment-note warning">
            <p><strong>Do not send money without contacting us first.</strong> We need to verify the current exchange rate and payment details.</p>
          </div>
        </section>
      </div>

      <footer className="payment-footer">
        <p>Need help with payment? Contact us at <strong>support@example.com</strong> or call <strong>+254 758 420 860</strong></p>
        <div className="improvement-notice">
          <p>We're continuously improving our payment systems for better customer experience.</p>
        </div>
      </footer>
    </div>
  );
}

export default Paymentpage;