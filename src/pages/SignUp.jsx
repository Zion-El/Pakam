import Logo from '../assets/Logopakam_logo.png'
import { Link } from 'react-router-dom'
import {React, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Spinner } from '@chakra-ui/react'


const SignUp = () => {


    const navigate = useNavigate()
    // const password = useRef({});
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      });

      const [errors, setErrors] = useState({});
      const [toggle, setToggle] = useState(false)
      const [loading, setLoading] = useState(false)
    


      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };
    


      const handleSubmit = async (event) => {
        
        event.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            console.log("truncated")
          setErrors(validationErrors);
        } else {
            console.log("triggered")
            setLoading(true)
            const data = {
                "username": formData.username,
                "first_name": formData.firstName,
                "last_name": formData.lastName,
                "password": formData.password
            }
    
            try {
              const response = await axios.post('https://assessment.pakam.ng/api/user/register', data, {
                headers: {'Content-Type' : 'application/json'}
              });
              const result = response.data
              console.log(result)
               if (result.message === "Registration successful"){
                toast.success("Registration Successful")
                setLoading(false)
                navigate("/login")
               }else{
                setLoading(false)
                toast.error("Registration failed")
               }

               
            } catch (error) {
              // Handle any errors
              setLoading(false)
              console.error(error);
            }}
          
        }
      
    
      const validateFormData = (data) => {
        const errors = {};
        if (!data.firstName) {
          errors.firstName = 'Please enter your first name';
        }
        if (!data.lastName) {
          errors.lastName = 'Please enter your last name';
        }

        if (!data.username) {
            errors.username = 'Please enter your username';
          } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(data.username)) {
            errors.username = 'username is invalid';
          }
        if (!data.password) {
          errors.password = 'Please enter your password';
        } else if (data.password.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        }else if (!/^(?=.*[A-Z]).{8,}$/.test(data.password)){
            errors.password = 'Password must contain capital letters';
        }

        return errors;
      };
    
 

  return (
    <section className='bg-[#f7f7f4] flex justify-center items-center flex-col gap-10'>

        <div className='bg-white py-16 px-10 rounded-lg'>
            <div className='w-full flex justify-center items-center'>
               <img src={Logo} alt="" /> 
            </div>
            
            <h3 className='text-center font-[700] text-[24px] mb-8'>Create Account</h3>

            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8'>

                <div className='block md:grid grid-cols-2 gap-8'>

                        <div className='mb-6'>
                            <p>First Name</p>
                            <input type="text" placeholder='Enter your First Name' value={formData.firstName} name='firstName' onChange={handleInputChange}  />
                            {errors.firstName && (<p className="error text-[#ff0000]">{errors.firstName}</p> )}
                        </div>
                        <div className='mb-6'>
                            <p>Last Name</p>
                            <input type="text" placeholder='Enter your Last Name' value={formData.lastName} name='lastName' onChange={handleInputChange} />
                            {errors.lastName && (<p className="error text-[#ff0000]">{errors.lastName}</p> )}
                        </div>                        

                        <div className='mb-6'>
                            <p>UserName</p>
                            <input type="text" placeholder='Enter your username' value={formData.username} name='username' onChange={handleInputChange} />
                            {errors.username && (<p className="error text-[#ff0000]">{errors.username}</p> )}
                        </div>
                        <div className='mb-6'>
                            <p>Password</p>
                            <div className='relative '>
                               <input type={toggle? 'text':'password'} placeholder='Enter your password' className='absolute' name='password' value={formData.password}  onChange={handleInputChange}/>
                               <button onClick={()=> setToggle(!toggle)} className='absolute right-5 top-1'>
                                {toggle? <ViewIcon />: <ViewOffIcon/>} 
                               </button>
                            </div>
                            
                            {errors.password && (<p className="error text-[#ff0000]">{errors.password}</p> )}
                        </div>                        




                </div>

                <button type="submit" className='submit bg-[#005700] text-[#fff] h-[40px] rounded-[12px] w-[100%] lg:w-[420px] border-none opacity-50 ' >{ loading? <div> Loading ... <Spinner height='20px' width="20px"/></div> : 'Register' }</button>


            </form>

            <p className='text-center leading-[22px] text-[14px]'>Forgot Password? <Link to='/' className='text-[#005700]'>Retrieve Now</Link> </p>
        </div>

        <div>
            <h4 className='text-[16px] font-[500] text-[#295011] '>Powered by Pakam Technology</h4>
        </div>
    </section>
  )
}

export default SignUp
