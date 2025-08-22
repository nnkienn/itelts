export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        
        {/* LEFT: Billing cycle */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Choose a billing cycle</h2>
          
          {/* Annual */}
          <div className="relative border rounded-lg p-4 mb-3 cursor-pointer hover:border-teal-600">
            <div className="flex items-center gap-3">
              <input type="radio" name="plan" defaultChecked />
              <div>
                <p className="font-semibold text-gray-500">Pay annually</p>
                <p className="text-sm text-gray-600">
                  <span className="line-through">$4.17</span>{" "}
                  <span className="text-teal-700 font-bold">$2.50 / month</span>
                </p>
              </div>
            </div>
            <span className="absolute top-0 right-0 text-xs bg-teal-600 text-white px-2 py-0.5 rounded-bl-lg">
              Best Value
            </span>
          </div>

          {/* Quarterly */}
          <div className="border rounded-lg p-4 mb-3 cursor-pointer hover:border-teal-600">
            <div className="flex items-center gap-3">
              <input type="radio" name="plan" />
              <div>
                <p className="font-semibold text-gray-500">Pay quarterly</p>
                <p className="text-sm text-gray-600">$6.65 / month</p>
              </div>
            </div>
            <span className="absolute right-4 top-4 text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded">
              Save 33%
            </span>
          </div>

          {/* Monthly */}
          <div className="border rounded-lg p-4 cursor-pointer hover:border-teal-600">
            <div className="flex items-center gap-3">
              <input type="radio" name="plan" />
              <div>
                <p className="font-semibold text-gray-500">Pay monthly</p>
                <p className="text-sm text-gray-600">$9.95 / month</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <p className="mt-4 font-bold text-gray-500">Total: $29.97 / year</p>

          {/* Extra info */}
          <div className="mt-4 text-sm text-gray-600 space-y-2">
            <p>💰 100% money-back guarantee</p>
            <p>⏸ Pause or cancel anytime</p>
          </div>
        </div>

        {/* RIGHT: Payment details */}
        <div>vc
          <h2 className="text-xl font-bold mb-4 text-black">Payment details</h2>

          <div className="flex gap-6 border-b mb-4">
            <button className="pb-2 border-b-2 border-teal-600 font-medium text-teal-700 ">
              Credit/debit card
            </button>
            <button className="pb-2 text-gray-500">PayPal</button>
          </div>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Card number"
              className="w-full border rounded p-2 text-gray-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/3 border rounded p-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-1/3 border rounded p-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Postal code"
                className="w-1/3 border rounded p-2 text-gray-500 "
              />
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-4xl font-bold">
              Pay with card
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Your subscription will automatically renew every 1 month. You will be charged 
            $9.95 USD on each renewal until you cancel your subscription. If you cancel, 
            previous charges will not be refunded (unless required by law), but you may 
            continue to use the service until the end of the term you paid for.
          </p>
        </div>
      </div>
    </div>
  );
}
