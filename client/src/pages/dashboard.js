import * as React from "react"
import { useState } from "react"
import { useEffect } from "react";

export default function Dashboard(){

    const [details ,setDetails] = useState([])
    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const response = await fetch('http://localhost:3000/dashboard', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
    
            });
    
            if (response.ok) {
              const data = await response.json();
              setDetails(data); // Store the data in the state
            } else {
              alert('Failed to fetch patients.');
            }
          } catch (error) {
            alert('An error occurred. Please try again later.');
          }
        };
    
        fetchDetails();
      }, []); 

      console.log(details)
}

