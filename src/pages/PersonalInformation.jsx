import React, { useEffect, useState } from "react";
import { db, getDb } from "../firebase-config";
import { getDatabase, ref, set } from "firebase/database";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

const PersonalInformation = () => {
  const [personalInformation, setpersonalInformation] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    country: "",
    street_address: "",
    city: "",
    region: "",
    postal_code: "",
  });

  // https://www.youtube.com/watch?v=F7t-n5c7JsE
  const [personalInformations, setPersonalInformations] = useState([]);

  useEffect(() => {
    getPersonalInfo();
  }, []);

  // useEffect(() => {
  //   console.log(personalInformations);
  // }, [personalInformations]);

  const onChange = (event) => {
    setpersonalInformation((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const SavePersonalInformation = async (event) => {
    try {
      event.preventDefault();
      const personalInfoData = { ...personalInformation };
      personalInfoData.timestamp = serverTimestamp;
      await addDoc(collection(db, "personal-information"), personalInformation);
      console.log(personalInfoData);
      toast.success("Successfully Save Personal Information");
      event.target.reset();
    } catch (error) {
      toast.error("Failed to save personal information!");
    }
  };

  function getPersonalInfo() {
    const personalInfoRef = collection(db, "personal-information");
    getDocs(personalInfoRef)
      .then((res) => {
        const PersonalInformation = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        console.log(PersonalInformation);
        setPersonalInformations(PersonalInformation);
        // console.log(res.docs);
        // const personalInfo = res.docs;
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={SavePersonalInformation}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        onChange={onChange}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        onChange={onChange}
                        name="street_address"
                        id="street_address"
                        autoComplete="street_address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        onChange={onChange}
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autoComplete="postal_code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h2>Display Personal Info</h2>
      <div>
        {personalInformations.map((personalInformation) => (
          <div key={personalInformation.id}>
            {personalInformation.data.first_name} <br />
            {personalInformation.data.last_name} <br />
            {personalInformation.data.email_address} <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;
