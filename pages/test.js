import Head from 'next/head';
import Script from 'next/script';

const Test = () => {
  return (
    <div>
      <Head>
        <>
          <script defer="" src="https://code.jquery.com/jquery-3.6.0.min.js" />
          <script defer="" src="//js.hsforms.net/forms/v2.js" />
        </>
      </Head>

      <Script
        id="formembed"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // YOU CAN EDIT THESE VARIABLES
            var priceId = 'price_1JSpk8GHcLROIFMm5rLyfyoX'; // TESTING
            // var priceId = 'price_1KVisAGHcLROIFMm1SabjGaU'; // LIVE
            var successUrl = 'https://www.thecoven.com/free-week-confirmation';
            var cancelUrl = 'https://www.thecoven.com/launch-copy-1234';
            var trialDays = 7;
            // DO NOT EDIT ANYTHING BELOW

            var email = '';
            hbspt.forms.create({
              region: "na1",
              portalId: "6735203",
              formId: "18d36272-39f7-4056-a22c-9fc48b5ea09a",
              inlineMessage: "Your form is submitting",
              onFormSubmit: function($form) { email = $form.find('input[name="email"]').val(); },
              onFormSubmitted: function() {
                window.location.href = "http://localhost:3000/stripe-checkout-subscription".concat("?priceId=").concat(priceId, "&email=").concat(encodeURIComponent( email ), "&successUrl=").concat(encodeURIComponent(successUrl), "&cancelUrl=").concat(encodeURIComponent(cancelUrl), "&trialDays=").concat(trialDays.toString());
                
                // window.location.href = "https://manage.thecoven.com/stripe-checkout-subscription".concat("?priceId=").concat(priceId, "&email=").concat(encodeURIComponent( email ), "&successUrl=").concat(encodeURIComponent(successUrl), "&cancelUrl=").concat(encodeURIComponent(cancelUrl), "&trialDays=").concat(trialDays.toString());
              }
            })
          `
        }}
      />
    </div>
  );
}

export default Test;