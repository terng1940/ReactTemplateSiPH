import React, { useEffect, useState } from 'react';
import { useStores } from 'contexts/StoreContext';

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

const ModalEditAdmit = ({
    open,
    onClose,
    modalLoading = false,
    row,
    rowDetail = [],
    roomList = [],
    provinceList = [],
    vipLimit = 1,
    onSave
}) => {
    const { updateDetailApiStore, addLicensePlateApiStore } = useStores();
    const [plates, setPlates] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const [initialPlates, setInitialPlates] = useState([]);
    const [initialRoomType, setInitialRoomType] = useState('');
    const [initialRoom, setInitialRoom] = useState('');
    const isEqualPlates = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const isUnchanged = isEqualPlates(plates, initialPlates) && selectedRoom === initialRoom && selectedRoomType === initialRoomType;
    const validate = () => {
        if (!selectedRoomType) {
            alert('กรุณาเลือกประเภทห้อง');
            return false;
        }

        if (!selectedRoom) {
            alert('กรุณากรอกเลขห้อง');
            return false;
        }

        for (let i = 0; i < plates.length; i++) {
            const p = plates[i];

            if (!p.licensePlate?.trim()) {
                alert(`กรุณากรอกทะเบียนรถลำดับที่ ${i + 1}`);
                return false;
            }

            if (!p.province) {
                alert(`กรุณาเลือกจังหวัดของทะเบียนรถลำดับที่ ${i + 1}`);
                return false;
            }
        }

        return true;
    };

    const handleAddPlate = () => {
        if (plates.length >= vipLimit) return;
        setPlates([...plates, { licensePlate: '', province: '' }]);
    };

    const handleRemovePlate = (index) => {
        setPlates(plates.filter((_, i) => i !== index));
    };

    const handlePlateChange = (index, field, value) => {
        const updated = [...plates];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setPlates(updated);
    };

    const handleSave = async () => {
        if (!validate()) return;

        const existingPlates = plates.filter((p) => p.rv_id);
        const newPlates = plates.filter((p) => !p.rv_id);

        await Promise.all([
            ...existingPlates.map((p) =>
                updateDetailApiStore.handleUpdateDetailService({
                    at_id: row.at_id,
                    rv_id: p.rv_id,
                    room_number: selectedRoom,
                    license_plate: p.licensePlate,
                    province: p.province
                })
            ),
            ...newPlates.map((p) =>
                addLicensePlateApiStore.handleAddLicensePlateService({
                    at_id: row.at_id,
                    license_plate: p.licensePlate,
                    province: p.province
                })
            )
        ]);

        onSave();
    };

    useEffect(() => {
        if (!rowDetail.length) return;

        const mapped = rowDetail.map((item) => ({
            rv_id: item.rv_id,
            licensePlate: item.rv_license_plate ?? '',
            province: item.rv_province ?? ''
        }));

        setPlates(mapped);
        setInitialPlates(mapped);
    }, [rowDetail]);

    useEffect(() => {
        if (!row) return;

        setSelectedRoom(row.at_room_number ?? '');
        setInitialRoom(row.at_room_number ?? '');

        const matchedRoom = roomList.find((r) => r.roomDescription === row.rm_description);
        const roomId = matchedRoom?.roomMasterId ?? '';

        setSelectedRoomType(roomId);
        setInitialRoomType(roomId);
    }, [row, roomList]);

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
                            <Grid item xs={5} display="flex" alignItems="center" gap={1}>
                                <TextField
                                    fullWidth
                                    label={`ทะเบียนรถ #${index + 1}`}
                                    value={plate.licensePlate}
                                    onChange={(e) => handlePlateChange(index, 'licensePlate', e.target.value)}
                                />

                                {!plate.rv_id && (
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{
                                            border: '1px solid',
                                            borderRadius: '4px',
                                            px: 1
                                        }}
                                    >
                                        ใหม่
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={5}>
                                <TextField
                                    select
                                    fullWidth
                                    label="จังหวัด"
                                    value={plate.province}
                                    onChange={(e) => handlePlateChange(index, 'province', e.target.value)}
                                >
                                    {provinceList
                                        .sort((a, b) => a.nameTh.localeCompare(b.nameTh, 'th'))
                                        .map((prov) => (
                                            <MenuItem key={prov.id} value={prov.nameTh}>
                                                {prov.nameTh}
                                            </MenuItem>
                                        ))}
                                </TextField>
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
                                onChange={(e) => {
                                    setSelectedRoomType(e.target.value);
                                    setSelectedRoom('');
                                }}
                            >
                                {roomList.map((r) => (
                                    <MenuItem key={r.roomMasterId} value={r.roomMasterId}>
                                        {r.roomDescription}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="เลขห้อง"
                                value={selectedRoom}
                                onChange={(e) => setSelectedRoom(e.target.value)}
                                placeholder="กรอกเลขห้อง"
                                inputProps={{ maxLength: 10 }}
                                disabled={!selectedRoomType}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button variant="contained" onClick={handleSave} disabled={isUnchanged || modalLoading}>
                    {modalLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditAdmit;
