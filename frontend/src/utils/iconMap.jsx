// src/utils/iconMap.jsx
import {
  FaMoneyBillWave,
  FaUsersCog,
  FaClipboardList,
  FaUserTie,
  FaPenNib,
  FaPaintBrush,
  FaBullhorn,
  FaHeadset,
  FaBalanceScale,
  FaCode,
  FaServer,
  FaChartLine,
  FaDatabase,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdOutlineManageAccounts, MdWorkOutline } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";

export const iconMap = {
  "finance / legal": FaBalanceScale, // ⚖️
  "software development": FaCode, // 💻
  "human resources": FaUsersCog, // 👥
  "data analysis": FaDatabase, // 🧮
  "project management": MdOutlineManageAccounts, // 🗂️
  qa: FiMonitor, // 🖥️
  "sales / business": FaChartLine, // 📈
  design: FaPaintBrush, // 🎨
  writing: FaPenNib, // ✍️
  "customer service": FaHeadset, // 🎧
  marketing: FaBullhorn, // 📢
  "all others": FaQuestionCircle, // ❓
  "devops / sysadmin": FaServer, // 🖥️⚙️
};
