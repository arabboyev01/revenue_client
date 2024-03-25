import { useState, useEffect, ChangeEvent, FormEventHandler, FormEvent } from "react"
import { FormValues } from "../LoginFormValidation"

const useForm = (callback: any, validate: any) => {
  const [values, setValues] = useState<Partial<FormValues>>({})
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }
}
export default useForm