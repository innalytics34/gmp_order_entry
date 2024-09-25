import React,{useState} from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
} from 'devextreme-react/data-grid';
import DropDownButton from 'devextreme-react/drop-down-button';
import Dialog from './Dialog';

export default function OrdersGrid() {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedOrderName, setselectedOrderName] = useState("");


  const buttonDropDownOptions = { width: 200 };

 
  const handleEditClick = (orderNo) => {
    alert('Edit button clicked for order no:'+orderNo);
  };
  

  const onItemClick = (e) => {
    setselectedOrderName(e.itemData);
    setDialogVisible(true); 
  };


  return (
    <React.Fragment>
      <div className={'content-block'} style={{marginBottom: 20 }}>
      <h2 >Orders Entry List</h2>
      <DropDownButton
              text="Create"
              icon="add"
              dropDownOptions={buttonDropDownOptions}
              items={downloads}
              onItemClick={onItemClick}
            />    
      </div>   
      {isDialogVisible && (
        <Dialog onClose={() => setDialogVisible(false)} selectedOrderName={selectedOrderName}>
        </Dialog>
      )}     

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={dataSource}
        showBorders={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={'orderType'} caption={'Order Type'} hidingPriority={9} />
        <Column dataField={'orderNo'} caption={'Order No'} hidingPriority={8} />
        <Column dataField={'docDate'} caption={'Doc Date'} dataType={'date'} hidingPriority={7} />
        <Column dataField={'constructionDetails'} caption={'Construction Details'} hidingPriority={6} />
        <Column dataField={'orderMeters'} caption={'Order Meters'}  hidingPriority={5} />
        <Column dataField={'invoiceExMillRate'} caption={'Invoice Ex Mill Rate'}  hidingPriority={4} />

        <Column
          caption={'Edit'}
          hidingPriority={3}
          cellRender={(cellData) => {
            return (
              <i
              className="dx-icon-edit"
              style={{ cursor: 'pointer',fontSize: '24px'  }}
              onClick={() => handleEditClick(cellData.data.orderNo)}
            />
            );
          }}
        />
      </DataGrid>
    </React.Fragment>
  );
}

const dataSource = [
  {
    orderType: 'Regular',
    orderNo: '12345',
    docDate: new Date(2023, 9, 22),
    constructionDetails: 'Type A',
    orderMeters: '500',
    invoiceExMillRate: '1500'
  },
  {
    orderType: 'Urgent',
    orderNo: '67890',
    docDate: new Date(2023, 9, 23),
    constructionDetails: 'Type B',
    orderMeters: '1000',
    invoiceExMillRate: '2000'
  }
];

 const downloads = [
  'Own Order',
  'Job Order',
  'Sample Order',
];
