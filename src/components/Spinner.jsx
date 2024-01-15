import React from 'react';
import Walk from "./../picFolder/Walk.gif"

function Spinner() {
    return (
      <div className='text-center mt-5'>
        <img className='my-5' src={Walk} alt="Loading" width={100} height={100} />
      </div>
    )
}

export default Spinner
