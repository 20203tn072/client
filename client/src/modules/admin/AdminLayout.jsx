import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { Card } from "flowbite-react";
import UserPage from '../../modules/admin/users/UserPage'

const AdminLayout = () => {
  return (
    <>
      <header>
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <img
              src="data:image/jpeg;base64,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"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#">
              About
            </Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <div className="flex">
        <aside>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                  <Sidebar.Item href="#">Products</Sidebar.Item>
                  <Sidebar.Item href="#">Sales</Sidebar.Item>
                  <Sidebar.Item href="#">Refunds</Sidebar.Item>
                  <Sidebar.Item href="#">Shipping</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item href="#" icon={HiInbox}>
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href={<UserPage/>} icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>

        <main className="w-full">
          <section className="px-4 pt-2 pb-8">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
/*
<Card
                        className="max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://img.freepik.com/vecteurs-premium/espace-travail-bureau-lieu-travail-ordinateur-bureau-travailleur-creatif_228260-73.jpg"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
*/
