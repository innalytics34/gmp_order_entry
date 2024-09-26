import React,{useState,useEffect,useMemo} from 'react';
import Button from 'devextreme-react/button';
import Grid from '@mui/material/Grid2';
import { TextBox } from 'devextreme-react/text-box';
import { Validator, RequiredRule} from 'devextreme-react/validator';
import { ValidationGroup } from "devextreme-react/validation-group"
import { SelectBox } from 'devextreme-react/select-box';
import notify from 'devextreme/ui/notify';
import { CircularProgress,} from "@mui/material";
import ToastMessage from '../../ToastMessage.js';
import {getFromAPI,postToAPI} from '../../api/apicall.js';
import NumberBox from 'devextreme-react/number-box';


const JobOrder = () => {
   const [WarpCount,setWarpCount]=useState(1)
   const [WeftCount,setWeftCount]=useState(1)
   const [Count,setCount]=useState({})
   const [CountType, setCountType] = useState({});
   const [CountTypeList, setCountTypeList] = useState(['count1','count2']);
   const [MillName, setMillName] = useState({});
   const [MillNameList, setMillNameList] = useState(['mill1','mill2']);
   const [PaymentTerms, setPaymentTerms] = useState({});
   const [PaymentTermsList, setPaymentTermsList] = useState(['Advance','Days']);


   const [Name,setName]=useState("")
   const [Pick,setPick]=useState("")
   const [Billing,setBilling]=useState("")
   const [Width,setWidth]=useState("")
   const [AgentName,setAgentName]=useState("")
   const [OrderMeter,setOrderMeter]=useState("")
   const [PickCharge,setPickCharge]=useState("")
   const [OrderType, setOrderType] = useState('');
   const [OrderTypeList, setOrderTypeList] = useState([]);
   const [FabricRate,setFabricRate]=useState("")
   const [PinningPercent, setPinningPercent] = useState('');
   const [PinningPercentList, setPinningPercentList] = useState([]);
   const [ConfirmRate,setConfirmRate]=useState("")
   const [PackingType, setPackingType] = useState(''); 
   const [PackingTypeList, setPackingTypeList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   const [variant, setVariant] = useState('success');
   const [showMessage, setShowMessage] = useState(false);
   const [Remarks, setRemarks] = useState('');


   const defaultStylingMode = 'outlined';
   const labelMode= 'floating';

   

   useEffect(() => {
    
  }, []);

  function convertToTwoDecimal(value) {
    const num = parseFloat(value);
    return num.toFixed(2);
}
 
  const handleSubmit = async () => {

    setLoading(true); 
    try {
      const data={
        Reed:convertToTwoDecimal(Count),
        Pick:convertToTwoDecimal(Pick),
        Width:convertToTwoDecimal(Width),
        OrderMeter:convertToTwoDecimal(OrderMeter),
        OrderType:OrderTypeList.find(item=>item.Description==="Job Order").Description,
        OrderTypeId: OrderType,
        PinningPercent:PinningPercentList.find(item=>item.UID===PinningPercent).Description,
        PininingPercentID:PinningPercent,
        PackingType:PackingTypeList.find(item=>item.UID===PackingType).Description,
        PackingTypeID:PackingType,
        CustomerName:Name,
        ConstructionBillingDetails:Billing,
        AgentName:AgentName,
        PickCharge:convertToTwoDecimal(PickCharge),
        FabricProcessRate:convertToTwoDecimal(FabricRate),
        ConfirmRate:convertToTwoDecimal(ConfirmRate),
        Remarks
      }
    const result = await postToAPI("/insert_job_order_entry", data);
    if (result.rval> 0) {
      setMessage(result.message);
      setVariant('success');
      setShowMessage(true);
      
    } else {
        setMessage(result.message || "Failed to add team.");
        setVariant('error');
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error adding team:", error);
      setMessage("An error occurred. Please try again.");
      setVariant("error");
      setShowMessage(true);
    } finally {
      setLoading(false); 
    }
  };

  const warpGrid = useMemo(() => {
    let gridMdSize, Parentdirection;
    if (WarpCount === 1) {
      gridMdSize = 12; 
      Parentdirection = 'column';
    } else if (WarpCount === 2) {
      gridMdSize = 6; 
      Parentdirection = 'row';
    } else if (WarpCount === 3) {
      gridMdSize = 4; 
      Parentdirection = 'row';
    } else {
      gridMdSize = 3;
      Parentdirection = 'row';
    }
  
    return (
      <Grid container spacing={0.3} direction={Parentdirection} >
        {Array.from({ length: WarpCount }, (_, index) => (
          <Grid size={{md:gridMdSize,xs:12}}  key={index}>
            <NumberBox
              stylingMode="outlined"
              label={`Count ${index + 1}`}
              labelMode={labelMode}
              onValueChanged={(e) =>
                setCount((prev) => ({ ...prev, [index]: e.value }))
              }
              value={Count[index]}
              format="#"
              showSpinButtons={true}
            />
  
            <SelectBox
              label="Count Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={CountType[index]}
              onValueChanged={(e) =>
                setCountType((prev) => ({ ...prev, [index]: e.value }))
              }
              items={CountTypeList}
            />
  
            <SelectBox
              label="Mill Name"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={MillName[index]}
              onValueChanged={(e) =>
                setMillName((prev) => ({ ...prev, [index]: e.value }))
              }
              items={MillNameList}
            />
  
            <SelectBox
              label="Payment Terms"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={PaymentTerms[index]}
              onValueChanged={(e) =>
                setPaymentTerms((prev) => ({ ...prev, [index]: e.value }))
              }
              items={PaymentTermsList}
            />
          </Grid>
        ))}
      </Grid>
    );
  }, [WarpCount]);
  const weftGrid = useMemo(() => {
    let gridMdSize, Parentdirection;
    if (WeftCount === 1) {
      gridMdSize = 12; 
      Parentdirection = 'column';
    } else if (WeftCount === 2) {
      gridMdSize = 6; 
      Parentdirection = 'row';
    } else if (WeftCount === 3) {
      gridMdSize = 4; 
      Parentdirection = 'row';
    } else {
      gridMdSize = 3;
      Parentdirection = 'row';
    }
  
    return (
      <Grid container spacing={0.3} direction={Parentdirection} >
        {Array.from({ length: WeftCount }, (_, index) => (
          <Grid size={{md:gridMdSize,xs:12}}  key={index}>
            <NumberBox
              stylingMode="outlined"
              label={`Count ${index + 1}`}
              labelMode={labelMode}
              onValueChanged={(e) =>
                setCount((prev) => ({ ...prev, [index]: e.value }))
              }
              value={Count[index]}
              format="#"
              showSpinButtons={true}
            />
  
            <SelectBox
              label="Count Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={CountType[index]}
              onValueChanged={(e) =>
                setCountType((prev) => ({ ...prev, [index]: e.value }))
              }
              items={CountTypeList}
            />
  
            <SelectBox
              label="Mill Name"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={MillName[index]}
              onValueChanged={(e) =>
                setMillName((prev) => ({ ...prev, [index]: e.value }))
              }
              items={MillNameList}
            />
  
            <SelectBox
              label="Payment Terms"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={PaymentTerms[index]}
              onValueChanged={(e) =>
                setPaymentTerms((prev) => ({ ...prev, [index]: e.value }))
              }
              items={PaymentTermsList}
            />
          </Grid>
        ))}
      </Grid>
    );
  }, [WeftCount]);

  return (
    <>
    <ToastMessage showmessage={showMessage} message={message} variant={variant} setShowMessage={setShowMessage}/>  
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
    <div>
        <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={2}>
            <Grid >
            <Button
                width={"100%"}
                text="WARP"
                type="default"
                stylingMode="contained"
              />
          <NumberBox
                    stylingMode={defaultStylingMode}
                    label="No of WARP Count"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setWarpCount(e.value)}
                    value={WarpCount}
                    format="#"
                    max={9}
                    showSpinButtons={true}
                    />
                    {warpGrid}
            </Grid>
            </Grid>

          </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
        <Grid container direction="column" spacing={2}>
        <Grid >
       
      <Button
        width={"100%"}
        text="WEFT"
        type="default"
        stylingMode="contained"
      />
      <NumberBox
        stylingMode="outlined"
        label="No of WARP Count"
        labelMode="static"
        onValueChanged={(e) => setWeftCount(e.value)}
        value={WeftCount}
        format="#"
        max={9}
        showSpinButtons={true}
      />

      {weftGrid}

    </Grid>
  

          </Grid>
          </Grid></Grid>



        
            </div>
    
          )}
          </>    
                      
  )
}

export default JobOrder