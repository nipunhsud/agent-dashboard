import React from "react"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            padding: "2px 4px",
            color: "#333",
            boxShadow: "0px 0px 2px  grey",
          }}
        >
          <p
            style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}
          >{`${label}`}</p>
        </div>
      );
    }
  
    return null;
};


export default CustomTooltip