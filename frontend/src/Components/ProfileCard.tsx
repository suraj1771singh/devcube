import RoomCard from '../Components/RoomCard'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { BiEdit } from 'react-icons/bi'
const ProfileCard = () => {
    let { allRooms } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    return (
        <div className='md:w-[54%] ml-[19.3%] my-[2%] animate-in slide-in-from-bottom-48 ease-in-out duration-500'>
            <div className={`my-1 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl shadow-md overflow-hidden`} >
                {/* profile Div  */}
                <div className='relative flex flex-col'>
                    <div className='absolute left-0 top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32'></div>
                    <div className={`flex pb-4 px-4 items-center justify-between mt-28 `}>
                        <div className={`flex z-20 mt-[-10px]`}>
                            <div className={` border-4 ${drk_theme?"border-bg_dark_sec":"border-bg_light_sec"} w-[120px] h-[120px] rounded-full z-20`}>
                                <img src="./profile.svg" alt="" className='w-full' />
                            </div>
                            <div className='mx-4 py-7'>
                                <h2 className='text-2xl font-bold'>Name Singh</h2>
                                <p className='font-semibold'>@Username</p>
                                <div className='flex mt-2 itemx-center'>
                                    <p className='font-semibold mr-3 text-sm'><span className='text-lg font-bold'>1.3k</span> Followers</p>
                                    <p className='font-semibold ml-3 text-sm'><span className='text-lg font-bold'>1.3k</span> Following</p>
                                </div>
                            </div>
                        </div>
                        <BiEdit className='text-3xl mr-20 mb-10' />
                    </div>
                </div>

                <div className='m-4'>
                    <div className='p-4'>
                        <h2 className='font-bold text-xl'>Bio</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia fuga id repellendus porro, dignissimos at nobis aliquid assumenda ea, vero, consectetur provident optio explicabo eius perferendis culpa adipisci. Laudantium, voluptates?</p>
                    </div>
                    <div className='text-center'>
                        <button className={`mx-3 bg-third_color font-semibold p-2 px-5 rounded-full text-white`} >Hosted</button>
                        <button className={`mx-3 ${drk_theme ? "bg-bg_dark_pri" : "bg-bg_light_pri"} rounded-full p-2 px-5`}>Joined</button>
                    </div>
                </div>
            </div>
            {allRooms?.map((el: any) => <RoomCard key={el.id} data={el} />)}
        </div>
    )
}

export default ProfileCard