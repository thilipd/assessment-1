import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Country, State, City } from 'country-state-city';

const intialState = {
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    message: ''
}

const Form = () => {



    const countries = Country.getAllCountries();
    const allStates = State.getAllStates();
    const allCities = City.getAllCities();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [userDetails, setUserDetails] = useState(intialState);

    const { name, email, phone, country, state, city, message } = userDetails;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleChange = (e) => {

        const { value, name } = e.target;
        setUserDetails({ ...userDetails, [name]: value });

        if (name === 'country') {

            let data = countries.filter((v) => (value === v.name));
            let countryCode = (data[0].isoCode)
            let st = allStates.filter((v) => (v.countryCode === countryCode))
            setStates(st)
        }

        if (name === 'state') {
            let data = allStates.filter((v) => (value === v.name));
            console.log(data)
            let stateCode = data[0].isoCode;
            let countryCode = data[0].countryCode;
            let ct = allCities.filter((v) => (v.countryCode === countryCode && v.stateCode === stateCode));
            setCities(ct)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let value in userDetails) {
            console.log(value, userDetails[value])

            if (!userDetails[value]) return toast.error(`${value} is missing, Please fill missing feild`);

            if (value === 'email') {
                if (!userDetails[value].match(validRegex)) {
                    return toast.error('Invalid email, Please enter the correct email id')
                }
            }

            if (value === 'phone') {
                if (userDetails[value].length !== 10) return toast.error('Please Enter 10 digit mobile number')

                if (!(phone.match('[0-9]{10}'))) {
                    return toast.error('Please Enter valid mobile number')
                }
            }
        }

        toast.success(`Hi ${name}, we have recived your details, Thank you!!!`);
        setUserDetails(intialState);
    }



    useEffect(() => { }, []);

    return (
        <div>



            <form>

                <label>
                    <div className="lableContainer">
                        Name
                    </div>
                    <div className="inputContainer">
                        <input
                            onChange={(e) => handleChange(e)}
                            name={'name'}
                            value={name}
                            type="text" />
                    </div>
                </label>
                <br />
                <label>
                    <div className="lableContainer">
                        Email
                    </div>
                    <div className="inputContainer">
                        <input
                            onChange={(e) => handleChange(e)}
                            name={'email'}
                            value={email}
                            type="email" />
                    </div>

                </label>
                <br />
                <label>
                    <div className="lableContainer">
                        Phone
                    </div>
                    <div className="inputContainer">
                        <input
                            inputMode='numeric'
                            onChange={(e) => handleChange(e)}
                            name={'phone'}
                            value={phone}
                            type="text" />
                    </div>
                </label>
                <br />

                <label>
                    <div className="lableContainer">
                        Country
                    </div>
                    <div className="inputContainer">
                        <select
                            value={country}
                            onChange={(e) => handleChange(e)}
                            name={'country'}
                        >
                            <option key={1}>--None--</option>
                            {countries.map((con) => <option id={`${con.isoCode}`} key={con.isoCode}>{con.name}</option>)}
                        </select>
                    </div>
                </label>

                <br />
                <label>
                    <div className="lableContainer">
                        State
                    </div>
                    <div className="inputContainer">

                        <select
                            value={state}
                            onChange={(e) => handleChange(e)}
                            name={'state'}
                        >
                            <option key={1} >--None--</option>
                            {states ? states.map((s) => <option id={`${s.isoCode}`} key={s.isoCode}>{s.name}</option>) : <></>}
                        </select>
                    </div>
                </label>
                <br />
                <label>
                    <div className="lableContainer">
                        City
                    </div>
                    <div className="inputContainer">
                        <select
                            value={city}
                            onChange={(e) => handleChange(e)}
                            name={'city'}
                        >
                            <option key={1} >--None--</option>
                            {cities ? cities.map((c) => <option id={`${c.isoCode}`} key={c.isoCode}>{c.name}</option>) : <></>}
                        </select>

                    </div>
                </label>
                <br />
                <label>
                    <div className="lableContainer">
                        Message
                    </div>
                    <div className="inputContainer">
                        <textarea
                            onChange={(e) => handleChange(e)}
                            name={'message'}
                            value={message}
                            type="text" />
                    </div>
                </label>
                <br /> <br />
                <button onClick={handleSubmit} type='submit'  >Submit</button> <br /> <br /> <br /> <br />

            </form>

        </div >
    )
}

export default Form
