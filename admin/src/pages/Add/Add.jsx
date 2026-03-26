import React from 'react'
import './add.css'
import {assets} from '../../assets/assets'
import { useState,useEffect, } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
  const [image,setImage] = useState(false)
  const [form,setForm] = useState({
    name:"",
    description:"",
    price:"",
    category:"",
    image:""
  })
  const onChangeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',image);
    formData.append('name',form.name);
    formData.append('description',form.description);
    formData.append('price',form.price);
    formData.append('category',form.category);
    const response = await axios.post("http://localhost:4000/api/food/add",formData);
    if(response.data.success){
      setForm({
        name:"",
        description:"",
        price:"",
        category:""
      })
      setImage(false)
      toast.success(response.data.message);
    }else{
      
      toast.error(response.data.message);
    }
    
  }
  useEffect(() => {
    //console.log(form);
  },[form])
  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-product-img-upload">
          <label htmlFor="image">
            {image ? <img className='add-product-img' src={URL.createObjectURL(image)} alt="" /> : <img className='add-product-img' src={assets.upload_area} alt="" />}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </div>
        <div className="add-product-details">
          <div className="add-product-name">
            <p>Product name</p>
            <input type="text" name='name' onChange={onChangeHandler} value={form.name} placeholder='Product Name' />
          </div>
          <div className="add-product-description">
            <p>Product description</p>
            <input type="text" name='description' onChange={onChangeHandler} value={form.description} placeholder='Product Description' />
          </div>
          <div className="add-product-price">
            <p>Product price</p>
            <input type="number" name='price' onChange={onChangeHandler} value={form.price} placeholder='Product Price' />
          </div>
        </div> 
        <div className="add-category-price" >
          <select name="category" onChange={onChangeHandler} value={form.category} id="">
            <option value="">Category</option>
            <option value="Food">Food</option>
            <option value="Drink">Drink</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
            <option value="Salad">Salad</option>
            <option value="Rice">Rice</option>
            <option value="Noodle">Noodle</option>
            <option value="Bread">Bread</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Seafood">Seafood</option>
            <option value="Soup">Soup</option>
            <option value="Sauce">Sauce</option>
            <option value="Spice">Spice</option>
            <option value="Oil">Oil</option>
            <option value="Vinegar">Vinegar</option>
            <option value="Seasoning">Seasoning</option>
            <option value="Other">Other</option>
          </select>
         
        </div>
        
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
      
    </div>
  )
}

export default Add