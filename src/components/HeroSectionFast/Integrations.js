import React, { useMemo } from "react";
import { applicationsData } from "../../helpers/applicationsData"; 
import IntegrationCard from "./IntegrationCard";

const Integrations = () => {
  const randomizedApplications = useMemo(() => {
    return [...applicationsData]
      .sort(() => Math.random() - 0.5);
  }, []); 

  return (
    <div className="flex mt-10 flex-wrap gap-20 items-center justify-center">
      {randomizedApplications.map((application) => (
        <IntegrationCard
          key={application.name}
          img={application.img ?? undefined}
          icon={application.icon?.()}
          name={application.name}
        />
      ))}
    </div>
  );
};

export default Integrations;