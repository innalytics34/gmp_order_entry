import React,{useState} from 'react';
import Button from 'devextreme-react/button';
import Grid from '@mui/material/Grid2';
import { TextBox } from 'devextreme-react/text-box';
import { Validator, RequiredRule } from 'devextreme-react/validator';
import { SelectBox } from 'devextreme-react/select-box';
import notify from 'devextreme/ui/notify';


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
   const [FabricRate,setFabricRate]=useState("")
   const [PinningPercent, setPinningPercent] = useState(''); 
   const [ConfirmRate,setConfirmRate]=useState("")
   const [PackingType, setPackingType] = useState(''); 

   const defaultStylingMode = 'outlined';
   const labelMode= 'floating';
 
    function showMessage() {
        notify("The button was clicked");
    }

  return (
    <div>
        <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Reed"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setReed(e.value)}
                    value={Reed}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
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
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Pick"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setPick(e.value)}
                    value={Pick}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
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
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Width"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setWidth(e.value)}
                    value={Width}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
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
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Order Meter"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setOrderMeter(e.value)}
                    value={OrderMeter}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Pick Charge"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setPickCharge(e.value)}
                    value={PickCharge}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="Order Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              items={[1,2,3]}
              value={OrderType}
              onValueChanged={(e)=>setOrderType(e.value)}
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Fabric Process Rate"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setFabricRate(e.value)}
                    value={FabricRate}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="pinning Percent"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              items={[22,33,11]}
              value={PinningPercent}
              onValueChanged={(e)=>setPinningPercent(e.value)}
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                <TextBox
                    stylingMode={defaultStylingMode}
                    label="Confirm Rate"
                    labelMode={labelMode}
                    onValueChanged={(e)=>setConfirmRate(e.value)}
                    value={ConfirmRate}
                    >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </TextBox>
                 </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                 <SelectBox
              label="Packing Type"
              labelMode={labelMode}
              stylingMode={defaultStylingMode}
              items={["Role","Base"]}
              value={PackingType}
              onValueChanged={(e)=>setPackingType(e.value)}
            >
                  <Validator>
                    <RequiredRule />
                  </Validator>
              </SelectBox>
                 </Grid>
                 </Grid>  
        <div style={{display:'flex',justifyContent:'center',marginTop:10}}>
        <Button 
         width={220}
         text="Save"
         type="normal"
         stylingMode={defaultStylingMode}
         onClick={showMessage}
        />
            </div>         
                
                
    </div>
  )
}

export default JobOrder