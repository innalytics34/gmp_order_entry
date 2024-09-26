import React,{useState,useEffect} from 'react';
import Button from 'devextreme-react/button';
import Grid from '@mui/material/Grid2';
import { TextBox } from 'devextreme-react/text-box';
import { Validator, RequiredRule} from 'devextreme-react/validator';
import { ValidationGroup } from "devextreme-react/validation-group"
import { SelectBox } from 'devextreme-react/select-box';
import notify from 'devextreme/ui/notify';
import { CircularProgress,} from "@mui/material";
import ToastMessage from '../../ToastMessage.js';
import {getFromAPI,postToAPI} from '../../api/apicall';
import NumberBox from 'devextreme-react/number-box';


const JobOrder = () => {
   const [Reed,setReed]=useState("")
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

   async function fetchOptions() {
    setLoading(true);
    try {
      const response = await getFromAPI("/get_order_type");
      setOrderTypeList(response.orderType)
      const UID=response.orderType.find(item=>item.Description==="Job Order").UID
      setOrderType(UID)
      const response2 = await getFromAPI("/get_pinning_percent");
      setPinningPercentList(response2.PinningPercent)
      const response3 = await getFromAPI("/get_packing_type");
      setPackingTypeList(response3.PackingType)

    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  }

   useEffect(() => {
    fetchOptions();
  }, []);

  function convertToTwoDecimal(value) {
    const num = parseFloat(value);
    return num.toFixed(2);
}
 
  const handleSubmit = async () => {

    setLoading(true); 
    try {
      const data={
        Reed:convertToTwoDecimal(Reed),
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

  return (
    <>
    <ToastMessage showmessage={showMessage} message={message} variant={variant} setShowMessage={setShowMessage}/>  
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
    <div>
      <ValidationGroup id="myValidationGroup">
        <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Reed"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setReed(e.value)}
                    value={Reed}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Customer Name"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setName(e.value)}
                    value={Name}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Pick"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setPick(e.value)}
                    value={Pick}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Construction Details For Billing"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setBilling(e.value)}
                    value={Billing}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Width"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setWidth(e.value)}
                    value={Width}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Agent Name"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setAgentName(e.value)}
                    value={AgentName}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Order Meter"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setOrderMeter(e.value)}
                    value={OrderMeter}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Pick Charge"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setPickCharge(e.value)}
                    value={PickCharge}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="Order Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              value={OrderType}
              onValueChanged={(e)=>setOrderType(e.value)}
              items={OrderTypeList}
              displayExpr="Description" 
              valueExpr="UID"
              disabled
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Fabric Process Rate"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setFabricRate(e.value)}
                    value={FabricRate}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="pinning Percent"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              items={PinningPercentList}
              displayExpr="Description" 
              valueExpr="UID"
              value={PinningPercent}
              onValueChanged={(e)=>setPinningPercent(e.value)}
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <NumberBox
                    stylingMode={defaultStylingMode}
                    label="Confirm Rate"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setConfirmRate(e.value)}
                    value={ConfirmRate}
                    format="#.##"
                    showSpinButtons={true}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </NumberBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="Packing Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              items={PackingTypeList}
              displayExpr="Description" 
              valueExpr="UID"
              value={PackingType}
              onValueChanged={(e)=>setPackingType(e.value)}
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>

                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Remarks"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setRemarks(e.value)}
                    value={Remarks}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>   
                 </Grid>  
        <div style={{display:'flex',justifyContent:'center',marginTop:10}}>
        <Button 
         width={220}
         text="Save"
         type="normal"
         stylingMode={defaultStylingMode}
         onClick={(e) => {
          const validationGroup = e.validationGroup;
        if (validationGroup) {
            const result = validationGroup.validate();
            if (result.isValid) {
                handleSubmit(); 
            } else {
                setMessage("Please fill all required fields correctly.");
                setVariant('info');
                setShowMessage(true);
            }
        }
        }}
        />
            </div>   
        </ValidationGroup>
            </div>
    
          )}
          </>    
                      
  )
}

export default JobOrder