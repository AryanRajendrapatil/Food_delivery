import React from 'react'
import './list.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'

const List = () => {
  const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchList();
  },[]);
  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`,{id});
    if(response.data.success){
      toast.success(response.data.message);
      fetchList();
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <div>
      <div className="list">
        <p>All Food Items</p>
        <table className="list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item,index) => (
              <tr key={index}>
                <td><img src={`${url}/images/` + item.image} alt="" /></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <span className="delete" onClick={() => removeFood(item._id)}>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List