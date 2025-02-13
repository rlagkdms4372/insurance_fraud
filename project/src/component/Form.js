import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/form.css'; 

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    insured_occupation: '',
    insured_sex: '',
    incident_severity: '',
    collision_type: '',
    incident_state: '',
    number_of_vehicles_involved: '',
    witnesses: '',
    authorities_contacted: '',
    property_damage: '',
    policy_deductable: '',
    total_claim_amount: '',
    property_claim: '',
    vehicle_claim: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // int 변환
    const transformedData = {
      ...formData,
      insured_occupation: parseInt(formData.insured_occupation),
      insured_sex: parseInt(formData.insured_sex),
      incident_severity: parseInt(formData.incident_severity),
      collision_type: parseInt(formData.collision_type),
      incident_state: parseInt(formData.incident_state),
      number_of_vehicles_involved: parseInt(formData.number_of_vehicles_involved),
      witnesses: parseInt(formData.witnesses),
      authorities_contacted: parseInt(formData.authorities_contacted),
      property_damage: parseInt(formData.property_damage),
      policy_deductable: parseInt(formData.policy_deductable.replace(/,/g, '')),
      total_claim_amount: parseInt(formData.total_claim_amount.replace(/,/g, '')),
      property_claim: parseInt(formData.property_claim.replace(/,/g, '')),
      vehicle_claim: parseInt(formData.vehicle_claim.replace(/,/g, ''))
    // navigate('/result'); 
  };

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformedData),
  })
    .then(response => response.json())
    .then(data => {
      console.log(transformedData)
      console.log('Prediction:', data.prediction);
      navigate('/result', { state: { prediction: data.prediction } });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCurrency(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const formatCurrency = (value) => {
    const numberValue = value.replace(/[^0-9.]/g, '');
    const parts = numberValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <div className="form-container">
      <h2>Car Insurance Policy Information Form</h2>
      <br/><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="insured_sex">Insured Sex</label>  
          <div className="form-check">
            <input
              type="radio"
              id="female"
              name="insured_sex"
              value="1"
              checked={formData.insured_sex === "1"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="female" className="form-check-label">Female</label>
          </div>
          
          <div className="form-check">
            <input
              type="radio"
              id="male"
              name="insured_sex"
              value="2"
              checked={formData.insured_sex === "2"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="male" className="form-check-label">Male</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="incident_severity">Incident Severity</label>
          <div className="form-check">
            <input
              type="radio"
              id="trivial_damage"
              name="incident_severity"
              value="1"
              checked={formData.incident_severity === "1"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="trivial_damage" className="form-check-label">Trivial Damage</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="minor_damage"
              name="incident_severity"
              value="2"
              checked={formData.incident_severity === "2"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="minor_damage" className="form-check-label">Minor Damage</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="major_damage"
              name="incident_severity"
              value="3"
              checked={formData.incident_severity === "3"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="major_damage" className="form-check-label">Major Damage</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="total_loss"
              name="incident_severity"
              value="4"
              checked={formData.incident_severity === "4"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="total_loss" className="form-check-label">Total Loss</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="insured_occupation">Insured Occupation</label>
          <select
            id="insured_occupation"
            name="insured_occupation"
            value={formData.insured_occupation}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Insured Occupation</option>
            <option value="1">Machine-Op-Inspct</option>
            <option value="2">Prof-Specialty</option>
            <option value="3">Tech-Support</option>
            <option value="4">Sales</option>
            <option value="5">Exec-Managerial</option>
            <option value="6">Craft-Repair</option>
            <option value="7">Transport-Moving</option>
            <option value="8">Other-Service</option>
            <option value="9">Priv-House-Serv</option>
            <option value="10">Armed-Forces</option>
            <option value="11">Adm-Clerical</option>
            <option value="12">Protective-Serv</option>
            <option value="13">Handlers-Cleaners</option>
            <option value="14">Farming-Fishing</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="collision_type">Collision Type</label>
          <select
            id="collision_type"
            name="collision_type"
            value={formData.collision_type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Collision Type</option>
            <option value="1">Rear Collision</option>
            <option value="2">Side Collision</option>
            <option value="3">Front Collision</option>
            <option value="4">UNSURE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="incident_state">Incident State</label>
          <select
            id="incident_state"
            name="incident_state"
            value={formData.incident_state}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select State</option>
            <option value="1">New York (NY)</option>
            <option value="2">South Carolina (SC)</option>
            <option value="3">West Virginia (WV)</option>
            <option value="4">Virginia (VA)</option>
            <option value="5">North Carolina (NC)</option>
            <option value="6">Pennsylvania (PA)</option>
            <option value="7">Ohio (OH)</option>

            {/* <option value="CA">California (CA)</option>
            <option value="TX">Texas (TX)</option>
            <option value="FL">Florida (FL)</option>
            <option value="IL">Illinois (IL)</option>
            <option value="MI">Michigan (MI)</option>
            <option value="GA">Georgia (GA)</option>
            <option value="NJ">New Jersey (NJ)</option>
            <option value="WA">Washington (WA)</option>
            <option value="AZ">Arizona (AZ)</option>
            <option value="MA">Massachusetts (MA)</option>
            <option value="MD">Maryland (MD)</option>
            <option value="MN">Minnesota (MN)</option>
            <option value="CO">Colorado (CO)</option>
            <option value="OR">Oregon (OR)</option>
            <option value="NV">Nevada (NV)</option> */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="number_of_vehicles_involved">Number of Vehicles Involved</label>
          <input
            type="number"
            id="number_of_vehicles_involved"
            name="number_of_vehicles_involved"
            value={formData.number_of_vehicles_involved}
            onChange={handleChange}
            className="form-control"
            min="0"
            max="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="witnesses">Witnesses</label>
          <input
            type="number"
            id="witnesses"
            name="witnesses"
            value={formData.witnesses}
            onChange={handleChange}
            className="form-control"
            min="0"
            max="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorities_contacted">Authorities Contacted</label>
          <select
            id="authorities_contacted"
            name="authorities_contacted"
            value={formData.authorities_contacted}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Authorities</option>
            <option value="1">Police</option>
            <option value="2">Fire</option>
            <option value="3">Other</option>
            <option value="4">Ambulance</option>
            {/* <option value="None">None</option> */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="property_damage">Property Damage</label>
          <div className="form-control">
            <label>
              <input
                type="radio"
                name="property_damage"
                value="2"
                checked={formData.property_damage === '2'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="property_damage"
                value="1"
                checked={formData.property_damage === '1'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="policy_deductable">Policy Deductable</label>
          <input
            type="text"
            id="policy_deductable"
            name="policy_deductable"
            value={formData.policy_deductable}
            onChange={handleCurrencyChange}
            className="form-control"
            pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
            placeholder="Only Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="total_claim_amount">Total Claim Amount</label>
          <input
            type="text"
            id="total_claim_amount"
            name="total_claim_amount"
            value={formData.total_claim_amount}
            onChange={handleCurrencyChange}
            className="form-control"
            pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
            placeholder="Only Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="property_claim">Property Claim</label>
          <input
            type="text"
            id="property_claim"
            name="property_claim"
            value={formData.property_claim}
            onChange={handleCurrencyChange}
            className="form-control"
            pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
            placeholder="Only Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicle_claim">Vehicle Claim</label>
          <input
            type="text"
            id="vehicle_claim"
            name="vehicle_claim"
            value={formData.vehicle_claim}
            onChange={handleCurrencyChange}
            className="form-control"
            pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
            placeholder="Only Number"
          />
        </div>

        <button type="submit" className="btn-submit">Show Result!</button>
      </form>
    </div>
  );
}

export default Form;
