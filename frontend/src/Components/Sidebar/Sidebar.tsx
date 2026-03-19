import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaChartLine, FaBalanceScale, FaBuilding, FaMoneyBill } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { ticker } = useParams<{ ticker: string }>();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const navItems = [
    {
      label: "Company Profile",
      path: "company-profile",
      icon: FaBuilding,
      description: "Overview & Details",
    },
    {
      label: "Income Statement",
      path: "income-statement",
      icon: FaChartLine,
      description: "Revenue & Expenses",
    },
    {
      label: "Balance Sheet",
      path: "balance-sheet",
      icon: FaBalanceScale,
      description: "Assets & Liabilities",
    },
    {
      label: "Cash Flow Statement",
      path: "cashflow-statement",
      icon: FaMoneyBill,
      description: "Cash Inflows & Outflows",
    },
  ];

  return (
    <nav className="sidebar-container">
      <div className="sidebar-content">
        {/* Header */}
        <div className="sidebar-header">
          <h2 className="sidebar-title">Analysis</h2>
          <p className="sidebar-subtitle">Financial Statements</p>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon as React.ElementType;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={`/company/${ticker}/${item.path}`}
                className={`sidebar-link ${active ? "active" : ""}`}
              >
                <div className="sidebar-icon">
                  <Icon size={20} />
                </div>
                <div className="sidebar-text">
                  <div className="sidebar-label">{item.label}</div>
                  <div className="sidebar-description">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="sidebar-footer">
        <p className="text-sm text-gray-500">FinShark v1.0</p>
      </div>
    </nav>
  );
};

export default Sidebar;