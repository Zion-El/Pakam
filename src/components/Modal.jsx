import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from '@chakra-ui/react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: '#f7f7f4',
  borderRadius: "12px",
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    fullName: '',
    description: '',
    quantity: '',
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
            name: formData.fullName,
            description: formData.description,
            price: 19.99,
            quantity: formData.quantity
        }

        try {
          const response = await axios.post('https://assessment.pakam.ng/api/product/create', data, {
            headers: {'Content-Type' : 'application/json'}
          });
          const result = response.data
          console.log(result)
           if (result.message === "Product created"){
            toast.success("Product is created successfully")
            const existingList = JSON.parse(localStorage.getItem('productList')) || [];
            console.log(data)
            const newItem = data;
            existingList.push(newItem);
            console.log(existingList)
            localStorage.setItem('productList', JSON.stringify(existingList));

            setLoading(false)
           }else{
            setLoading(false)
            toast.error("Product creation failed")
           }


           
        } catch (error) {
          // Handle any errors
          setLoading(false)
          console.error(error);
        }}
      
    }
  

  const validateFormData = (data) => {
    const errors = {};
    if (!data.fullName) {
      errors.fullName = 'Please enter product name';
    }
    if (!data.description) {
      errors.description = 'Please enter a product description';
    }

    if (!data.quantity) {
        errors.username = 'Please enter your username';
      } 

    return errors;
  };

  

  return (
    <div>
      <Button sx={{backgroundColor:"#005700", color:"#FFF", my:6}} onClick={handleOpen}>Create</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:700, fontFamily:"Raleway", fontSize:24, mb:6}}>
            Create Assessment
          </Typography>
            <form onSubmit={handleSubmit} className=''>

                <div className='block md:grid grid-cols-2 gap-8'>

                        <div className='mb-6'>
                            <p>Full Name</p>
                            <input className="border border-[#005700] w-full" type="text" placeholder='Full name' value={formData.fullName} name='fullName' onChange={handleInputChange}  />
                            {errors.fullName && (<p className="error text-[#ff0000]">{errors.fullName}</p> )}
                        </div>
                        
                        <div className='mb-6'>
                            <p>Description</p>
                            <input className="border border-[#005700] w-full" type="text" placeholder='Enter product description' value={formData.description} name='description' onChange={handleInputChange} />
                            {errors.description && (<p className="error text-[#ff0000]">{errors.description}</p> )}
                        </div>                        

                        <div className='mb-6'>
                            <p>Quantity</p>
                            <input className="border border-[#005700] w-full" type="text" placeholder='Enter quantity' value={formData.quantity} name='quantity' onChange={handleInputChange} />
                            {errors.quantity && (<p className="error text-[#ff0000]">{errors.quantity}</p> )}
                        </div>
                      
                </div>


                <button type="submit" className='create text-[#fff] h-[40px] rounded-[12px]  border-none px-[50px] py-[8px]' >{ loading? <div> Loading ... <Spinner height='20px' width="20px"/></div> : 'Submit' }</button>


            </form>
        </Box>
      </Modal>
    </div>
  );
}