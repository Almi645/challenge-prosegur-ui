import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons'

import './styles.css';

export default function MainMenu(props) {
    const linkComponent = (item) => {
        if (item.url === null) {
            return (
                <div className='vertical-center'>
                    <FileOutlined />
                    &nbsp;&nbsp;<span className='align-middle'>{item.name}</span>
                </div>
            );
        }

        return (
            <Link to={item.url} className='vertical-center'>
                <FileOutlined />
                &nbsp;&nbsp;<span className='align-middle'>{item.name}</span>
            </Link>
        );
    };

    const pageRecurive = (item, items) => {
        items.push({
            key: item.key,
            icon: item.icon
        });

        if (item.children?.length > 0) {
            item.children?.map(page => pageRecurive(page, items));
        }
    };

    const menuRecursive = (item) => {
        if (item.children?.length === 0) {
            return {
                key: item.key,
                label: linkComponent(item)
            }
        }
        else
            return {
                key: item.key,
                label: linkComponent(item),
                children: item.children?.map(page => menuRecursive(page))
            }
    };

    return (
        <Menu
            mode='horizontal'
            items={
                props.menus?.map(page => menuRecursive(page))
            }
        />
    );
}