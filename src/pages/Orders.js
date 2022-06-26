import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoader(true);

      const result = await getDocs(collection(fireDB, "Orders"));

      const ordersArray = [];

      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoader(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  return (
    <Layout loader={loader} >
      
<div className="p-2">
{orders.map(orders=>{
              return <table className="table mt-3 orders">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                 
                  </tr>
                </thead>
        
                <tbody>
                  {orders.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" />{" "}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                    
                      </tr>
                    );
                  })}
                </tbody>
              </table>
         
      })}
</div>

    </Layout>
  );
}

export default Orders;
