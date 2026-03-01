import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomPhoneInputProps {
    value: string;
    onChange: (phone: string, countryData?: any) => void;
    country?: string;
    placeholder?: string;
    disabled?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
    value,
    onChange,
    country = 'in',
    placeholder = 'Enter mobile number',
    disabled = false,
}) => {
    return (
        <div className="w-full">
            <PhoneInput
                country={country}
                value={value}
                onChange={(phone, countryData) => onChange(phone, countryData)}
                enableSearch={true}
                disableSearchIcon={true}
                inputStyle={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: '15px',
                    // paddingLeft: '48px' // library handles this
                }}
                buttonStyle={{
                    borderRadius: '8px 0 0 8px',
                    border: '1px solid #ddd',
                    borderRight: 'none',
                    backgroundColor: '#f9f9f9'
                }}
                dropdownStyle={{
                    width: '300px',
                    // fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
                placeholder={placeholder}
                disabled={disabled}
            />
            <style>{`
        .react-tel-input .form-control:focus {
          border-color: #0033cc !important;
          box-shadow: 0 0 0 1px #0033cc !important;
        }
      `}</style>
        </div>
    );
};

export default CustomPhoneInput;
