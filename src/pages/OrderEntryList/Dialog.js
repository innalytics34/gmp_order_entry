import React,{useState} from 'react';
import { Popup } from 'devextreme-react/popup';
import JobOrder from './JobOrder';


const Dialog = ({onClose,selectedOrderName}) => {
   
  
  return (
    <div>
      
    <Popup
        visible={true}
        onHiding={onClose}
        dragEnabled={false}
        hideOnOutsideClick={true}
        showCloseButton={true}
        showTitle={true}
        title={selectedOrderName}
        width={"100%"}  
        height={"100%"} 
      >
        <div>
          {selectedOrderName==='Job Order' &&
              <JobOrder/>
            }
        </div>
        
      </Popup> 
    </div>
  )
}

export default Dialog