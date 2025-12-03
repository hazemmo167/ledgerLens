"use client";

import { useEffect, useState } from "react";
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
  Sparkles,
  Download,
  RefreshCcw,
} from "lucide-react";
import { kpiData, chartData, recentTransactions } from "@/lib/data";

export default function Dashboard() {
  // 1. إدارة العملة (State for Currency)
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [isExporting, setIsExporting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // دالة تحويل وتنسيق العملة
  const formatCurrency = (amount: number) => {
    // محاكاة سعر الصرف: 1 USD = 0.92 EUR
    const rate = currency === "USD" ? 1 : 0.92;
    const value = amount * rate;

    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "de-DE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 2. دالة تصدير البيانات (Export to CSV)
  const exportToCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ["ID,Date,Merchant,Category,Amount,Type,Status\n"];
      const rows = recentTransactions.map(
        (t) =>
          `${t.id},${t.date},"${t.merchant}",${t.category},${t.amount},${t.type},${t.status}`
      );
      const csvContent = headers.concat(rows).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 800); // تأخير بسيط لمحاكاة التحميل
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10"
    >
      {/* --- Top Navigation --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              LedgerLens{" "}
              <span className="text-gray-400 font-normal text-sm">Demo</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Switcher */}
            <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
              {["USD", "EUR"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c as string as "USD" | "EUR")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    currency === c
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
              HA
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Financial Overview
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Real-time data synced via Plaid API.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-500 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-gray-200 transition-all"
            >
              <RefreshCcw size={20} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
              + Add Transaction
            </button>
          </div>
        </div>

        {/* --- 3. AI Insight Widget (New Feature) --- */}
        <div className="bg-linear-to-r from-indigo-50 via-purple-50 to-white p-1 rounded-xl shadow-sm border border-indigo-100">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg flex items-start gap-4">
            <div className="bg-indigo-600 p-2 rounded-lg mt-1 shrink-0 shadow-md shadow-indigo-200">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-indigo-900 text-sm">
                  AI Anomaly Detected
                </h4>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Beta
                </span>
              </div>
              <p className="text-indigo-800 text-sm leading-relaxed">
                We noticed a{" "}
                <span className="font-bold text-red-600">
                  40% spike in AWS costs
                </span>{" "}
                compared to last month&apos;s average. This transaction exceeds
                your projected budget for &quot;Infrastructure&quot;.
              </p>
              <button className="text-indigo-600 text-xs font-bold mt-2 hover:underline flex items-center gap-1">
                View Analysis <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* --- KPI Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                    {kpi.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(kpi.amount)}
                  </h3>
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    kpi.icon === "Flame"
                      ? "bg-orange-50 text-orange-500 group-hover:bg-orange-100"
                      : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
                  }`}
                >
                  {kpi.icon === "Wallet" && <Wallet size={20} />}
                  {kpi.icon === "Flame" && <Flame size={20} />}
                  {kpi.icon === "Briefcase" && <Briefcase size={20} />}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {kpi.trend === "up" ? (
                  <span className="text-emerald-600 flex items-center font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    <ArrowUpRight size={14} className="mr-1" /> {kpi.change}
                  </span>
                ) : (
                  <span
                    className={`${
                      kpi.isExpense
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-red-600 bg-red-50"
                    } flex items-center font-bold px-1.5 py-0.5 rounded`}
                  >
                    <ArrowDownRight size={14} className="mr-1" /> {kpi.change}
                  </span>
                )}
                <span className="text-gray-400 ml-1 text-xs">
                  vs last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- Charts Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Cash Flow Analysis
                </h3>
                <p className="text-xs text-gray-400">
                  Income vs Expenses (Last 6 Months)
                </p>
              </div>
              <select className="text-sm border border-gray-200 rounded-lg text-gray-600 bg-gray-50 px-8 py-1.5 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                <option>Last 6 Months</option>
                <option>YTD</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="w-full min-w-0" style={{ height: 300 }}>
              {isMounted ? (
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
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorExpense"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
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
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      tickFormatter={(val: number) =>
                        currency === "USD"
                          ? `$${val / 1000}k`
                          : `€${(val * 0.92) / 1000}k`
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Area
                      type="monotone"
                      dataKey="Income"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                    />
                    <Area
                      type="monotone"
                      dataKey="Expense"
                      stroke="#ef4444"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorExpense)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>
              )}
            </div>
          </div>

          {/* Reconciliation Widget */}
          <div className="bg-linear-to-b from-blue-600 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:opacity-10 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Month-End Close</h3>
                <span className="bg-blue-500/50 px-2 py-1 rounded text-xs font-medium border border-blue-400/30">
                  Oct 2025
                </span>
              </div>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                45 transactions need categorization to finalize the books. Sync
                is active.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-blue-900/40 rounded-full h-2.5 backdrop-blur-sm overflow-hidden">
                  <div className="bg-white h-full rounded-full w-[78%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                </div>
              </div>
            </div>
            <button className="w-full bg-white text-blue-700 font-bold py-3.5 rounded-lg hover:bg-blue-50 transition-all mt-6 shadow-lg active:scale-[0.98]">
              Resume Reconciliation
            </button>
          </div>
        </div>

        {/* --- Recent Transactions Table (With Export) --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Recent Transactions
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Showing latest activity from connected accounts
              </p>
            </div>

            {/* Export Button (New Feature) */}
            <button
              onClick={exportToCSV}
              disabled={isExporting}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 hover:border-gray-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
              ) : (
                <Download size={16} className="text-gray-500" />
              )}
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Merchant</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors group cursor-default"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold group-hover:text-blue-700 transition-colors">
                      {item.merchant}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          item.status === "Cleared"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
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
                      className={`px-6 py-4 text-right font-bold font-mono ${
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
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
            <button className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors">
              Load more transactions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
