import Navbar from "../components/Navbar";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";



function Contact() {

     const [selectedCountry, setSelectedCountry] = useState("");
const [selectedState, setSelectedState] = useState("");
const [selectedCity, setSelectedCity] = useState("");

const [formData, setFormData] = useState({
  name: "",
  mobile: "",
  email: "",
  date: "",
  country: "",
  state: "",
  city: "",
  address: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost/react-wp/wp-json/portfolio/v1/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

  toast.success("Enquiry Submitted Successfully!", {
  duration: 4000,
});

    setFormData({
      name: "",
      mobile: "",
      email: "",
      date: "",
      country: "",
      state: "",
      city: "",
      address: "",
      message: "",
    });

    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");

  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong. Please try again.",
    });
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

    <div className="max-w-4xl mx-auto">

  <div className="bg-white rounded-2xl shadow-xl p-8">

   
<div className="text-center mb-10">
  <h1 className="text-5xl font-bold mb-4">
    Let's Work Together
  </h1>

  <p className="text-gray-600 max-w-xl mx-auto">
    Need a WordPress, LMS, or React project?
    Let's connect and build something amazing.
  </p>
</div>
    <form className="space-y-5" onSubmit={handleSubmit}>

  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="block text-sm font-medium mb-2">
        Full Name
      </label>
      <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter Name"
  required
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Mobile Number
      </label>
    <input
  type="tel"
  name="mobile"
  value={formData.mobile}
  onChange={handleChange}
  placeholder="Enter Mobile Number"
  required
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="block text-sm font-medium mb-2">
        Email Address
      </label>
     <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter Email"
  required
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Date
      </label>
     <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  required
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-4">

    <div>
        <label className="block text-sm font-medium mb-2">
  Country
</label>
      <select
  value={selectedCountry}
  required
onChange={(e) => {
  setSelectedCountry(e.target.value);
  setSelectedState("");
  setSelectedCity("");

  setFormData({
    ...formData,
    country: e.target.value,
    state: "",
    city: "",
  });
}}
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
>
  <option value="">Select Country</option>

  {Country.getAllCountries().map((country) => (
    <option
      key={country.isoCode}
      value={country.isoCode}
    >
      {country.name}
    </option>
  ))}
</select>
    </div>

    <div>
        <label className="block text-sm font-medium mb-2">
  State
</label>
     <select
  value={selectedState}
  onChange={(e) => {
  setSelectedState(e.target.value);
  setSelectedCity("");

  setFormData({
    ...formData,
    state: e.target.value,
    city: "",
  });
}}
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
>
  <option value="">Select State</option>

  {State.getStatesOfCountry(selectedCountry).map((state) => (
    <option
      key={state.isoCode}
      value={state.isoCode}
    >
      {state.name}
    </option>
  ))}
</select>
    </div>

    <div>
        <label className="block text-sm font-medium mb-2">
  City
</label>
    <select
  value={selectedCity}
  onChange={(e) => {
    setSelectedCity(e.target.value);

    setFormData({
      ...formData,
      city: e.target.value,
    });
  }}
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
>
  <option value="">Select City</option>

  {City.getCitiesOfState(
  selectedCountry,
  selectedState
).map((city) => (
    <option
      key={city.name}
      value={city.name}
    >
      {city.name}
    </option>
  ))}
</select>
    </div>

  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Address
    </label>
   <textarea
  rows="3"
  name="address"
  value={formData.address}
  onChange={handleChange}
  placeholder="Enter Full Address"
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Message
    </label>
   <textarea
  rows="4"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Tell me about your project..."
  className="w-full border border-gray-200 rounded-xl px-4 py-3"
/>
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
  >
    Submit Enquiry
  </button>

</form>

  </div>

</div>  
    </div>
  );
}

export default Contact;