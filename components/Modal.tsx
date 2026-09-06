"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title = "Modal",
  children,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#171A21]/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="w-full max-w-[800px] max-h-[800px] h-full rounded-2xl bg-[#1A1D21] p-6 shadow-xl text-white"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              <div className="flex justify-between items-center mb-[60px] pb-[20px] border-b border-b-[rgba(255,255,255,0.1)]">
                <Dialog.Title className="text-[28px] font-medium">
                  {title}
                </Dialog.Title>

                <button
                  onClick={onClose}
                  className="bg-[rgba(255,255,255,0.05)] 
                              border border-[rgba(255,255,255,0.1)] 
                              rounded-full 
                              w-10 h-10 
                              flex items-center justify-center 
                              text-[#9ca3af] 
                              text-[20px] 
                              cursor-pointer 
                              transition-all duration-200 ease-in-out
                              hover:bg-[rgba(74,222,128,0.1)]
                              hover:border-[rgba(74,222,128,0.3)]
                              hover:text-[#4ade80]
                              hover:scale-105"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div>{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
