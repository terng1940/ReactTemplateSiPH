import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ModalEditAdmit = ({ open, onClose, row, roomTypes = [], rooms = [], vipLimit = 1, onSave }) => {
    const [plates, setPlates] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    useEffect(() => {
        if (row) {
            setPlates(row.plates || []);
            setSelectedRoomType(row.rm_name || '');
            setSelectedRoom(row.at_room_number || '');
        }
    }, [row]);

    const handleAddPlate = () => {
        if (plates.length >= vipLimit) return;
        setPlates([...plates, '']);
    };

    const handleRemovePlate = (index) => {
        const updated = plates.filter((_, i) => i !== index);
        setPlates(updated);
    };

    const handlePlateChange = (index, value) => {
        const updated = [...plates];
        updated[index] = value;
        setPlates(updated);
    };

    const handleSave = () => {
        onSave({
            ...row,
            plates,
            roomType: selectedRoomType,
            room: selectedRoom
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>แก้ไขข้อมูลผู้ป่วย</DialogTitle>

            <DialogContent dividers>
                <Box mb={2}>
                    <Typography variant="subtitle1">
                        <b>HN:</b> {row?.at_hn_number}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>สถานะ:</b> {row?.at_status}
                    </Typography>
                </Box>

                <Box mb={3}>
                    <Typography variant="h6" mb={1}>
                        ทะเบียนรถ
                    </Typography>

                    {plates.map((plate, index) => (
                        <Grid container spacing={1} alignItems="center" key={index} mb={1}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label={`ทะเบียนรถ #${index + 1}`}
                                    value={plate}
                                    onChange={(e) => handlePlateChange(index, e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton color="error" onClick={() => handleRemovePlate(index)} disabled={plates.length <= 1}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddPlate} disabled={plates.length >= vipLimit}>
                        เพิ่มทะเบียน (สูงสุด {vipLimit})
                    </Button>
                </Box>

                <Box>
                    <Typography variant="h6" mb={1}>
                        ย้ายห้อง
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="ประเภทห้อง"
                                value={selectedRoomType}
                                onChange={(e) => setSelectedRoomType(e.target.value)}
                            >
                                {roomTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="เลขห้อง"
                                value={selectedRoom}
                                onChange={(e) => setSelectedRoom(e.target.value)}
                            >
                                {rooms
                                    .filter((r) => r.type === selectedRoomType)
                                    .map((room) => (
                                        <MenuItem key={room.id} value={room.number}>
                                            {room.number}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button variant="contained" onClick={handleSave}>
                    บันทึก
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditAdmit;
