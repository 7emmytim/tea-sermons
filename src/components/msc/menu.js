import { Fragment } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Menu() {
  const menu = [
    { label: "By Most Recent", value: "recent" },
    { label: "By Year", value: "year" },
    { label: "In Ascending Order", value: "asc" },
    { label: "In Descending Order", value: "desc" },
  ];

  const search = new URLSearchParams(window.location.search);

  return (
    <HeadlessMenu as="div" className="relative inline-block text-left">
      <div>
        <HeadlessMenu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sort Sermons
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
        </HeadlessMenu.Button>
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
        <HeadlessMenu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menu.map((item) => {
              return (
                <HeadlessMenu.Item key={item.value}>
                  {({ active }) => (
                    <span
                      onClick={() => search.append("sort", item.value)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </HeadlessMenu.Item>
              );
            })}
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}
