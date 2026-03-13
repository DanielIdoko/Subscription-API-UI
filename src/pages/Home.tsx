import React, { lazy, useState } from "react";
import Header from "../components/Header";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "../components/ui/Card";
import { SiMastercard } from "react-icons/si";
import { FiClock, FiEye, FiEyeOff, FiPlus } from "react-icons/fi";
import { reactImg } from "../assets";

// const BalanceCard = lazy(() => import("../components/BalanceCard"));

const Home = () => {
  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);

  return (
    <div className="h-full w-full bg-white relative">
      <Header />
      <div className="px-3 p-4">
        <div className="absolute right-3">
          <button className="action-btn">
            Add Subscription <FiPlus size={17} color="#fff" />
          </button>
        </div>
        {/* <BalanceCard /> */}
        <Card className="w-full h-22 bg-card p-4 border border-slate-200 mt-15 flex flex-col">
          <CardHeader className="flex flex-1">
            <CardTitle className="text-small font-inter font-semibold text-dark flex-1">
              Balance
            </CardTitle>
            <SiMastercard size={22} color="#fb7610" />
          </CardHeader>
          <CardContent className="h-fit flex items-center">
            <CardDescription className="text-x-medium font-inter flex flex-1 items-center gap-2">
              {balanceVisible ? (
                <span>$200,000.00</span>
              ) : (
                <span className="text-small">●●●●●●●●</span>
              )}
              {balanceVisible ? (
                <span
                  onClick={() => setBalanceVisible(!setBalanceVisible)}
                  className="cursor-pointer"
                >
                  <FiEye size={15} />
                </span>
              ) : (
                <span
                  onClick={() => setBalanceVisible(true)}
                  className="cursor-pointer"
                >
                  <FiEyeOff size={15} />
                </span>
              )}
            </CardDescription>
            <CardDescription className="text-small text-dark font-inter">
              05/29
            </CardDescription>
          </CardContent>
        </Card>

        {/* Upcoming subscriptions */}
        <div className="h-auto mt-5 px-2">
          <div className="w-full flex items-center">
            <h3 className="heading flex-1">Upcoming</h3>
            <button className="action-btn">View All</button>
          </div>
          <ul className="w-full mt-6">
            <li className="h-18 border border-slate-200 p-2 hover:bg-base/50 flex items-center gap-2 cursor-pointer transition duration-500 ease-in overflow-hidden">
              <img src={reactImg} alt="" className="w-9 h-9" />
              <div className="h-full flex-1 flex flex-col justify-center">
                <h4 className="text-dark font-inter font-semibold text-small">
                  Notion Team
                </h4>
                <p className="text-small text-dark font-sans font-semibold">
                  $10.00
                </p>
              </div>
              <p className="text-xs text-dark font-sans flex items-center gap-1">
                <FiClock size={14} /> 12 days left
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
