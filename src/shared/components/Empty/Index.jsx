import React from 'react';
import { Empty } from 'antd';

export default function Index(props) {
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No se encontraron datos."
        />
    );
}