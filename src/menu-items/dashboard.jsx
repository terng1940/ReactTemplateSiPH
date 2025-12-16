// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';
import RoutePaths from 'routes/routePaths';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        // {
        //     id: 'default',
        //     title: <FormattedMessage id="default" />,
        //     type: 'item',
        //     url: RoutePaths.menuDefault,
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // },
        {
            id: 'allData',
            title: 'ข้อมูลราย MC',
            type: 'item',
            url: RoutePaths.menuAllData,
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'registerMc',
            title: 'สมัครสมาชิก MC',
            type: 'item',
            url: RoutePaths.menudRegister,
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
