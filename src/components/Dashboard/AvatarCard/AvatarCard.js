import React  from "react";
import Card from "../Card/Card"


const AvatarCard = ({isOpen}) => {
  
  return (
    <Card className="w-full xl:flex-1  pt-[46.62px] pb-[40px] px-[31.5px] bg-[#F5F5F7]">
        <div className="flex items-center relative">
            <div>
                <h1 className="text-2xl font-bold">Hello Josh!</h1>
                <p className="text-gray-500">It's good to see you again.</p>
            </div>
            <img
                  src="images/Illustration.svg"
                  alt="Avatar"
                  className="ml-4 absolute right-0 bottom-[-40px]"
            />
         </div>
    </Card>
  );
};

export default AvatarCard;