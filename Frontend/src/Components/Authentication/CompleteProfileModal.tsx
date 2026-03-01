import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdWork, MdSchool } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { MapPinIcon } from "@heroicons/react/24/outline";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface UserProfileData {
  name?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  workStatus?: string;
  currentCity?: string;
  avatar?: string;
  bio?: string;
}


interface CompleteProfileModalProps {
    isOpen: boolean;
    initialData?: UserProfileData;
    onClose: () => void;
    onComplete: (updatedData: UserProfileData) => void;
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({ isOpen, initialData, onClose, onComplete }) => {
    const [fullName, setFullName] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [mobile, setMobile] = useState("");
    const [workStatus, setWorkStatus] = useState("");
    const [city, setCity] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.name || initialData.fullName || "");
            setMobile(initialData.mobile || "");
            setWorkStatus(initialData.workStatus || "");
            setCity(initialData.currentCity || "");
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!mobile || !workStatus || !city) {
            setError("All fields are mandatory.");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName,
                    mobile: mobile.startsWith("+") ? mobile : `+${mobile}`,
                    workStatus,
                    currentCity: city
                })
            });

            const data = await res.json();
            if (data.success) {
                onComplete(data.user);
                onClose();
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("Profile update error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-bold leading-6 text-gray-900 mb-2"
                                >
                                    Complete Your Profile
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 mb-6">
                                        Please provide a few more details to help us find the best jobs for you.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Full Name (with Edit option) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Full Name<span className="text-red-500">*</span>
                                                <span className="ml-2 text-xs text-blue-600 font-normal italic">Is this your correct name?</span>
                                            </label>
                                            <div className="flex items-center justify-between border rounded-lg px-4 py-2 bg-gray-50 border-gray-300">
                                                {isEditingName ? (
                                                    <input
                                                        type="text"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        className="w-full bg-transparent outline-none text-gray-900 font-medium"
                                                        autoFocus
                                                        onBlur={() => {
                                                            setIsEditingName(false);
                                                            // Simple warning via alert or toast could be added here, 
                                                            // but UI-wise let's just show a small text below if changed.
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-900 font-medium">{fullName || "User"}</span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (isEditingName) {
                                                            // Save logic or just toggle
                                                            setIsEditingName(false);
                                                        } else {
                                                            setIsEditingName(true);
                                                        }
                                                    }}
                                                    className="text-xs text-blue-600 font-bold hover:underline ml-2"
                                                >
                                                    {isEditingName ? "DONE" : "EDIT"}
                                                </button>
                                            </div>
                                            {/* Warning if name is being edited or changed */}
                                            {isEditingName && (
                                                <p className="text-[10px] text-orange-600 mt-1 font-medium bg-orange-50 p-1 rounded inline-block">
                                                    ⚠️ Warning: Please ensure this matches your government ID.
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Mobile number<span className="text-red-500">*</span>
                                            </label>
                                            <PhoneInput
                                                country={'in'}
                                                value={mobile}
                                                onChange={(phone) => {
                                                    setMobile(phone);
                                                }}
                                                enableSearch={true}
                                                disableSearchIcon={true}
                                                inputStyle={{
                                                    width: '100%',
                                                    height: '45px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                                    fontSize: '15px',
                                                    paddingLeft: '48px'
                                                }}
                                                buttonStyle={{
                                                    borderRadius: '8px 0 0 8px',
                                                    border: '1px solid #ddd',
                                                    borderRight: 'none',
                                                    backgroundColor: '#f9f9f9'
                                                }}
                                                dropdownStyle={{
                                                    width: '300px',
                                                    zIndex: 1000
                                                }}
                                                placeholder="Enter your mobile number"
                                            />
                                        </div>

                                        {/* Work Status */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Work status<span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {[
                                                    { id: "EXPERIENCED", label: "Experienced", icon: MdWork },
                                                    { id: "FRESHER", label: "Fresher", icon: FaUserGraduate },
                                                    { id: "STUDENT", label: "Student", icon: MdSchool }
                                                ].map((status) => (
                                                    <div
                                                        key={status.id}
                                                        onClick={() => setWorkStatus(status.id)}
                                                        className={`cursor-pointer rounded-lg border p-2 flex flex-col items-center justify-center gap-1 text-center transition-all
                                                            ${workStatus === status.id
                                                                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 text-blue-700'
                                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-600'}`}
                                                    >
                                                        <status.icon className={`h-5 w-5 ${workStatus === status.id ? 'text-blue-600' : 'text-gray-400'}`} />
                                                        <span className="text-xs font-medium">{status.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Current city<span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className="block w-full rounded-lg border border-gray-300 pl-10 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                                    placeholder="Enter your city"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-xs text-red-500 font-medium">{error}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !mobile || !workStatus || !city}
                                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors
                                                ${isSubmitting || !mobile || !workStatus || !city
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                                        >
                                            {isSubmitting ? "Saving..." : "Save & Continue"}
                                        </button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CompleteProfileModal;
