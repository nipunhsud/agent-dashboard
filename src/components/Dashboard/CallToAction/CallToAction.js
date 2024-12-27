import Card from "../Card/Card";
 
const CallToAction = () => {
    
  
    return (
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-[800] mb-2 pt-[24.02px]">
              Learn even more!
            </h3>
            <p className="text-sm text-[#0C0B0B]">
              Unlock premium features <br /> only for $9.99 per month.
            </p>
            <button className="border-2 font-medium mt-[30px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Go Premium
            </button>
          </div>
          <img
            src="images/xIdea1.svg"
            alt="Learning"
            className="ml-4"
          />
        </div>
      </Card>
    
    );
  };
  
export default CallToAction;

