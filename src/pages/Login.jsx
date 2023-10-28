import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext} from "../context/Authcontext"
import Logo from '../assets/Logopakam_logo.png'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Spinner } from '@chakra-ui/react'
// import { SHA256 } from 'crypto-js';




function Login(props) {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(false);


    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const [errors, setErrors] = useState({});
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };


      const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
            setLoading(true)
            const data = {
                "username": formData.username,
                "password": formData.password, 
            }
    
            try {
              const response = await axios.post('https://assessment.pakam.ng/api/user/login', JSON.stringify(data), {
                headers: {'Content-Type' : 'application/json'}
              });
              const result = response.data
              setLoading(false)
              if (result.message === "Login successful"){
                    const userData = result.data;
                    login(userData);
                    toast.success('Login successful');
                      navigate('/dashboard')

              }else{
                setLoading(false)
                toast.error('Login Unsuccessful')
              }
               
            } catch (error) {
              setLoading(false)
              console.error(error);
            }}
          
        }

      const validateFormData = (data) => {
        const errors = {};
        if (!data.username) {
            errors.username = 'Please enter your username';
          } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(data.username)) {
            errors.username = 'username is invalid';
          }
        if (!data.password) {
          errors.password = 'Please enter your password';
        } else if (data.password.length < 6) {
          errors.password = 'Password must be at least 8 characters long';
        }
        return errors;
      };



    return (

        <section className='bg-[#f7f7f4] flex justify-center items-center flex-col gap-10'>

        <div className='bg-white py-16 px-8 md:px-10 rounded-lg'>
            <div className='w-full flex justify-center items-center'>
               <img src={Logo} alt="" /> 
            </div>
            
            <h3 className='text-center font-[700] text-[24px] mb-8'>Login</h3>

            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8'>

                <div className='gap-8'>                      

                        <div>
                            <p>UserName</p>
                            <input type="text" placeholder='Enter your First Name' name='username' onChange={handleInputChange} />
                            {errors.lastName && (<p className="error text-[#ff0000]">{errors.username}</p> )}
                        </div>
                        <div className='mt-6 mb-12'>
                            <p>Password</p>
                            <div className='relative'>
                               <input type={toggle? 'text':'password'} placeholder='Enter your First Name' className='absolute' name='password' value={formData.password}  onChange={handleInputChange}/>
                               <button onClick={()=> setToggle(!toggle)} className='absolute right-5 top-1'>
                                {toggle? <ViewIcon />: <ViewOffIcon/>} 
                               </button>
                               
                            </div>
                            {errors.lastName && (<p className="error text-[#ff0000]">{errors.password}</p> )}
                        </div>                        

                </div>

                <button type="submit" className='submit bg-[#005700] text-[#fff] h-[40px] rounded-[12px] w-[300px] lg:w-[420px] border-none opacity-50 ' >{ loading? <div> Loading ... <Spinner height='20px' width="20px"/></div> : 'Login' }</button>

            </form>

            <p className='text-center leading-[22px] text-[14px]'>Forgot Password? <Link className='text-[#005700]'>Retrieve Now</Link> </p>
        </div>

        <div>
            <h4 className='text-[16px] font-[500] text-[#295011] '>Powered by Pakam Technology</h4>
        </div>
    </section>
    );
}

export default Login;