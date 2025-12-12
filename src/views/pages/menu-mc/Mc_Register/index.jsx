import React, { useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline, Send } from '@mui/icons-material';

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

const roomTypes = [
    { label: 'EXECUTIVE', value: 'EXECUTIVE' },
    { label: 'VIP', value: 'VIP' },
    { label: 'DELUXE', value: 'DELUXE' }
];

const McRegister = () => {
    const [hn, setHn] = useState('');
    const [roomType, setRoomType] = useState('');
    const [plates, setPlates] = useState(['']);
    const [submitted, setSubmitted] = useState(false);

    const handlePlateChange = (index, value) => {
        const updated = [...plates];
        updated[index] = value;
        setPlates(updated);
    };

    const addPlate = () => setPlates([...plates, '']);
    const removePlate = (index) => {
        const updated = plates.filter((_, i) => i !== index);
        setPlates(updated);
    };

    const handleSubmit = () => {
        const body = {
            hn,
            roomType,
            plates: plates.filter((plate) => plate.trim() !== '')
        };

        console.log('Submit Data:', body);
        setSubmitted(true);

        // Reset submission status after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
    };

    // Check if form can be submitted
    const canSubmit = hn.trim() !== '' && roomType !== '';

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
                {/* Header with Logo */}
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
                    {/* Form Title */}
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
                        {/* HN Field */}
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

                        {/* Room Type Field */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="ROOM TYPE"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                variant="outlined"
                                required
                            >
                                <MenuItem value="">-- เลือกห้อง --</MenuItem>
                                {roomTypes.map((r) => (
                                    <MenuItem key={r.value} value={r.value}>
                                        {r.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* License Plates Section */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }}>
                                <Typography color="primary" fontWeight="bold">
                                    PATIENT'S CAR LICENSE PLATE
                                </Typography>
                            </Divider>

                            <Box sx={{ mt: 2 }}>
                                {plates.map((plate, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                            gap: 1
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label={`License Plate ${index + 1}`}
                                            value={plate}
                                            onChange={(e) => handlePlateChange(index, e.target.value)}
                                            placeholder="เช่น กข1111"
                                            variant="outlined"
                                            sx={{ flexGrow: 1 }}
                                        />

                                        {plates.length > 1 && (
                                            <IconButton onClick={() => removePlate(index)} color="error" aria-label="Remove plate">
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
                                >
                                    ADD ANOTHER PLATE
                                </Button>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
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

                    {/* Footer Note */}
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
