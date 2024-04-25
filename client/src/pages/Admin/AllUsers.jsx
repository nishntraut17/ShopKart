import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentLoading from '../../components/ComponentLoading';
import NoData from "../../components/NoData";
import { selectCurrentUser } from "../../redux/reducers/authSlice";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const getAllApp = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/user/`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const filterData = data.filter((ele) => {
                return ele._id !== currentUser.userId;
            })
            setUsers(filterData);
            setLoading(false)
        } catch (error) { console.log(error) }
    };

    const deleteUser = async (userId) => {
        try {
            const confirm = window.confirm("Are you sure you want to accept?");
            if (confirm) {
                await toast.promise(
                    axios.delete(
                        `${backendUrl}/user/${userId}`,
                        {
                            headers: {
                                'authorization': `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    ),
                    {
                        success: "User Deleted Successfully",
                        error: "Unable to Delete",
                        loading: "please wait...",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <ComponentLoading />
            ) : (
                <section className="">
                    <h3 className="bg-[#f4f4f4] p-4 border-gray-200 ">All Users</h3>
                    {users.length > 0 ? (
                        <table className="text-gray-600 border-gray-200">
                            <thead>
                                <tr className="">
                                    <th className="px-4 py-2">S.No</th>
                                    <th className="px-4 py-2">Pic</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Mobile</th>
                                    <th className="px-4 py-2">Roles</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {users?.map((ele, i) => {
                                    return (
                                        <tr key={ele?._id} className="">
                                            <td className="px-4 py-2">{i + 1}</td>
                                            <td className="px-4 py-2">
                                                <Link to={`/profile/${ele?._id}`}>
                                                    <img
                                                        className="h-20 w-20 border-2 rounded-md"
                                                        src={
                                                            ele?.profileImage ||
                                                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                                        }
                                                        alt={ele?._id}
                                                    />
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2">{ele?.name}</td>
                                            <td className="px-4 py-2">{ele?.email}</td>
                                            <td className="px-4 py-2">{ele?.mobile}</td>
                                            <td className="px-4 py-2">{ele?.role}</td>
                                            <td className="px-4 py-2 flex gap-1 items-center justify-center">
                                                <Link to={`/profile/updateprofile/${ele?._id}`}>
                                                    <button
                                                        className="border-3 border-gray-400 bg-gray-200 rounded p-1"
                                                    >
                                                        Update
                                                    </button>
                                                </Link>
                                                <button
                                                    className="border-3 border-gray-400 bg-gray-200 rounded p-1"
                                                    onClick={() => {
                                                        deleteUser(ele?._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <NoData text={"User"} />
                    )}
                </section>
            )}
        </>
    );
};

export default AllUsers;
