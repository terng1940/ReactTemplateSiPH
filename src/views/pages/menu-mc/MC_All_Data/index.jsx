import React, { useEffect, useState, useMemo } from 'react';
import { useStores } from 'contexts/StoreContext';
import { observer } from 'mobx-react-lite';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllDataDTO } from 'dto/get-all-data/GetAllDataDTO';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ModalEditAdmit from './modalEditAdmit';

const McAllData = observer(() => {
    const { getAllDataApiStore, admitRoomDetailApiStore, getProvinceApiStore, getRoomApiStore } = useStores();
    const [openModal, setOpenModal] = useState(false);
    const [rowSelected, setRowSelected] = useState(null);
    const [rowDetail, setRowDetail] = useState(null);
    const [roomList, setRoomList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const [loading, setLoading] = useState(false);

    const columns = useMemo(
        () => [
            { field: 'at_hn_number', headerName: 'HN', flex: 1, minWidth: 150 },
            { field: 'at_room_number', headerName: 'เลขห้อง', flex: 1, minWidth: 120 },
            { field: 'rm_name', headerName: 'ชื่อห้อง', flex: 1, minWidth: 150 },
            { field: 'rm_description', headerName: 'ประเภทห้อง', flex: 1.2, minWidth: 180 },
            { field: 'vip_cars_count', headerName: 'จำนวนรถ VIP', flex: 0.9, minWidth: 130 },
            { field: 'rs_limit_vip_cars', headerName: 'จำนวนรถ VIP สูงสุด', flex: 1.1, minWidth: 160 },
            { field: 'discount_today_count', headerName: 'จำนวนส่วนลดวันนี้', flex: 1, minWidth: 150 },
            { field: 'rs_relative_limit_per_day', headerName: 'ลิมิตญาติ/วัน', flex: 1, minWidth: 120 },
            { field: 'rs_relative_discount_per_time', headerName: 'ส่วนลด/ครั้ง', flex: 1, minWidth: 120 },
            { field: 'at_status', headerName: 'สถานะ', flex: 1, minWidth: 120 },
            {
                field: 'at_discharge_date',
                headerName: 'วันที่ออก',
                flex: 1,
                minWidth: 150,
                valueGetter: (params) => (params.row.at_discharge_date ? params.row.at_discharge_date : '-')
            },
            {
                field: 'actions',
                headerName: 'จัดการ',
                sortable: false,
                flex: 0.8,
                minWidth: 120,
                renderCell: (params) => (
                    <button
                        style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: '#1976d2',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleView(params.row)}
                    >
                        View
                    </button>
                )
            }
        ],
        []
    );

    const handleView = async (row) => {
        setRowSelected(row);
        setLoading(true);
        setOpenModal(true);
        try {
            const result = await admitRoomDetailApiStore.handleAdmitRoomDetailService(row.at_id);
            if (result.error) {
                return;
            }
            const serverResp = result.response;
            setRowDetail(serverResp);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchGetAllData = async () => {
        setLoading(true);
        try {
            const skip = page * pageSize;
            const body = new GetAllDataDTO({ skip, take: 30 });
            const result = await getAllDataApiStore.handleGetAllDataService(body);

            if (result.error) {
                setRows([]);
                setTotal(0);
                return;
            }

            const serverResp = result.response;
            const dataArray = serverResp?.data ?? serverResp ?? [];
            setRows(Array.isArray(dataArray) ? dataArray : []);
            setTotal(serverResp?.total ?? (Array.isArray(dataArray) ? dataArray.length : 0));
        } catch (e) {
            console.error(e);
            setRows([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGetAllData();
    }, [page]);

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
        <Box height={{ xs: '100%', md: 'calc(100vh - 128px)' }} overflow="hidden">
            <Grid display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: '100%' }}>
                <Box display="flex" flexDirection="column" overflow="hidden">
                    <Box height={{ xs: '100%', md: 'auto' }} overflow="auto">
                        <Grid>
                            <Box py={1}>
                                <Paper sx={{ width: '100%', p: 1, overflow: 'visible', height: 'calc(100vh - 350px)' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        getRowId={(row) => row.at_id}
                                        page={page}
                                        onPageChange={(newPage) => setPage(newPage)}
                                        pageSize={pageSize}
                                        paginationMode="server"
                                        rowCount={total}
                                        loading={loading}
                                        disableRowSelectionOnClick
                                        localeText={{ noRowsLabel: 'ไม่มีข้อมูล' }}
                                        sx={{
                                            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
                                            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#E3F2FD' }
                                        }}
                                    />
                                </Paper>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Grid>

            <ModalEditAdmit
                open={openModal}
                onClose={() => setOpenModal(false)}
                row={rowSelected}
                rowDetail={rowDetail?.data ?? []}
                vipLimit={rowSelected?.rs_limit_vip_cars ?? 1}
                roomList={roomList}
                provinceList={provinceList}
                onSave={(updated) => {
                    console.log('Updated Data:', updated);
                    setOpenModal(false);
                }}
            />
        </Box>
    );
});

export default McAllData;
