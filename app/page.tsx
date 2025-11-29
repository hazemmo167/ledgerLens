"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Flame,
  Briefcase,
  Activity,
  Search,
  Bell,
} from "lucide-react";

import { kpiData, chartData, recentTransactions } from "@/lib/data";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 1. Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              DualEntry{" "}
              <span className="text-gray-400 font-normal text-sm">Concept</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              HA
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 2. Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Financial Overview
          </h1>
          <p className="text-gray-500">Real-time update as of Nov 29, 2025.</p>
        </div>

        {/* 3. KPI Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {kpi.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(kpi.amount)}
                  </h3>
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    kpi.icon === "Flame"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {kpi.icon === "Wallet" && <Wallet size={20} />}
                  {kpi.icon === "Flame" && <Flame size={20} />}
                  {kpi.icon === "Briefcase" && <Briefcase size={20} />}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {kpi.trend === "up" ? (
                  <span className="text-emerald-600 flex items-center font-medium">
                    <ArrowUpRight size={16} /> {kpi.change}
                  </span>
                ) : (
                  <span
                    className={`${
                      kpi.isExpense ? "text-emerald-600" : "text-red-600"
                    } flex items-center font-medium`}
                  >
                    <ArrowDownRight size={16} /> {kpi.change}
                  </span>
                )}
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart: Cash Flow */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">
                Cash Flow (Income vs Expense)
              </h3>
              <select className="text-sm border-gray-200 rounded-md text-gray-500 bg-gray-50 p-1">
                <option>Last 6 Months</option>
                <option>YTD</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Area
                    type="monotone"
                    dataKey="Income"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Expense"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Widget: Quick Actions / Reconciliation */}
          <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-xl font-bold mb-2">Month-End Close</h3>
              <p className="text-blue-100 text-sm mb-6">
                45 transactions need categorization to close the books for
                October.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-blue-100">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-blue-800 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
            <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors mt-6">
              Resume Reconciliation
            </button>
          </div>
        </div>

        {/* 5. The Ledger (Transaction Table) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Transactions</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Merchant</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{item.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      {item.merchant}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Cleared"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Cleared"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        ></span>
                        {item.status}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        item.type === "credit"
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {item.type === "debit" ? "-" : "+"}
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
