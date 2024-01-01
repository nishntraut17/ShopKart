import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentLoading from '../../components/ComponentLoading';
import NoData from "../../components/NoData";

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllApp = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const filteredData = data.filter((ele) => {
                return ele.role === 'pseudoSeller'
            })
            setApplications(filteredData);
            setLoading(false)
        } catch (error) { console.log(error) }
    };

    const acceptUser = async (userId) => {
        try {
            const confirm = window.confirm("Are you sure you want to accept?");
            if (confirm) {
                await toast.promise(
                    axios.put(
                        `http://localhost:5000/api/user/applicationupdate/${userId}`,
                        { role: 'seller' },
                        {
                            headers: {
                                'authorization': `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    ),
                    {
                        success: "Application accepted",
                        error: "Unable to accept application",
                        loading: "Accepting application...",
                    }
                );
                getAllApp();
            }
        } catch (error) {
            return error;
        }
    };

    const deleteUser = async (userId) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete?");
            if (confirm) {
                await toast.promise(
                    axios.put(
                        `http://localhost:5000/api/user/applicationupdate/${userId}`,
                        { role: 'consumer' },
                        {
                            headers: {
                                'authorization': `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    ),
                    {
                        success: "Application rejected",
                        error: "Unable to reject application",
                        loading: "Rejecting application...",
                    }
                );
                getAllApp();
            }
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        getAllApp();
    }, []);

    return (
        <>
            {loading ? (
                <ComponentLoading />
            ) : (
                <section className="">
                    <h3 className=" bg-[#f4f4f4] p-4 border-gray-200 ">All Applications</h3>
                    {applications.length > 0 ? (
                        <div className="">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">S.No</th>
                                        <th className="px-4 py-2">Pic</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications?.map((ele, i) => {
                                        return (
                                            <tr key={ele?._id}>
                                                <td className="px-4 py-2">{i + 1}</td>
                                                <td className="px-4 py-2">
                                                    <img
                                                        className="h-20 w-20"
                                                        src={
                                                            ele?.profileImage ||
                                                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                                        }
                                                        alt={ele?._id}
                                                    />
                                                </td>
                                                <td className="px-4 py-2">{ele?.name}</td>
                                                <td className="px-4 py-2">{ele?.email}</td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        className="border-1 border-gray-300 m-1"
                                                        onClick={() => {
                                                            acceptUser(ele?._id);
                                                        }}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="border-1 border-gray-300 m-1"
                                                        onClick={() => {
                                                            deleteUser(ele?._id);
                                                        }}
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <NoData text={'User'} />
                    )}
                </section>
            )}
        </>
    );
};

export default AdminApplications;
