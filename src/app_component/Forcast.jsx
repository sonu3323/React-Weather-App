import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



function Forcast({ forcast: [data1, data2, data3, data4] }) {
      
    //Style for conponent
    
    const style ={
        backgroundColor: 'lightgray' ,
        fontWeight: "bold"

    }


    return (

 <Grid>
    <Grid item xs={12}>
        <TableContainer component={Paper}>
            <Table style={style} aria-label="simple table">
                <TableHead >
                    <TableRow >
                        <TableCell>Date:</TableCell>
                        <TableCell align="center">{(data1.date).slice(0, 10)}</TableCell>
                        <TableCell align="center">{(data2.date).slice(0, 10)}</TableCell>
                        <TableCell align="center">{(data3.date).slice(0, 10)}</TableCell>
                        <TableCell align="center">{(data4.date).slice(0, 10)}</TableCell>

                    </TableRow >
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Forcast:</TableCell>
                        <TableCell align="center">Temp: {data1.data}&deg;</TableCell>
                        <TableCell align="center">Temp: {data2.data}&deg;</TableCell>
                        <TableCell align="center">Temp: {data3.data}&deg;</TableCell>
                        <TableCell align="center">Temp: {data4.data}&deg;</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
</Grid>
    );
};

export default Forcast
