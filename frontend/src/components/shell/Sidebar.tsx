import { Link, useLocation } from "react-router-dom";
import { Bell, FileText, FolderOpen, ListTree, LogOut, ShieldCheck } from "lucide-react";
import type { UserRead } from "../../types/auth";
import { copy } from "../../i18n/copy";
import { useLang } from "../../i18n/useLang";

interface SidebarProps {
  user: UserRead;
  onLogout: () => void;
  // Off-canvas drawer state, owned by AppShell (not this component) since the header's
  // hamburger button — a sibling, not a descendant — also needs to open it. The drawer is the
  // only way this sidebar is ever shown, at any screen width; see AppShell.css.
  // isMobileOpen: boolean;
  // onMobileClose: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const { lang } = useLang();
  const t = copy[lang];
  const location = useLocation();
  // The editor route (/workbooks/:id) never renders this Sidebar at all (see AppShell.tsx), so
  // the only paths this ever actually needs to match against are /workspace, /workspace/all,
  // and /word-files — kept as separate exact checks (not one combined "is it either") so the
  // two workspace nav items each highlight only on their own page, not both at once.
  const isWorkspaceHome = location.pathname === "/workspace";
  const isAllWorkbooks = location.pathname === "/workspace/all";
  const isWordFiles = location.pathname === "/word-files";
  const isNotifications = location.pathname === "/notifications";

  return (
    <aside className={`shell-sidebar`}>
      <div>
        

        <nav className="shell-nav">
          <Link
            to="/workspace"
            className={`shell-nav-item ${isWorkspaceHome ? "active" : ""}`}
            title={t.navWorkbooks}
           
          >
            <FolderOpen size={16} />
            <span>{t.navWorkbooks}</span>
          </Link>

          <Link
            to="/workspace/all"
            className={`shell-nav-item ${isAllWorkbooks ? "active" : ""}`}
            title={t.allWorkbooksTitle}
            
          >
            <ListTree size={16} />
            <span>{t.allWorkbooksTitle}</span>
          </Link>

          <Link
            to="/word-files"
            className={`shell-nav-item ${isWordFiles ? "active" : ""}`}
            title={t.navWordFiles}
           
          >
            <FileText size={16} />
            <span>{t.navWordFiles}</span>
          </Link>

          <Link
            to="/notifications"
            className={`shell-nav-item ${isNotifications ? "active" : ""}`}
            title={t.navNotifications}
           
          >
            <Bell size={16} />
            <span>{t.navNotifications}</span>
          </Link>

          {user.role === "admin" && (
            <Link
              to="/admin"
              className={`shell-nav-item ${location.pathname === "/admin" ? "active" : ""}`}
              title={t.navAdmin}
              
            >
              <ShieldCheck size={16} />
              <span>{t.navAdmin}</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="shell-sidebar-footer">
        <button type="button" className="shell-logout-btn" onClick={onLogout} title={t.logOut}>
          <LogOut size={14} />
          <span>{t.logOut}</span>
        </button>
      </div>
    </aside>
  );
}
