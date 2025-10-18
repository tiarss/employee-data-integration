import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { createUser } from "../../service/user"
import { useQueryClient } from "@tanstack/react-query"

const useForm = ({ onSubmit }: { onSubmit: () => void }) => {
    const queryClient = useQueryClient()
    const [touched, setTouched] = useState({
        name: false,
        age: false,
        gender: false,
        hobby: false,
        department: false,
    })
    const [error, setError] = useState({
        name: '',
        age: '',
        gender: '',
        hobby: '',
        department: '',
    })
    const [hobbyInput, setHobbyInput] = useState('')
    const [formData, setFormData] = useState<{
        name: string
        age: number
        gender: string
        hobby: string[]
        department: string
    }>({
        name: '',
        age: 0,
        gender: '',
        hobby: [],
        department: '',
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.name || !formData.age || !formData.gender || !formData.hobby || !formData.department) {
            console.error('Please fill in all fields')
            return
        }

        if (formData.age > 40 || formData.age < 20) {
            console.error('Age must be between 40 and 20')
            return
        }

        if (formData.hobby.length === 0) {
            console.error('Please fill in hobby')
            return
        }

        if (formData.hobby.length > 6) {
            console.error('Hobby must be less than 6')
            return
        }

        const hobby = formData.hobby.join(', ') as string

        try {
            const response = await createUser({
                ...formData,
                hobby,
            })

            if (response.error) {
                if (typeof response.message === 'string') {
                    toast.error(response.message)
                } else {
                    Object.entries(response.message).forEach(([field, data]) => {
                        const message = data.join(", ")
                        toast.error(`${field}: ${message}`)
                    })
                }
            } else {
                toast.success("User created successfully")
                setFormData({
                    name: '',
                    age: 0,
                    gender: '',
                    hobby: [],
                    department: '',
                })
                setError({
                    name: '',
                    age: '',
                    gender: '',
                    hobby: '',
                    department: '',
                })
                setTouched({
                    name: false,
                    age: false,
                    gender: false,
                    hobby: false,
                    department: false,
                })
                queryClient.invalidateQueries({ queryKey: ['userData'] })
                onSubmit()
            }
        } catch (error) {
            onSubmit()
            setFormData({
                name: '',
                age: 0,
                gender: '',
                hobby: [],
                department: '',
            })
            setError({
                name: '',
                age: '',
                gender: '',
                hobby: '',
                department: '',
            })
            setTouched({
                name: false,
                age: false,
                gender: false,
                hobby: false,
                department: false,
            })
        }
    }

    useEffect(() => {
        const newErrors = {
            name: '',
            age: '',
            gender: '',
            hobby: '',
            department: '',
        }

        if (formData.name === '' || formData.name.trim() === '' || formData.name === null) {
            newErrors.name = 'Name is required'
        }
        if (formData.age < 20 || formData.age > 40) {
            newErrors.age = 'Age must be between 20 and 40'
        }
        if (formData.gender === '') {
            newErrors.gender = 'Gender is required'
        }
        if (formData.hobby.length === 0) {
            newErrors.hobby = 'Hobby must be filled'
        }
        if (formData.hobby.length > 5) {
            newErrors.hobby = 'Hobby must be less than 5'
        }
        if (formData.department === '') {
            newErrors.department = 'Department is required'
        }

        setError(newErrors)

        return () => {
            setError({
                name: '',
                age: '',
                gender: '',
                hobby: '',
                department: '',
            })
            setTouched({
                name: false,
                age: false,
                gender: false,
                hobby: false,
                department: false,
            })
        }
    }, [formData])

    return {
        formData,
        handleSubmit,
        error,
        touched,
        setFormData,
        setError,
        setTouched,
        setHobbyInput,
        hobbyInput
    }
}

export default useForm