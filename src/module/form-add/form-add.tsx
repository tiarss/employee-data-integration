import { Button } from "../../components/button"
import useForm from "./useForm"


const FormAdd = ({ onSubmit }: { onSubmit: () => void }) => {
    const { formData, handleSubmit, error, touched, setFormData, setError, setTouched, setHobbyInput, hobbyInput } = useForm({ onSubmit })

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium text-gray-700 text-sm">
                    Full Name<span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className="p-3 border border-gray-300 rounded text-base font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-600"
                />
                {touched.name && error.name && <p className="text-red-600 text-sm m-0 mt-1">{error.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="age" className="font-medium text-gray-700 text-sm">
                    Age (Years)<span className="text-red-600">*</span>
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    required
                    value={formData.age}
                    min={20}
                    max={40}
                    defaultValue={20}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    onFocus={() => setTouched({ ...touched, age: true })}
                    className="p-3 border border-gray-300 rounded text-base font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-600"
                />
                {touched.age && error.age && <p className="text-red-600 text-sm m-0 mt-1">{error.age}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="font-medium text-gray-700 text-sm">
                    Gender<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={(e) => {
                                setFormData({ ...formData, gender: e.target.value })
                                setTouched({ ...touched, gender: true })
                            }}
                            required
                            className="cursor-pointer"
                        />
                        Male
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={(e) => {
                                setFormData({ ...formData, gender: e.target.value })
                                setTouched({ ...touched, gender: true })
                            }}
                            required
                            className="cursor-pointer"
                        />
                        Female
                    </label>
                </div>
                {touched.gender && error.gender && <p className="text-red-600 text-sm m-0 mt-1">{error.gender}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="hobby" className="font-medium text-gray-700 text-sm">
                    Hobby<span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.hobby.map((item, index) => (
                        <span key={index} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm">
                            {item}
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    hobby: formData.hobby.filter((_, i) => i !== index)
                                })}
                                className="bg-transparent border-none text-white text-xl leading-none cursor-pointer p-0 m-0 hover:text-yellow-400"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter your hobby and press comma or Enter"
                    id="hobby"
                    name="hobby"
                    value={hobbyInput}
                    onBlur={() => {
                        if (formData.hobby.length === 0) {
                            setError({ ...error, hobby: 'Hobby must be filled' })
                        }
                        setTouched({ ...touched, hobby: true })
                    }}
                    onChange={(e) => {
                        const value = e.target.value
                        if (value.endsWith(',')) {
                            const newHobby = value.slice(0, -1).trim()
                            if (newHobby && formData.hobby.length < 5) {
                                setFormData({ ...formData, hobby: [...formData.hobby, newHobby] })
                                setHobbyInput('')
                            } else if (formData.hobby.length > 5) {
                                setError({ ...error, hobby: 'You can only add up to 5 hobbies' })
                            }
                        } else {
                            setHobbyInput(value)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            const newHobby = hobbyInput.trim()
                            if (newHobby && formData.hobby.length < 5) {
                                setFormData({ ...formData, hobby: [...formData.hobby, newHobby] })
                                setHobbyInput('')
                            } else if (formData.hobby.length > 5) {
                                setError({ ...error, hobby: 'You can only add up to 5 hobbies' })
                            }
                        }
                    }}
                    className="p-3 border border-gray-300 rounded text-base font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-600"
                />
                {touched.hobby && error.hobby && <p className="text-red-600 text-sm m-0 mt-1">{error.hobby}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="department" className="font-medium text-gray-700 text-sm">
                    Department<span className="text-red-600">*</span>
                </label>
                <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    onBlur={() => setTouched({ ...touched, department: true })}
                    className="p-3 border border-gray-300 rounded text-base font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-gray-600"
                >
                    <option value="" disabled>Select your department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
                {touched.department && error.department && <p className="text-red-600 text-sm m-0 mt-1">{error.department}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={!formData.name || !formData.age || !formData.gender || !formData.hobby || !formData.department}>
                Submit
            </Button>
        </form>
    )
}

export default FormAdd