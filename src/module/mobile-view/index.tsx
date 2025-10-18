import { memo } from "react"
import type { UserData } from "../../service/user"

const MobileView = memo(({ userData }: { userData: UserData[] }) => {
    return (
        <div className="mt-8">
            {userData?.map((user, index) => (
                <div key={user.name + index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <img loading="lazy" className="rounded-full w-16 h-16" src={user.photo} alt={user.name} />
                        <div>
                            <h3 className="font-semibold text-lg capitalize">{user.name}</h3>
                            <p className="text-gray-600 capitalize">{user.gender}, {user.age}</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-gray-500 mb-1">Hobbies</p>
                        <div className='flex flex-wrap gap-2'>
                            {user.hobby.split(',').map((hobby, index) => (
                                <span key={hobby + index} className="inline-block px-2 py-1 text-white bg-blue-500 rounded-full text-sm font-medium capitalize">{hobby}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Department</p>
                        <p className="font-medium capitalize">{user.department}</p>
                    </div>
                </div>
            ))}
        </div>
    )
})

export default MobileView
