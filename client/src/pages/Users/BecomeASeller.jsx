import React, { useState } from 'react'
import Banner from '../../assets/BecomeSellerBanner.png';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRole } from '../../redux/reducers/authSlice';
import { selectCurrentUser } from '../../redux/reducers/authSlice';
import { useSelector } from 'react-redux'

const BecomeASeller = () => {
    const [isChecked, setIsChecked] = useState(false);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async () => {
        if (!isChecked) {
            toast.error("Please Agree to term and condition to continue");
            return;
        }
        await toast.promise(

            axios.put(`http://localhost:5000/api/user/seller/${user.userId}`, {
                role: 'pseudoSeller'
            }, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            {
                success: "Application Sent Successfully, Your Request Will be process By Admin",
                error: "Unable to send application",
                loading: "sending application...",
            }
        );
        dispatch(updateRole("pseudoSeller"));
        navigate("/");
    }
    return (
        <div className='flex flex-col p-2 sm:p-4 lg:p-16 gap-4'>
            <img src={Banner} alt='banner' />
            <h1 className='text-bold'>Terms & Conditions </h1>
            <p className='text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed velit dignissim sodales ut eu sem integer vitae. Est ullamcorper eget nulla facilisi etiam. Convallis a cras semper auctor neque. Ornare aenean euismod elementum nisi quis eleifend. Velit egestas dui id ornare arcu. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Mattis aliquam faucibus purus in massa tempor nec. Curabitur gravida arcu ac tortor dignissim. Mi sit amet mauris commodo. Mi tempus imperdiet nulla malesuada pellentesque. Vel facilisis volutpat est velit. Euismod quis viverra nibh cras pulvinar. Proin fermentum leo vel orci porta non. Mattis rhoncus urna neque viverra justo nec ultrices dui. Lorem donec massa sapien faucibus et. Sit amet purus gravida quis blandit turpis cursus in. Urna neque viverra justo nec ultrices dui sapien eget mi.
                Non pulvinar neque laoreet suspendisse. Libero id faucibus nisl tincidunt eget nullam non nisi. Arcu odio ut sem nulla pharetra diam. Volutpat blandit aliquam etiam erat velit scelerisque in. Eu feugiat pretium nibh ipsum consequat nisl vel. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Ac auctor augue mauris augue neque gravida in. Aliquet bibendum enim facilisis gravida. Maecenas sed enim ut sem viverra aliquet eget. Massa tincidunt dui ut ornare. Fermentum dui faucibus in ornare quam viverra. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Nulla aliquet porttitor lacus luctus.
                Id nibh tortor id aliquet. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Velit ut tortor pretium viverra suspendisse potenti nullam. Augue ut lectus arcu bibendum. Sit amet facilisis magna etiam tempor. Varius quam quisque id diam vel quam. Eu ultrices vitae auctor eu augue ut lectus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Viverra nibh cras pulvinar mattis nunc sed blandit. Pharetra diam sit amet nisl suscipit. Sed risus pretium quam vulputate dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Nec feugiat nisl pretium fusce. At lectus urna duis convallis convallis tellus. Eu scelerisque felis imperdiet proin fermentum leo. Diam maecenas sed enim ut sem viverra aliquet. Accumsan lacus vel facilisis volutpat est velit.
                Habitant morbi tristique senectus et netus et malesuada. Venenatis a condimentum vitae sapien. Pretium fusce id velit ut tortor pretium viverra suspendisse. Pellentesque elit eget gravida cum sociis. Quam quisque id diam vel quam elementum pulvinar etiam non. Id consectetur purus ut faucibus pulvinar elementum. Ut faucibus pulvinar elementum integer. Auctor neque vitae tempus quam pellentesque. Integer vitae justo eget magna fermentum iaculis eu. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Pharetra convallis posuere morbi leo urna. At in tellus integer feugiat scelerisque varius morbi enim nunc.
                Egestas quis ipsum suspendisse ultrices gravida dictum. Amet nisl purus in mollis nunc sed id semper. Elementum eu facilisis sed odio. Mi eget mauris pharetra et ultrices neque ornare. Magna etiam tempor orci eu lobortis elementum nibh tellus. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Ac turpis egestas integer eget aliquet nibh. Magna sit amet purus gravida quis blandit turpis cursus. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Ut sem viverra aliquet eget sit.
                Neque convallis a cras semper. Pretium viverra suspendisse potenti nullam ac. Quis vel eros donec ac odio tempor orci dapibus ultrices. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. In nibh mauris cursus mattis molestie a iaculis at erat. Velit euismod in pellentesque massa placerat duis. Posuere morbi leo urna molestie at elementum eu facilisis. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Morbi tincidunt ornare massa eget egestas. Ac ut consequat semper viverra nam libero justo laoreet sit. Sodales ut eu sem integer vitae justo.
                Et tortor at risus viverra adipiscing. Consequat interdum varius sit amet mattis vulputate enim. Tristique et egestas quis ipsum. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Pellentesque massa placerat duis ultricies lacus. Diam vel quam elementum pulvinar etiam. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Eget nullam non nisi est sit. A condimentum vitae sapien pellentesque habitant morbi tristique.
            </p>
            <div className='flex flex-row items-center gap-4'>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <p>By applying to become a seller on our platform, you are agreeing to the following terms and conditions.</p>
            </div>

            <button onClick={handleSubmit} className='border-2 border-slate-200 hover:border-slate-300 w-20 rounded-md'>Submit</button>
        </div>
    )
}

export default BecomeASeller