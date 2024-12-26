import React, { useMemo } from "react";
import { applicationsData } from "../../helpers/applicationsData"; 
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
  const randomizedApplications = useMemo(() => {
    return [...applicationsData]
      .sort(() => Math.random() - 0.5);
  }, []); 

  return (
    <div className="flex flex-wrap gap-20 items-center justify-center">
      {randomizedApplications.map((application) => (
        <ApplicationCard
          key={application.name}
          img={application.img}
          name={application.name}
        />
      ))}
    </div>
  );
};

export default Applications;
