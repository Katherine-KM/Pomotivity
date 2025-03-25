import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, getGridDateOperators } from '@mui/x-data-grid';
import { Box } from '@mui/material';


const ReportsTable = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get("https://pomotivity-latest.onrender.com/api/v1/tasks", { withCredentials: true })
      .then((res) => {
        const sortedTasks = [...res.data].sort((a, b) => a.id - b.id);
        const formattedTasks = sortedTasks.map((task) => ({
          ...task, dueDate: new Date(task.dueDate), generatedDate: new Date()
        }))
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 30, type: 'number', },
    {
      field: 'title',
      headerName: 'Task Title',
      width: 120,
    },
    {
      field: 'taskType',
      headerName: 'Task Type',
      width: 100,
    },
    {
      field: 'priorityLevel',
      headerName: 'Priority Level',
      width: 110,
      type: 'number',
    },
    {
      field: 'actualPomodoros',
      headerName: 'Act. Pomodoros',
      width: 140,
      type: 'number',
    },
    {
      field: 'estimatedPomodoros',
      headerName: 'Est. Pomodoros',
      width: 150,
      type: 'number',
    },
    {
      field: 'completed',
      headerName: 'Completed?',
      width: 130,
      type: 'boolean'
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 120,
      type: "date",
    },
    {
      field: 'generatedDate',
      headerName: 'Report Generated Date',
      width: 180,
      type: "dateTime",
    },
    
  ];

  return (
    <Box sx={{ height: 525, width: '100%', marginTop: 6 }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true, } }}
        density='comfortable'
        rows={tasks.map(task => ({ ...task, id: String(task.id) }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ReportsTable;