const AdminJSMongoose = require('@adminjs/mongoose')

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const Category = require("../models/category");
AdminJS.registerAdapter(AdminJSMongoose);

const express = require("express");
const app = express();

const adminBro = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  branding: {
    companyName: "Shop",
    softwareBrothers: false,
  },
  resources: [
    {
      resource: Product,
      options: {
        parent: {
          name: "Admin Content",
          icon: "InventoryManagement",
        },
        properties: {
          description: {
            type: "richtext",
            isVisible: { list: false, filter: true, show: true, edit: true },
          },
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          title: {
            isTitle: true,
          },
          price: {
            type: "number",
          },
          imagePath: {
            isVisible: { list: false, filter: false, show: true, edit: true },
            components: {
              show: AdminJS.bundle(
                "../components/admin-imgPath-component.jsx"
              ),
            },
          },
        },
      },
    },
    {
      resource: User,
      options: {
        parent: {
          name: "User Content",
          icon: "User",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          username: {
            isTitle: true,
          },
        },
      },
    },
    {
      resource: Order,
      options: {
        parent: {
          name: "User Content",
          icon: "User",
        },
        properties: {
          user: {
            isTitle: true,
          },
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          paymentId: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          address: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          createdAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          cart: {
            isVisible: { list: false, filter: false, show: true, edit: false },
            components: {
              show: AdminJS.bundle("../components/admin-order-component.jsx"),
            },
          },
          "cart.items": {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
            },
          },
          "cart.totalQty": {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
            },
          },
          "cart.totalCost": {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
            },
          },
        },
      },
    },
    {
      resource: Category,
      options: {
        parent: {
          name: "Admin Content",
          icon: "User",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          slug: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          title: {
            isTitle: true,
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        loginWelcome: "Admin Panel Login",
      },
      messages: {
        loginWelcome:
          "Please enter your credentials to log in and manage your website contents",
      },
    },
  },
  dashboard: {
    component: AdminJS.bundle("../components/admin-dashboard-component.jsx"),
  },
});

const ADMIN = {
  email: 'admin@mail.ru',
  password: 'admin',
};

const router = AdminJSExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: 'admin',
  cookiePassword: 'admin',
});

module.exports = router;
