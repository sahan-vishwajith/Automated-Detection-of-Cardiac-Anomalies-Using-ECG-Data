import React from "react";
import Navbar from "../components/navbar";
import page_image from "../photos/page_image.jpg"

export default function Landing() {
    return (
        <div 
            style={{
                backgroundImage: `url(${page_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh', 
            }}
        >
            <Navbar />
            {/* Other components can be added here */}
        </div>
    );
}
