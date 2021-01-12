import React from "react";

const AddressCard = ({
  address,
  addressFieldsActive,
  setAddressFieldsActive,
}) => {
  if (!address) {
    return <div>Loading</div>;
  }
  console.log("heeeee", !address);
  const { city, state, country } = address;
  return (
    <div className="addressCard">
      <p className="addressCard__address">
        {city}, {state}, {country}
      </p>
      <p
        className="addressCard__change"
        type="none"
        size="sm"
        onClick={() => setAddressFieldsActive(!addressFieldsActive)}
      >
        Change
      </p>
    </div>
  );
};

export default AddressCard;
