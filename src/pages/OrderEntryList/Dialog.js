import React,{useState} from 'react';
import { Popup } from 'devextreme-react/popup';
import JobOrder from './JobOrder';
import SampleOrder from './SampleOrder';



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
        title={selectedOrderName+" Entry"}
        width={"100%"}  
        height={"100%"} 
      >
        <div>
          {selectedOrderName==='Job Order' &&
              <JobOrder/>
            }
          {selectedOrderName==='Sample Order' &&
              <SampleOrder/>
            }  
        </div>
        
      </Popup> 
    </div>
  )
}

export default Dialog