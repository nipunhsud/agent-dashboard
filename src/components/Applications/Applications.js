import React from "react";
import { applicationsData } from "../../helpers/applicationsData"; 
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
  return (
        <div className="flex flex-wrap gap-24 items-center justify-center">
          {applicationsData.map((application, index) => (
            <ApplicationCard
              key={index}
              img={application.img}
              name={application.name}
            />
          ))}
        </div>
  );
};

export default Applications;
