import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

function Contact() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await response.json();

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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-700">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Let's Work Together
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Need a WordPress, LMS, or React project? Let's connect and build
            something amazing.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-3xl bg-linear-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <p className="mt-2 text-indigo-100">
                Fill out the form and I'll get back to you within 24 hours.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-lg">
                    ✉️
                  </span>
                  <div>
                    <p className="text-indigo-200">Email</p>
                    <p className="font-medium">hello@deshdeepak.dev</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-lg">
                    📞
                  </span>
                  <div>
                    <p className="text-indigo-200">Phone</p>
                    <p className="font-medium">+91 00000 00000</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-lg">
                    📍
                  </span>
                  <div>
                    <p className="text-indigo-200">Location</p>
                    <p className="font-medium">India</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">
                  in
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">
                  𝕏
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">
                  gh
                </span>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className={labelClass}>Country</label>
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
                      className={inputClass}
                    >
                      <option value="">Select Country</option>
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>State</label>
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
                      className={inputClass}
                    >
                      <option value="">Select State</option>
                      {State.getStatesOfCountry(selectedCountry).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        });
                      }}
                      className={inputClass}
                    >
                      <option value="">Select City</option>
                      {City.getCitiesOfState(
                        selectedCountry,
                        selectedState
                      ).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Address</label>
                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Full Address"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
