import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Settings = () => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const [settings, setSettings] = useState({
        user_id: user._id,
        old_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (settings.new_password !== settings.confirm_password) {
            setError("Password not matched");
        } else {
            try {
                setError("");
                const response = await axios.put(
                    "http://localhost:3000/api/settings/change-password",
                    settings,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    {user.role==='employee' ? navigate("/employee-dashboard") : navigate("/admin-dashboard")}
                    setError("")
                }


            } catch (error) {
                if (error.response && !error.response.data.success)
                    setError(error.response.data.error);
            }
        }
    };
    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">Old Password</label>
                    <input
                        type="password"
                        name="old_password"
                        placeholder="Old Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Change Password</button>
            </form>
        </div>
    )
};

export default Settings
