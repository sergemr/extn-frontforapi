import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import { fetchTasks, putTasks } from "../../services/FetchTask";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import Modal from "../Modal/Modal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: React.FC = () => {
  const [tasks, setTasks] = React.useState([]);
  const [taskNumber, setTaskNumber] = React.useState(3);

  const [openModal, setOpenModal] = React.useState(false);
   
  const [task, setTask] = React.useState<any>(); 

 

  const handleClose = () => {
 
    setOpenModal(false);
  };



  const getData = async () => {
    //
    let tasks1 = await fetchTasks(taskNumber);
    console.log(tasks1);
    setTasks(tasks1);
  };
  const updateData = async (task :any) => {
    console.log("updateData",task);
    await putTasks(task);
    
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [taskNumber]);

  const getModal=(task: any)=>{
    setTask(task);
    setOpenModal(true);
  }
  return (
    <div className={styles.Home} data-testid="Home">
  
      { openModal && <Modal actionFn={updateData} handleCloseFn={handleClose} task={task} title="TestTitle"/>}
      <Card style={{ maxWidth: 1200, margin: "auto" }} >
      <h1>Tasks Exercise</h1>
      <p>Front End Exercise for&nbsp;
       <a target={"_blank;"} href="https://github.com/sergemr/extn-expressjsapi">my ExpressJS RestFull Api</a> in Github</p>
       <p>Source code&nbsp;
       <a target={"_blank;"} href="https://github.com/sergemr/extn-frontforapi">here</a> </p>
      <h2>Displaying {taskNumber} task{`${taskNumber > 1 ?"s":""}`}</h2>
      <TextField
        id="outlined-basic"
        defaultValue={taskNumber}
        onChange={(e) => {
          setTaskNumber(parseInt(e.target.value)); 
        }}
        variant="outlined"
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{ maxWidth: 1200, margin: "auto" }} container spacing={2}>
          {tasks &&
            tasks.map((task: any, index) => {
              return (
                <Grid key={index} item xs={12} md={4} lg={4}>
                  <Item>
                  <Card sx={{  height:375 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://random.imagecdn.app/500/140"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      {task.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {task.UUiD}
                      </Typography>
                    </CardContent>
                    <br/>          <br/>
                    <CardActions style={{margin:'auto'}}>
                      
                      <Button size="small" onClick={e=>getModal(task) }>Learn More</Button>
                    </CardActions>
                    <br/>          <br/>
                    {`${index+1} / ${taskNumber}`}
                  </Card>
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      </Card>
    </div>
  );
};

export default Home;
