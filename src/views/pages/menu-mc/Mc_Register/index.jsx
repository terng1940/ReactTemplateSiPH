import React, { useState, useEffect } from 'react';
import { AddCircleOutline, RemoveCircleOutline, Send } from '@mui/icons-material';
import { useStores } from 'contexts/StoreContext';
import { RegisterDTO } from 'dto/register/RegisterDTO';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

const McRegister = () => {
    const { getProvinceApiStore, getRoomApiStore, registerApiStore } = useStores();
    const [hn, setHn] = useState('');
    const [roomMasterId, setRoomType] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [plates, setPlates] = useState([{ plate: '', province: '' }]);

    const handlePlateChange = (index, field, value) => {
        const updated = [...plates];
        updated[index][field] = value;
        setPlates(updated);
    };

    const addPlate = () => {
        if (!selectedRoom) return;
        if (plates.length < selectedRoom.limitCars) {
            setPlates([...plates, { plate: '', province: '' }]);
        }
    };

    const removePlate = (index) => {
        if (plates.length > 1) {
            setPlates(plates.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async () => {
        const roomNumber = 'A001';

        const body = new RegisterDTO({
            hn,
            roomMasterId,
            plates: plates
                .filter((p) => p.plate.trim() !== '')
                .map((p) => ({
                    licensePlate: p.plate,
                    province: p.province
                })),
            roomNumber
        });

        const result = await registerApiStore.handleRegisterService(body);
        if (result.error) {
            return;
        }

        console.log('Submit Data:', result);
        setSubmitted(true);

        setTimeout(() => setSubmitted(false), 3000);
    };

    const canSubmit = hn.trim() !== '' && roomMasterId !== '';

    const handleRoomChange = (value) => {
        setRoomType(value);

        const room = roomList.find((r) => r.roomMasterId === value);
        setSelectedRoom(room);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            const resRoom = await getRoomApiStore.handleGetRoomService();
            const roomData = resRoom?.data ?? resRoom?.response?.data ?? [];
            if (Array.isArray(roomData)) setRoomList(roomData);

            const resProv = await getProvinceApiStore.handleGetProvinceService();
            const list = resProv?.data ?? resProv?.response?.data ?? [];
            if (Array.isArray(list)) setProvinceList(list);
        };

        fetchInitialData();
    }, [getRoomApiStore, getProvinceApiStore]);

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4
            }}
        >
            <Card
                elevation={6}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    borderTop: '6px solid #1976d2'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textAlign: 'center',
                        py: 3,
                        px: 2
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                        🏥
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        J-Park Medical Center
                    </Typography>
                    <Typography variant="subtitle1">In-Patient Department (IPD) Vehicle Registration</Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            color: '#1565c0',
                            fontWeight: 'bold',
                            mb: 4
                        }}
                    >
                        แบบฟอร์มการลงข้อมูลสำหรับห้องรถ IPD
                    </Typography>

                    {submitted && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            ข้อมูลถูกส่งเรียบร้อยแล้ว! ระบบได้บันทึกข้อมูลเรียบร้อย
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="HN (Hospital Number)"
                                value={hn}
                                onChange={(e) => setHn(e.target.value)}
                                placeholder="กรอก HN"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="ROOM TYPE"
                                value={roomMasterId}
                                onChange={(e) => handleRoomChange(e.target.value)}
                                variant="outlined"
                                required
                            >
                                <MenuItem value="">-- เลือกห้อง --</MenuItem>

                                {roomList.map((room) => (
                                    <MenuItem key={room.roomMasterId} value={room.roomMasterId}>
                                        {room.roomDescription} (รถได้ {room.limitCars} คัน)
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }}>
                                <Typography color="primary" fontWeight="bold">
                                    PATIENT'S CAR LICENSE PLATE
                                </Typography>
                            </Divider>

                            <Box sx={{ mt: 2 }}>
                                {plates.map((p, index) => (
                                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        {/* ป้ายทะเบียน */}
                                        <TextField
                                            fullWidth
                                            label={`License Plate ${index + 1}`}
                                            value={p.plate}
                                            onChange={(e) => handlePlateChange(index, 'plate', e.target.value)}
                                            placeholder="เช่น กข 1234"
                                        />

                                        {/* จังหวัด */}
                                        <TextField
                                            select
                                            fullWidth
                                            label="Province"
                                            value={p.province}
                                            onChange={(e) => handlePlateChange(index, 'province', e.target.value)}
                                        >
                                            <MenuItem value="">เลือกจังหวัด</MenuItem>
                                            {provinceList
                                                .sort((a, b) => a.nameTh.localeCompare(b.nameTh, 'th'))
                                                .map((prov) => (
                                                    <MenuItem key={prov.id} value={prov.nameTh}>
                                                        {prov.nameTh}
                                                    </MenuItem>
                                                ))}
                                        </TextField>

                                        {/* ปุ่มลบ */}
                                        {plates.length > 1 && (
                                            <IconButton onClick={() => removePlate(index)} color="error">
                                                <RemoveCircleOutline />
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}

                                <Button
                                    startIcon={<AddCircleOutline />}
                                    onClick={addPlate}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 1 }}
                                    disabled={selectedRoom && plates.length >= selectedRoom.limitCars}
                                >
                                    ADD ANOTHER PLATE
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={<Send />}
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                sx={{
                                    py: 1.5,
                                    px: 6,
                                    fontSize: '1.1rem',
                                    borderRadius: 2
                                }}
                            >
                                SEND REGISTRATION
                            </Button>

                            {!canSubmit && (
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                    * กรุณากรอก HN และเลือกประเภทห้องก่อนส่งข้อมูล
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                        <Typography variant="caption" color="text.secondary" align="center">
                            ระบบลงทะเบียนรถสำหรับผู้ป่วยใน ข้อมูลจะถูกใช้เพื่อการจัดบริการที่เหมาะสม
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};
export default McRegister;
