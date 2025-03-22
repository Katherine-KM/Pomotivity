import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, getGridDateOperators } from '@mui/x-data-grid';
import { Box } from '@mui/material';


const ReportsTable = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get("http://localhost:8080/api/v1/tasks", { withCredentials: true })
      .then((res) => {
        const sortedTasks = [...res.data].sort((a, b) => a.id - b.id);
        const formattedTasks = sortedTasks.map((task) => ({
          ...task, dueDate: new Date(task.dueDate)
        }))
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, type: 'number', },
    {
      field: 'title',
      headerName: 'Task Title',
      width: 140,
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
      width: 180,
      type: "dateTime",
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', marginTop: 6 }}>
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