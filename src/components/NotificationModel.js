import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function NotificationModel() {
  return (
    <div className=" w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-white" : "text-white/90"}
                group relative inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <img
                className="min-w-[23px] h-auto"
                src="images/notification.svg"
              />
              <div className="grid absolute -right-1 top-0 w-4 h-4 text-[8px] place-content-center rounded-full bg-red-500 text-white">
                1
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[300px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative w-full bg-white p-2 lg:grid-cols-2">
                    <h2 className="text-xl text-center font-bold mb-4">
                      Show notification
                    </h2>
                    <div className=" w-full flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-greyCustom cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          item.name
                        </p>
                        <p className="text-sm text-gray-500">
                          item.description
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
