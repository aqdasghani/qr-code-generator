import React from 'react'

const Header = () => {
    return (

        <div>
            <div className='flex justify-center gap-2 items-center'>
                <h1 className=' text-4xl text-[#2516c7] font-bold py-8'>QR Generator</h1>
                <lord-icon
                    src="https://cdn.lordicon.com/avwubsdy.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#121331,secondary:#2516c7"
                    style={{ width: "50px", height: "50px" }}>
                </lord-icon>

                
            </div>

            

        </div>


    )
}

export default Header
