import React, { Fragment, useEffect, useState } from "react";
import {
  Home,
  GraduationCap,
  User,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { Menu, Transition } from "@headlessui/react";
import { VscListSelection } from "react-icons/vsc";
import AgentModel from "../components/AgentModel";
import NotificationModel from "../components/NotificationModel";
const Card = ({ children, className = "" }) => (
  <div className={`bg-greyCustom rounded-lg shadow ${className}`}>
    {children}
  </div>
);

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

const Dashboard = () => {
  const filters = ["All Agents", "The Newest", "Top Rated", "Most Popular"];

  // Sample data for the line chart
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("Learning Hours");


  const learningData = [
    { day: "mon", hours: 0 },
    { day: "tue", hours: 1.5 },
    { day: "wed", hours: 2.5 },
    { day: "thu", hours: 1 },
    { day: "fri", hours: 4 },
    { day: "sat", hours: 3 },
    { day: "sun", hours: 2 },
  ];

  const openModal = (id) => {
    const agent = agents.find((agent) => agent.id === id);
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };
  const openNotificatiClose = () => {
    setIsOpenNotification(true);
  };
  const NotificatiClose = () => {
    setIsOpenNotification(false);
  };

  const validProgress = Math.min(100, Math.max(0, 0));
  const dashOffset = 100 - validProgress;

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const agents = [
    {
      id: 1,
      name: "Stock  Researcher",
      svg: "/images/Researcher.svg",
      by: "Purnam",
      time: "6h 30min",
      rating: "4.9",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 2,
      name: "Web Scraper",
      svg: "/images/web.svg",
      by: "Purnam",
      time: "3h 15min",
      rating: "4.7",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 3,
      name: "Instagram Agent",
      svg: "/images/insta.svg",

      by: "Purnam",
      time: "7h 40min",
      rating: "4.6",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 4,
      name: "Image Generator",
      svg: "/images/pencil.svg",
      icon: "🖼️",
      by: "Purnam",
      time: "11h 30min",
      rating: "4.8",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
  ];

  const [chartDimensions, setChartDimensions] = useState({
    width: Math.min(window.screen.width * 0.9, 420),
    height: 266.15,
  });

  useEffect(() => {
    const handleResize = () => {
      setChartDimensions({
        width: Math.min(window.screen.width * 0.9, 420),
        height: 266.15,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex min-h-screen items-center bg-gray-50">
        {/* Sidebar */}
        <div
          className={`py-[24.02px] z-[99]  ${
            isOpen ? "translate-x-[0px]" : "translate-x-[-200px]"
          }  md:translate-x-[0px] absolute md:static pl-[32.34px] h-screen duration-300`}
        >
          <div className="w-auto px-[42.88px] flex flex-col items-center h-full bg-black text-white rounded-[24px] pb-[40.39px]">
            <div className="flex flex-col   items-center py-6 space-y-8">
              <div className="text-[64px] font-sans font-bold">F.</div>
              <Home size={24} />
              <GraduationCap size={24} />
              <User size={24} />
              <Mail size={24} />
              <Settings size={24} />
            </div>
            <div className="mt-auto">
              <LogOut size={24} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 md:p-8 h-screen overflow-y-auto  agentSection">
          {/* Header */}
          <div className="flex items-center pt-[50.25px]  flex-col-reverse lg:flex-row justify-between gap-[63.9px] mb-8">
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

            <div className="w-full xl:w-[50%]  gap-4 ">
              <div className="flex items-center gap-4 mb-[23.67px]">
                <div className="bg-greyCustom w-[100px] md:w-auto flex items-center p-2 sm:p-[10px_15px] rounded-[8px]">
                  <HiMagnifyingGlass />
                  <input
                    className="bg-transparent pl-2 text-gray-500 w-full focus:outline-none focus:border-none"
                    type="text"
                    placeholder="Search"
                  />
                </div>

                <div className="relative">
                  <NotificationModel />
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-[40px] h-[40px] overflow-hidden rounded-[8px] border-2">
                    <img src="images/user.svg" />
                  </div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="text-[#0C0B0B] font-[500] px-[16px] py-[2px] rounded-[8px]  w-max">
                        <FaChevronDown className=" text-[18px] h-auto" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className=" z-50 absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                profile
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                logout
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <VscListSelection
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-4xl block md:hidden font-bold ml-5"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-[23.78px]">
                <Card className="p-4 bg-greyCustom pt-[30.05px] flex-1 flex">
                  <div className=" flex items-center justify-between gap-2 m-auto">
                    <div className="text-4xl font-bold">11</div>
                    <div className="text-[16px] text-[#0C0B0B]">
                      Agents <br /> Working
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-greyCustom  pt-[30.05px] flex-1 flex">
                  <div className=" flex items-center justify-between gap-2 m-auto">
                    <div className="text-4xl font-bold">4</div>
                    <div className="text-[16px] text-[#0C0B0B]">
                      Agents <br /> in progress
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Agent Section */}
          <div className="mb-8 flex flex-col lg:flex-row justify-between gap-[63.9px] ">
            <div className="flex-1">
              <div className="  md:flex justify-between gap-5 h-max items-center mb-4">
                <div className="flex bg-greyCustom flex-1 p-[8px] rounded-[14px] justify-between items-center gap-4  h-max">
                  <div className="flex items-center gap-[29px]">
                    <div className="p-1 bg-white rounded-lg">
                      <img
                        className="min-w-[48px] h-auto"
                        src="images/SlackBack.svg"
                        alt="Slack"
                      />
                    </div>
                    <h6 className="font-[800] agentSection">Slack Agent</h6>
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className="relative w-[40px] h-[40px]">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Background circle */}
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          strokeWidth="2"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-[#0C0B0B]"
                          strokeWidth="2"
                          strokeDasharray="100"
                          strokeDashoffset={dashOffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Centered text */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-sm font-bold text-[#0C0B0B]">
                          {validProgress}%
                        </span>
                      </div>
                    </div>
                    <button className="border-2 font-medium text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      Continue
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 h-max">
                  <button className="rounded-full active:scale-90 hover:text-white hover:bg-black border-2 border-black min-w-[40px] p-1 grid place-content-center min-h-[40px]">
                    <FaArrowRight className="rotate-180" />
                  </button>
                  <button className="rounded-full active:scale-90 hover:text-white hover:bg-black border-2 border-black min-w-[40px] p-1 grid place-content-center min-h-[40px]">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="agentSection">
                <h2 className="text-[24px] font-bold ">Agents</h2>
                <div className="flex gap-[38px] my-[15px] items-center">
                  {filters?.map((elem, i) => (
                    <h4
                      key={i}
                      onClick={() => setSelectedFilter(elem)}
                      className={`text-[16px] font-bold cursor-pointer hover:text-[#0c0b0b] ${
                        selectedFilter === elem
                          ? "text-[#0c0b0b]"
                          : "text-[#b6b6b6]"
                      }`}
                    >
                      {elem}
                    </h4>
                  ))}
                </div>
                <div className="space-y-4">
                  {agents.map((agent, index) => (
                    <Card
                      key={index}
                      className="flex flex-col gap-5 p-4 bg-[#f5f5f7] rounded-[12px] cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="md:flex items-center justify-between">
                        <div className="flex items-center gap-[24px]">
                          <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex items-center justify-center">
                            <img src={agent.svg} alt={agent.name} />
                          </div>
                          <div className="flex flex-col text-nowrap gap-[2px]">
                            <div className="font-bold text-[12px]">
                              {agent.name}
                            </div>
                            <div className="text-[10px] font-light robotoFont text-gray-500">
                              by {agent.by}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between md:justify-normal items-center gap-4">
                          <div className="flex items-center gap-[7px]">
                            <img
                              src={agent.timeImg}
                              alt="time"
                              className="w-[16px] h-[16px]"
                            />
                            <span className="robotoFont text-[13px] font-light">
                              {agent.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-[7px]">
                            <img
                              src={agent.ratingImg}
                              alt="rating"
                              className="w-[16px] h-[16px]"
                            />
                            <span className="robotoFont text-[13px] font-light">
                              {agent.rating}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() => openModal(agent.id)}
                              className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              View agent
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <div className="agentSection xl:w-[50%]">
              <Card className="p-4 bg-transparent shadow-none mb-4 w-full md:min-w-[438.9px]   ">
                <h2 className="text-xl font-bold mb-4">Your statistics</h2>
                <div className="flex justify-between mb-4">
                  <div>
                    <span
                        className={`font-medium cursor-pointer hover:text-black ${
                          activeTab === "Learning Hours" ? "text-black font-bold" : "text-gray-500"
                       }`}
                       onClick={() => setActiveTab("Learning Hours")}
                     >
                       Learning Hours
                    </span>
                    <span
                        className={`font-medium cursor-pointer ml-3 hover:text-black ${
                          activeTab === "My Courses" ? "text-black font-bold" : "text-gray-500"
                        } ml-3`}
                        onClick={() => setActiveTab("My Courses")}
                     >
                      My Courses
                    </span>
                  </div>

                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="text-[#0C0B0B] font-[500] px-[16px] py-[2px] rounded-[8px] bg-greyCustom w-max">
                        Weekly
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className=" z-50 absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Weekly
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Mothly
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <LineChart
                  width={chartDimensions.width}
                  height={chartDimensions.height}
                  data={learningData}
                  className="text-[#0C0B0B]"
                  margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                >
                  <XAxis
                    dataKey="day"
                    stroke="#0C0B0B"
                    tick={{ fill: "#0C0B0B" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="#0C0B0B"
                    tick={{ fill: "#0C0B0B" }}
                  />

                  <Tooltip content={<CustomTooltip />} cursor={false} />

                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#000000"
                    dot={{ stroke: "#000", strokeWidth: 1, fill: "#000" }}
                    strokeWidth={2}
                  />
                </LineChart>
              </Card>
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
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedAgent && (
        <AgentModel closeModal={closeModal} selectedAgent={selectedAgent} />
      )}
    </>
  );
};

export default Dashboard;
