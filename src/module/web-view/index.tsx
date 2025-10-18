import { memo, useState } from "react"
import type { UserData } from "../../service/user"

const WebView = memo(({ userData }: { userData: UserData[] }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const countData: number = userData.length;
    const LIMIT: number = 10
    const styleHeaderTable = "p-4 text-left font-semibold border-b-2 border-blue-700"

    const totalPages = Math.ceil(countData / LIMIT)
    const startIndex = (currentPage - 1) * LIMIT
    const endIndex = startIndex + LIMIT
    const currentData = userData.slice(startIndex, endIndex)

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <div>
            <table className="w-full border-collapse mt-8 bg-white shadow-sm">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className={styleHeaderTable}>Name</th>
                        <th className={styleHeaderTable}>Gender</th>
                        <th className={styleHeaderTable}>Age</th>
                        <th className={styleHeaderTable}>Hobby</th>
                        <th className={styleHeaderTable}>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData?.map((user, index) => (
                        <tr key={user.name + index} className="hover:bg-gray-100 last:border-b-0">
                            <td className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 capitalize">
                                <img loading="lazy" className="rounded-full w-12 h-12" src={user.photo} alt={user.name} />
                                {user.name}
                            </td>
                            <td className="px-4 py-3 border-b border-gray-200 capitalize">{user.gender}</td>
                            <td className="px-4 py-3 border-b border-gray-200 capitalize">{user.age}</td>
                            <td className="px-4 py-3 border-b border-gray-200 capitalize">
                                <div className='flex flex-wrap gap-2'>
                                    {user.hobby.split(',').map((hobby, index) => (
                                        <span key={hobby + index} className="inline-block px-2 py-1 text-white bg-blue-500 rounded-full text-sm font-medium capitalize">{hobby}</span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-3 border-b border-gray-200 capitalize">{user.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-between mt-4 px-4">
                <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, countData)} of {countData} entries
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
})

export default WebView