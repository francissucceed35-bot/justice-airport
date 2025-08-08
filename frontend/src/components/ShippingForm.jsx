import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Country, State, City } from 'country-state-city';

const inputStyles = "mt-1 block w-full bg-white shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md p-2 transition ease-in-out duration-200";

// --- REUSABLE ADDRESS FIELDS COMPONENT ---
const AddressFields = ({ type, formData, onFormChange }) => {
    const countries = Country.getAllCountries();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [phoneCode, setPhoneCode] = useState('');

    useEffect(() => {
        const countryData = countries.find(c => c.name === formData[`${type}Country`]);
        if (countryData) {
            setStates(State.getStatesOfCountry(countryData.isoCode));
            setPhoneCode(countryData.phonecode);
        } else {
            setStates([]);
        }
    }, [formData[`${type}Country`]]);

    useEffect(() => {
        const countryData = countries.find(c => c.name === formData[`${type}Country`]);
        const stateData = states.find(s => s.name === formData[`${type}State`]);
        if (countryData && stateData) {
            setCities(City.getCitiesOfState(countryData.isoCode, stateData.isoCode));
        } else {
            setCities([]);
        }
    }, [formData[`${type}State`]]);

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        let newFormData = { ...formData };
        newFormData[`${type}State`] = '';
        newFormData[`${type}City`] = '';
        if (!countryCode) {
            newFormData[`${type}Country`] = '';
        } else {
            const country = Country.getCountryByCode(countryCode);
            newFormData[`${type}Country`] = country.name;
        }
        onFormChange(newFormData);
    };
    
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        let newFormData = { ...formData };
        newFormData[`${type}City`] = '';
        if (!stateCode) {
            newFormData[`${type}State`] = '';
        } else {
            const countryCode = countries.find(c => c.name === formData[`${type}Country`])?.isoCode;
            const state = State.getStateByCodeAndCountry(stateCode, countryCode);
            newFormData[`${type}State`] = state.name;
        }
        onFormChange(newFormData);
    };

    return (
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div><label htmlFor={`${type}FirstName`} className="block text-sm font-medium text-gray-700">First Name</label><input type="text" name={`${type}FirstName`} value={formData[`${type}FirstName`] || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div><label htmlFor={`${type}LastName`} className="block text-sm font-medium text-gray-700">Last Name</label><input type="text" name={`${type}LastName`} value={formData[`${type}LastName`] || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div><label htmlFor={`${type}Country`} className="block text-sm font-medium text-gray-700">Country</label><select name={`${type}Country`} onChange={handleCountryChange} required className={inputStyles}><option value="">Select Country</option>{countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}</select></div>
            <div><label htmlFor={`${type}State`} className="block text-sm font-medium text-gray-700">State/Province</label><select name={`${type}State`} onChange={handleStateChange} required className={inputStyles}><option value="">Select State</option>{states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}</select></div>
            <div className="sm:col-span-2"><label htmlFor={`${type}City`} className="block text-sm font-medium text-gray-700">City</label><select name={`${type}City`} value={formData[`${type}City`] || ''} onChange={onFormChange} required className={inputStyles}><option value="">Select City</option>{cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}</select></div>
            <div className="sm:col-span-2"><label htmlFor={`${type}Address`} className="block text-sm font-medium text-gray-700">Street Address</label><input type="text" name={`${type}Address`} value={formData[`${type}Address`] || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div><label htmlFor={`${type}Email`} className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" name={`${type}Email`} value={formData[`${type}Email`] || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div><label htmlFor={`${type}Phone`} className="block text-sm font-medium text-gray-700">Phone Number</label><div className='flex mt-1'><span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>+{phoneCode}</span><input type="tel" name={`${type}Phone`} value={formData[`${type}Phone`] || ''} onChange={onFormChange} required className="flex-1 block w-full rounded-none rounded-r-md" /></div></div>
        </div>
    )
}

// --- STEP 3 COMPONENT ---
const ShipmentDetails = ({ formData, onFormChange }) => (
    <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4 border-b pb-2'>Shipment Details</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className='sm:col-span-2'><label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Item Description</label><input type="text" name="itemDescription" value={formData.itemDescription || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div><label htmlFor="weightKg" className="block text-sm font-medium text-gray-700">Weight (KG)</label><input type="number" name="weightKg" value={formData.weightKg || ''} onChange={onFormChange} required className={inputStyles} /></div>
            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Delivery Option</label>
                <fieldset className="mt-2"><div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div className="flex items-center"><input id="doorstep" name="deliveryOption" type="radio" value="Doorstep" onChange={onFormChange} required className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" /><label htmlFor="doorstep" className="ml-3 block text-sm font-medium text-gray-700">Doorstep Delivery</label></div>
                    <div className="flex items-center"><input id="pickup" name="deliveryOption" type="radio" value="Pickup Station" onChange={onFormChange} required className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" /><label htmlFor="pickup" className="ml-3 block text-sm font-medium text-gray-700">Nearest Pickup Station</label></div>
                </div></fieldset>
            </div>
        </div>
    </div>
);

// --- MAIN FORM COMPONENT ---
const ShippingForm = ({ formData, onFormChange, onSubmit }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const animationVariants = { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={animationVariants} initial="initial" animate="animate" exit="exit">
            <AddressFields type="sender" formData={formData} onFormChange={onFormChange} />
            <div className="mt-8 flex justify-end"><button type="button" onClick={nextStep} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Next: Receiver Info</button></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" variants={animationVariants} initial="initial" animate="animate" exit="exit">
            <AddressFields type="receiver" formData={formData} onFormChange={onFormChange} />
            <div className="mt-8 flex justify-between"><button type="button" onClick={prevStep} className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Back</button><button type="button" onClick={nextStep} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Next: Shipment Details</button></div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step3" variants={animationVariants} initial="initial" animate="animate" exit="exit">
            <ShipmentDetails formData={formData} onFormChange={onFormChange} />
            <div className="mt-8 flex justify-between"><button type="button" onClick={prevStep} className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Back</button><button type="submit" className="w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Submit Shipping Request</button></div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ShippingForm;
