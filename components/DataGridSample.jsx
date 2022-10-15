import React from 'react'


import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {Box, Button } from '@mui/material';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEditInputCell
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Moment from 'moment';


const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 67,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];



function EditToolbar(props) {
  const { setRows, setRowModesModel,setPage,rows,pageSize } = props;

  const handleClick = () => {
    const id = randomId();
    const rowCount = rows.length;

    setRows((oldRows) => ([...oldRows, { id, name: '', age: '', isNew: true }]));
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name'},
    }));
    setPage(rowCount>0?Math.ceil(rowCount/pageSize):0);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const useMutation = () => {
    return React.useCallback(
        (user) =>
        new Promise((resolve, reject) =>
            setTimeout(() => {
            if (user.name?.trim() === '') {
                reject("name");
            } 
            else if (user.age === '' || user.age <=0) {
                reject("age");
            }
            else {
                resolve(user);
            }
            }, 200),
        ),
        [],
    );
};

function computeMutation(newRow, oldRow) {

    let message = [];
    let i = 0;
   
    if(newRow.name === "" && !oldRow.name){
        message [i]= `Name from '${oldRow.name}' to '${newRow.name}'`;
        i++;
    }
    if (newRow.name !== oldRow.name) {
        message [i]= `Name from '${oldRow.name}' to '${newRow.name}'`;
        i++;
    }
    if (newRow.age !== oldRow.age) {
        message [i]= `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
        i++;
    }
    if (newRow.dateCreated !== oldRow.dateCreated) {
        const oldDateCreated = Moment(oldRow.dateCreated).format("MM/DD/YYYY")
        const newDateCreated = Moment(newRow.dateCreated).format("MM/DD/YYYY")
        message [i]= `Date created from '${oldDateCreated}' to '${newDateCreated}'`;
        i++;
    }
    if (newRow.lastLogin !== oldRow.lastLogin) {
        const oldLastLogin = Moment(oldRow.lastLogin).format("MM/DD/YYYY")
        const newLastLogin = Moment(newRow.lastLogin).format("MM/DD/YYYY")
        message [i]= `lastLogin from '${oldLastLogin || ''}' to '${newLastLogin || ''}'`;
        i++;
    }
    return message.length>0?message:null;
}

function FullFeaturedCrudGrid() {

    const mutateRow = useMutation();
    const noButtonRef = React.useRef(null);
    const [promiseArguments, setPromiseArguments] = React.useState(null);
    
    const [snackbar, setSnackbar] = React.useState(null);
    
    const handleCloseSnackbar = () => setSnackbar(null);
    
    const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
        new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
            // Save the arguments to resolve or reject the promise later
            setPromiseArguments({ resolve, reject, newRow, oldRow });
            

        } else {
            resolve(oldRow); // Nothing was changed
        }
        }),
    [],
    ); 
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  
  const[page,setPage]= React.useState(0)

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setSnackbar({ children: 'User successfully deleted', severity: 'success' });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

/*   const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  }; */


  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true},
    { field: 'age', headerName: 'Age', type: 'number', editable: true },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      console.error(error);
      const errorMsg = "";
      if(error === "name"){
        errorMsg = "Username cannot be blank.";
      }
      if(error === "age"){
        errorMsg = "Age invalid.";
      }
      setSnackbar({ children: errorMsg, severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {

    if (!promiseArguments) {
      return null;
    }


    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);


    if(newRow.name === "" || (newRow.age === '' || newRow.age <= 0)){

        handleYes();
        return null;
    }

    if(oldRow.name === ""){

        handleYes();
        return null;
    }
    
    
    return (
      
        <Dialog
            maxWidth="xs"
            TransitionProps={{ onEntered: handleEntered }}
            open={!!promiseArguments}
        >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent dividers>
            Pressing &quot;Yes&quot; will change {mutation.map((value, key) =>{

                return <div style={{marginTop:"5px"}} key={key}>{value}</div>

            })}
            </DialogContent>
            <DialogActions>
            <Button ref={noButtonRef} onClick={handleNo}>
                No
            </Button>
            <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
  };
  const [pageSize, setPageSize] = React.useState(5);



  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        }
      }}
    >
          {renderConfirmDialog()}
      <DataGrid
        
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        onPageChange={(newPage) => setPage(newPage)}
        page={page}
        pagination
        {...rows}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel,setPage,rows,pageSize },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}



export default FullFeaturedCrudGrid