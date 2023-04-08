import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BsShop} from 'react-icons/bs';
import {TbReceipt2, TbZoomMoney} from "react-icons/tb";
import {RiProductHuntFill} from "react-icons/ri";
import {BiCategoryAlt} from "react-icons/bi";


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'budget',
        icon: <TbZoomMoney/>,
      },
    ],
  },

  {
    title: 'Show',
    links: [
      {
        name: 'history',
        icon: <AiOutlineShoppingCart/>,
      },
    ],
  },
  {
    title: 'Manage',
    links: [
      {
        name: 'receipt',
        icon: <TbReceipt2/>,
      },
      {
        name: 'shop',
        icon: <BsShop/>,
      },
      {
        name: 'product',
        icon: <RiProductHuntFill/>,
      },
      {
        name: 'category',
        icon: <BiCategoryAlt/>,
      },
    ],
  },
];
